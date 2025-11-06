'use client';

import * as React from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, ChevronsUp, Loader2 } from 'lucide-react';
import { KnowledgeBaseIcon } from '@/components/knowledge-base-icon';
import { PaceIcon } from '@/components/pace-icon';
import { answerQuestion } from '@/ai/flows/knowledge-base-flow';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCompany } from '@/components/company-provider';


const lillyArticleText = `
Overview
Social Care agents monitor Lilly's social channels via Sprinklr to detect and report adverse events (AE) and product complaints (PC). Agents manually tag cases, export data, populate Excel forms, and email reports to regulatory compliance.
Current Metrics: ~10 min/case | 400-450 cases/month | 800-900 hours/year

Process Flow
Case Detection & Auto-Tagging
- Sprinklr captures social posts mentioning Lilly products with potential AE/PC keywords
- Auto-applies ~50% of tags: Compliance (AE/PC), Product, Audience (HCP/Consumer), Geography
- Case assigned to agent queue with unique Case ID

Agent Review & Tag Verification
Agent opens case in Sprinklr (Conversation View + Properties Panel). Verifies auto-tags and manually adds/corrects:
- Compliance: AE, PC, AE and PC, None
- Product: Mounjaro, Trulicity, Humalog, etc.
- Audience: HCP, Consumer (multi-select)
- Therapeutic Area: Diabetes, Oncology, etc.
Tags via Properties Panel or Macro Modal

AE/PC Dashboard Check
Navigate to "AE/PC" tab in Sprinklr. View table export with all tagged cases.
- Deduplication Issue: Multi-tagged cases (e.g., HCP + Consumer) appear as duplicate rows

Manual Excel Form Population
Agent copies 17 fields from Sprinklr to Excel template:
- Case #, Receipt Date, Username, Message Text
- Product, Respondent Type, Platform
- Report Type (AE/PC)
- Patient info (often "Unknown")
Switches between Sprinklr and Excel tabs for each field

Email Submission
- Save Excel file with descriptive filename
- Email to USAnswersCenter@lilly.com with subject "AE/PC Report"
- Attach Excel file and send

Case Closure
- Return to Sprinklr
- Click Macro → Select "Closed"
- Verify final tags in modal popup
- Apply to close case and remove from queue

Key Challenges
- Manual data entry across systems (Sprinklr → Excel → Email)
- Duplicate rows in dashboard export from multi-tagging
- No automated deduplication logic (requires manual Case # checking)
- Time-intensive per-case processing
`;

const clutchArticleText = `
# Pace AI Agent - Clutch Document Verification

## Overview
Document verification agents validate customer identity, vehicle ownership, and supporting documents for vehicle purchase transactions. The process uses OCR-based matching against the Bill of Sale (BOS) as the authoritative "golden record." Agents manually access Clutch's platform, download documents, and perform visual cross-checks using predefined matching logic.

**Current Metrics:** Manual OCR extraction and comparison | Two-level approval workflow | Multiple document types per transaction

## Process Flow

### 1. Portal Access & Task Retrieval
* Login to Clutch platform (admin.clutchenv.ca)
* Apply filters to retrieve eligible tasks:
  * Task Type = "Upload Signed Bill of Sale"
  * Approval Level = "Second Approval"
  * Status = "Incomplete"
* Access assigned verification queue

### 2. Document Download & BOS Analysis
Agent captures and processes all transaction documents:
* Generate unique batch key: BATCH_[Transaction_ID]_[Timestamp]
* Screenshot required documents:
  * Bill of Sale (BOS) - primary reference document
  * Main Owner's Driver's License
  * Co-owner's Driver's License (if applicable)
  * Direct Deposit Form / Void Cheque
  * Proof of Ownership (Vehicle Registration)
  * Lien/Lease documents (if applicable)
* Perform OCR extraction on BOS to capture:
  * Customer Full Name(s)
  * Vehicle Year/Make/Model
  * VIN (full or last 6 digits)
  * Net Vehicle Value
  * Bill of Sale Effective Date

### 3. Identity Document Verification
Validate Driver's License(s) against BOS data:
* **Name Matching:** First and last names must exactly match BOS (no abbreviations)
* **Expiration:** ID must be valid as of BOS date; expired IDs accepted up to 30 days post-BOS
* **Alternate IDs** (if license expired/suspended): Passport, PR Card, Citizenship Card, Military ID, Ontario Photo ID
  * DoB must match across all IDs
  * Suspended licenses require address-matching mail (bank statement or utility bill)
* Reject photocopies, screenshots, or illegible images

### 4. Banking Information Verification
Validate Direct Deposit Form or Void Cheque:
* **Name Matching:** Must match BOS and ID exactly
* **Account Type:** CAD Chequing Account only (no savings)
* Extract and validate:
  * Financial Institution Number (3 digits)
  * Transit/Branch Number (5 digits)
  * Account Number (7-12 digits; exactly 7 for Big 5 Banks)
* Verify Canadian banking format standards

### 5. Vehicle Ownership Document Verification
Validate Vehicle Registration against BOS:
* **VIN Matching:** Full VIN or last 6 digits must match BOS
* **Vehicle Details:** Year/Make/Model must match BOS
* **Owner Name:** Must match BOS
* **Ownership Duration:** Minimum 60 days before BOS effective date
  * If <60 days: Require insurance certificate or prior BOS showing ≥60-day ownership
* **Province-Specific Rules:**
  * ON, NS, NB, PEI, YT: Original photo/scan; no expiration
  * BC, AB, QC, MB, SK, NT, NU: Original or electronic copy; has expiration date

### 6. Lien Documentation Processing (If Applicable)
Process financed vehicle documentation:
* **Lien Buyout Letter** requirements:
  * Debtor Name (must match BOS/Carfax)
  * Account Number/Loan ID
  * VIN, Vehicle Info (Year/Make/Model)
  * Outstanding Amount (use highest if multiple amounts)
  * Valid Until Date (within 7 days)
  * Must include lender logo
* **Lien Release/Discharge Letter:**
  * Issued by lender with logo and contact info
  * Official signature/date
  * Alternative: Statement showing $0 balance or payment receipt
* Compare VIN, vehicle details, and lien record with BOS

### 7. Lease Documentation Processing (If Applicable)
Validate lease-related documents:
* **Lessee Name:** Must match BOS
* **Vehicle Details:** VIN, Year/Make/Model must align with BOS
* **Buyout/Discharge Validation:**
  * Verify contractual obligations fulfilled
  * Check pretax amount, fees, deposits
  * Confirm security deposit deductions (except VW/Audi)
* Accept lender-issued letters or recent BOS for bought-out leases
* Required BOS elements: Vehicle details, purchase date, dealership/salesperson, signatures

### 8. Cross-Document Validation & Exception Flagging
Perform comprehensive cross-validation using BOS as source of truth:

| Validation Area | Rule | Expected Result |
|----------------|------|-----------------|
| Name Consistency | BOS = ID = Bank = Ownership | ✓ |
| VIN Match | BOS VIN = Ownership VIN (full or last 6) | ✓ |
| Vehicle Details | Year/Make/Model consistent across all docs | ✓ |
| Financial Validation | Banking + Lien/Lease amounts valid and current | ✓ |
| Date Logic | ID expiration and Ownership dates within thresholds | ✓ |

* Generate detailed exception logs with field-level mismatches
* Tag exceptions for "Needs Attention" queue

### 9. Task Completion & Status Update
Mark verification tasks as complete or escalate:
* Update task status based on validation results
* Create detailed exception cases with supporting evidence
* Complete examples:
  * Identity Verification: Complete ✓
  * Payment Verification: Complete ✓
  * Vehicle Documents: Complete ✓
  * Overall Status: Ready for Second Approval

## Key Challenges
* Manual document download and OCR extraction
* Visual cross-checking across multiple document types
* Complex validation rules for different transaction types (liens, leases, corporate sales, POA, estates)
* Province-specific ownership document requirements
* Manual exception flagging and escalation
* Two-level approval workflow requiring human review
`;


type Message = {
  role: 'user' | 'pace';
  content: string;
};

export default function KnowledgeBasePage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const { company, companyData } = useCompany();

  const isClutch = company === 'Clutch';
  const articleText = isClutch ? clutchArticleText : lillyArticleText;

  React.useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await answerQuestion({ question: input, context: articleText });
      const paceMessage: Message = { role: 'pace', content: result.answer };
      setMessages(prev => [...prev, paceMessage]);
    } catch (error) {
      console.error('Error getting answer:', error);
      const errorMessage: Message = { role: 'pace', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 flex flex-col items-center justify-center kb-grid-bg relative">
            
            {messages.length === 0 ? (
                <div className="flex flex-col items-center text-center">
                    <Button variant="outline" className="rounded-full border-primary/50 text-primary hover:bg-primary/10 mb-6">
                        <KnowledgeBaseIcon className="mr-2" />
                        Knowledge Base
                    </Button>
                    <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        Ask <PaceIcon /> Pace anything about {companyData.processName}
                    </h1>
                </div>
            ) : (
                <div ref={chatContainerRef} className="w-full max-w-2xl flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-start gap-4", msg.role === 'user' && "justify-end")}>
                        {msg.role === 'pace' && (
                            <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                                <PaceIcon className="h-5 w-5" />
                            </Avatar>
                        )}
                        <div className={cn(
                            "rounded-lg p-3 max-w-lg",
                            msg.role === 'user' ? "bg-muted" : "bg-primary text-primary-foreground"
                        )}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        {msg.role === 'user' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-4">
                           <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                                <PaceIcon className="h-5 w-5" />
                           </Avatar>
                          <div className="rounded-lg p-3 max-w-lg bg-primary text-primary-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                          </div>
                        </div>
                    )}
                </div>
            )}
            
            <div className="w-full max-w-2xl relative p-4 sticky bottom-0 bg-background/80 backdrop-blur-sm">
                <Textarea 
                  placeholder="Ask away..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                  }}
                  className="rounded-xl p-4 pr-12 h-14 resize-none shadow-lg focus-visible:ring-primary/50"
                  disabled={isLoading}
                />
                <Button 
                  size="icon" 
                  className="absolute right-7 top-1/2 -translate-y-1/2 h-8 w-8 bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:opacity-50"
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
                </Button>
            </div>

            <div className="absolute bottom-6 text-center">
              <Link href="/knowledge-base/article" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                  <ChevronsUp className="h-5 w-5"/>
                  <span className="text-xs font-medium">Explore Knowledge Base</span>
              </Link>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
