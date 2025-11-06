
'use client';

import * as React from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp, ChevronRight, Loader2 } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { answerQuestion } from '@/ai/flows/knowledge-base-flow';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PaceIcon } from '@/components/pace-icon';
import { useCompany } from '@/components/company-provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const lillyArticleContent = [
    { type: 'h2', text: 'Overview' },
    { type: 'p', text: "Social Care agents monitor Lilly's social channels via Sprinklr to detect and report adverse events (AE) and product complaints (PC). Agents manually tag cases, export data, populate Excel forms, and email reports to regulatory compliance." },
    { type: 'p', text: 'Current Metrics: ~10 min/case | 400-450 cases/month | 800-900 hours/year' },
    { type: 'h2', text: 'Process Flow' },
    { type: 'h3', text: 'Case Detection & Auto-Tagging' },
    { type: 'ul', items: [
        'Sprinklr captures social posts mentioning Lilly products with potential AE/PC keywords',
        'Auto-applies ~50% of tags: Compliance (AE/PC), Product, Audience (HCP/Consumer), Geography',
        'Case assigned to agent queue with unique Case ID'
    ]},
    { type: 'h3', text: 'Agent Review & Tag Verification' },
    { type: 'p', text: 'Agent opens case in Sprinklr (Conversation View + Properties Panel). Verifies auto-tags and manually adds/corrects:'},
    { type: 'ul', items: [
        'Compliance: AE, PC, AE and PC, None',
        'Product: Mounjaro, Trulicity, Humalog, etc.',
        'Audience: HCP, Consumer (multi-select)',
        'Therapeutic Area: Diabetes, Oncology, etc.',
    ]},
    { type: 'p', text: 'Tags via Properties Panel or Macro Modal'},
    { type: 'h3', text: 'AE/PC Dashboard Check' },
    { type: 'p', text: 'Navigate to "AE/PC" tab in Sprinklr. View table export with all tagged cases.'},
    { type: 'ul', items: ['Deduplication Issue: Multi-tagged cases (e.g., HCP + Consumer) appear as duplicate rows']},
    { type: 'h3', text: 'Manual Excel Form Population' },
    { type: 'p', text: 'Agent copies 17 fields from Sprinklr to Excel template:'},
    { type: 'ul', items: [
        'Case #, Receipt Date, Username, Message Text',
        'Product, Respondent Type, Platform',
        'Report Type (AE/PC)',
        'Patient info (often "Unknown")',
    ]},
    { type: 'p', text: 'Switches between Sprinklr and Excel tabs for each field'},
    { type: 'h3', text: 'Email Submission' },
    { type: 'ul', items: [
        'Save Excel file with descriptive filename',
        'Email to USAnswersCenter@lilly.com with subject "AE/PC Report"',
        'Attach Excel file and send'
    ]},
    { type: 'h3', text: 'Case Closure' },
    { type: 'ul', items: [
        'Return to Sprinklr',
        'Click Macro → Select "Closed"',
        'Verify final tags in modal popup',
        'Apply to close case and remove from queue'
    ]},
    { type: 'h2', text: 'Key Challenges' },
    { type: 'ul', items: [
        'Manual data entry across systems (Sprinklr → Excel → Email)',
        'Duplicate rows in dashboard export from multi-tagging',
        'No automated deduplication logic (requires manual Case # checking)',
        'Time-intensive per-case processing'
    ]}
];

const clutchArticleContent = [
    { type: 'h2', text: 'Overview' },
    { type: 'p', text: 'Document verification agents validate customer identity, vehicle ownership, and supporting documents for vehicle purchase transactions. The process uses OCR-based matching against the Bill of Sale (BOS) as the authoritative "golden record." Agents manually access Clutch\'s platform, download documents, and perform visual cross-checks using predefined matching logic.' },
    { type: 'p', text: 'Current Metrics: Manual OCR extraction and comparison | Two-level approval workflow | Multiple document types per transaction' },
    { type: 'h2', text: 'Process Flow' },
    { type: 'h3', text: 'Portal Access & Task Retrieval' },
    { type: 'ul', items: [
        'Login to Clutch platform (admin.clutchenv.ca)',
        'Apply filters to retrieve eligible tasks:',
    ]},
    { type: 'ul', isSublist: true, items: [
        'Task Type = "Upload Signed Bill of Sale"',
        'Approval Level = "Second Approval"',
        'Status = "Incomplete"',
    ]},
    { type: 'ul', items: [
        'Access assigned verification queue'
    ]},
    { type: 'h3', text: 'Document Download & BOS Analysis' },
    { type: 'p', text: 'Agent captures and processes all transaction documents:'},
    { type: 'ul', items: [
        'Generate unique batch key: BATCH_[Transaction_ID]_[Timestamp]',
        'Screenshot required documents:',
    ]},
    { type: 'ul', isSublist: true, items: [
        'Bill of Sale (BOS) - primary reference document',
        'Main Owner\'s Driver\'s License',
        'Co-owner\'s Driver\'s License (if applicable)',
        'Direct Deposit Form / Void Cheque',
        'Proof of Ownership (Vehicle Registration)',
        'Lien/Lease documents (if applicable)',
    ]},
    { type: 'ul', items: [
        'Perform OCR extraction on BOS to capture:',
    ]},
     { type: 'ul', isSublist: true, items: [
        'Customer Full Name(s)',
        'Vehicle Year/Make/Model',
        'VIN (full or last 6 digits)',
        'Net Vehicle Value',
        'Bill of Sale Effective Date',
    ]},
    { type: 'h3', text: 'Identity Document Verification' },
    { type: 'p', text: "Validate Driver's License(s) against BOS data:" },
    { type: 'ul', items: [
        'Name Matching: First and last names must exactly match BOS (no abbreviations)',
        'Expiration: ID must be valid as of BOS date; expired IDs accepted up to 30 days post-BOS',
        'Alternate IDs (if license expired/suspended): Passport, PR Card, Citizenship Card, Military ID, Ontario Photo ID',
        'DoB must match across all IDs',
        'Suspended licenses require address-matching mail (bank statement or utility bill)',
        'Reject photocopies, screenshots, or illegible images'
    ]},
    { type: 'h3', text: 'Banking Information Verification' },
    { type: 'p', text: 'Validate Direct Deposit Form or Void Cheque:' },
    { type: 'ul', items: [
        'Name Matching: Must match BOS and ID exactly',
        'Account Type: CAD Chequing Account only (no savings)',
        'Extract and validate:',
    ]},
    { type: 'ul', isSublist: true, items: [
        'Financial Institution Number (3 digits)',
        'Transit/Branch Number (5 digits)',
        'Account Number (7-12 digits; exactly 7 for Big 5 Banks)',
    ]},
    { type: 'ul', items: [
        'Verify Canadian banking format standards'
    ]},
    { type: 'h3', text: 'Vehicle Ownership Document Verification' },
    { type: 'p', text: 'Validate Vehicle Registration against BOS:' },
    { type: 'ul', items: [
        'VIN Matching: Full VIN or last 6 digits must match BOS',
        'Vehicle Details: Year/Make/Model must match BOS',
        'Owner Name: Must match BOS',
        'Ownership Duration: Minimum 60 days before BOS effective date',
        'If <60 days: Require insurance certificate or prior BOS showing ≥60-day ownership',
        'Province-Specific Rules:',
    ]},
    { type: 'ul', isSublist: true, items: [
        'ON, NS, NB, PEI, YT: Original photo/scan; no expiration',
        'BC, AB, QC, MB, SK, NT, NU: Original or electronic copy; has expiration date',
    ]},
    { type: 'h3', text: 'Lien Documentation Processing (If Applicable)' },
    { type: 'p', text: 'Process financed vehicle documentation:' },
    { type: 'p', text: 'Lien Buyout Letter requirements:' },
    { type: 'ul', items: [
        'Debtor Name (must match BOS/Carfax)',
        'Account Number/Loan ID',
        'VIN, Vehicle Info (Year/Make/Model)',
        'Outstanding Amount (use highest if multiple amounts)',
        'Valid Until Date (within 7 days)',
        'Must include lender logo',
    ]},
    { type: 'p', text: 'Lien Release/Discharge Letter:'},
    { type: 'ul', items: [
        'Issued by lender with logo and contact info',
        'Official signature/date',
        'Alternative: Statement showing $0 balance or payment receipt',
    ]},
    { type: 'ul', items: [
      'Compare VIN, vehicle details, and lien record with BOS'
    ]},
    { type: 'h3', text: 'Lease Documentation Processing (If Applicable)' },
    { type: 'p', text: 'Validate lease-related documents:' },
    { type: 'ul', items: [
        'Lessee Name: Must match BOS',
        'Vehicle Details: VIN, Year/Make/Model must align with BOS',
        'Buyout/Discharge Validation:',
    ]},
    { type: 'ul', isSublist: true, items: [
        'Verify contractual obligations fulfilled',
        'Check pretax amount, fees, deposits',
        'Confirm security deposit deductions (except VW/Audi)',
    ]},
    { type: 'ul', items: [
        'Accept lender-issued letters or recent BOS for bought-out leases',
        'Required BOS elements: Vehicle details, purchase date, dealership/salesperson, signatures'
    ]},
    { type: 'h3', text: 'Cross-Document Validation & Exception Flagging' },
    { type: 'p', text: 'Perform comprehensive cross-validation using BOS as source of truth:'},
    { type: 'table', headers: ['Validation Area', 'Rule', 'Expected Result'], rows: [
        ['Name Consistency', 'BOS = ID = Bank = Ownership', '✓'],
        ['VIN Match', 'BOS VIN = Ownership VIN (full or last 6)', '✓'],
        ['Vehicle Details', 'Year/Make/Model consistent across all docs', '✓'],
        ['Financial Validation', 'Banking + Lien/Lease amounts valid and current', '✓'],
        ['Date Logic', 'ID expiration and Ownership dates within thresholds', '✓'],
    ]},
    { type: 'ul', items: [
      'Generate detailed exception logs with field-level mismatches',
      'Tag exceptions for "Needs Attention" queue'
    ]},
    { type: 'h3', text: 'Task Completion & Status Update' },
    { type: 'p', text: 'Mark verification tasks as complete or escalate:'},
    { type: 'ul', items: [
      'Update task status based on validation results',
      'Create detailed exception cases with supporting evidence',
      'Complete examples:',
    ]},
    { type: 'ul', isSublist: true, items: [
      'Identity Verification: Complete ✓',
      'Payment Verification: Complete ✓',
      'Vehicle Documents: Complete ✓',
      'Overall Status: Ready for Second Approval',
    ]},
    { type: 'h2', text: 'Key Challenges' },
    { type: 'ul', items: [
        'Manual document download and OCR extraction',
        'Visual cross-checking across multiple document types',
        'Complex validation rules for different transaction types (liens, leases, corporate sales, POA, estates)',
        'Province-specific ownership document requirements',
        'Manual exception flagging and escalation',
        'Two-level approval workflow requiring human review'
    ]}
];


const generateArticleText = (content: any[]) => {
    return content.map(item => {
        if (item.type === 'ul' || item.type === 'ul-sub') {
            return item.items.map((li: string) => `- ${li}`).join('\n');
        }
        if (item.type === 'table') {
            const header = `| ${item.headers.join(' | ')} |`;
            const separator = `| ${item.headers.map(() => '---').join(' | ')} |`;
            const rows = item.rows.map((row: string[]) => `| ${row.join(' | ')} |`).join('\n');
            return `${header}\n${separator}\n${rows}`;
        }
        return item.text;
    }).join('\n\n');
}

const lillyArticleText = generateArticleText(lillyArticleContent);
const clutchArticleText = generateArticleText(clutchArticleContent);

function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

type Message = {
  role: 'user' | 'pace';
  content: string;
};


export default function KnowledgeBaseArticlePage() {
  const [open, setOpen] = React.useState(true);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const { company, companyData } = useCompany();

  const isClutch = company === 'Clutch';
  const articleContent = isClutch ? clutchArticleContent : lillyArticleContent;
  const articleText = isClutch ? clutchArticleText : lillyArticleText;

  const toc = articleContent.filter(item => item.type === 'h2' || item.type === 'h3');

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
          <div className="flex-1 flex flex-col relative">
            <header className="h-[140px] w-full bg-gray-50 flex items-center px-8 login-diagonal-bg">
                <h1 className="text-3xl font-bold tracking-tight">{companyData.processName}</h1>
            </header>
            
            <main ref={chatContainerRef} className="flex-1 flex justify-center py-8 px-4 md:px-8 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="w-full max-w-6xl flex">
                    <div className="w-2/3 pr-16 space-y-4">
                    <h1 className="text-2xl font-bold tracking-tight">Pace AI Agent - {companyData.processName}</h1>
                    {articleContent.map((item, index) => {
                        const id = item.type !== 'p' && item.type !== 'ul' && item.text ? slugify(item.text) : undefined;
                        if (item.type === 'h2') {
                            return <h2 key={index} id={id} className="text-xl font-semibold pt-4">{item.text}</h2>
                        }
                        if (item.type === 'h3') {
                            return <h3 key={index.toString()} id={id} className="text-lg font-semibold pt-2">{item.text}</h3>
                        }
                        if (item.type === 'p') {
                            return <p key={index} className="text-sm leading-relaxed">{item.text}</p>
                        }
                        if (item.type === 'ul') {
                            return <ul key={index} className={cn("list-disc space-y-1 text-sm", item.isSublist ? 'pl-10' : 'pl-5') }>
                                {item.items.map((li: string, liIndex: number) => <li key={liIndex}>{li}</li>)}
                            </ul>
                        }
                        if (item.type === 'table') {
                            return (
                                <Table key={index} className="my-4 border">
                                    <TableHeader>
                                        <TableRow>
                                            {item.headers.map((header: string, hIndex: number) => <TableHead key={hIndex}>{header}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {item.rows.map((row: string[], rIndex: number) => (
                                            <TableRow key={rIndex}>
                                                {row.map((cell: string, cIndex: number) => <TableCell key={cIndex}>{cell}</TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )
                        }
                        return null;
                    })}
                    </div>
                    <aside className="w-1/3 sticky top-20 self-start">
                        <h3 className="text-xs font-semibold text-muted-foreground mb-2">In this knowledge base:</h3>
                        <Collapsible open={open} onOpenChange={setOpen}>
                            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                                <span className="text-sm font-medium">Pace AI Agent - {companyData.processName}</span>
                                <ChevronRight className={cn("h-4 w-4 transition-transform", open && "rotate-90")} />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 pl-4 border-l">
                                <ul className="space-y-2">
                                    {toc.map((item, index) => {
                                        const id = item.text ? slugify(item.text) : '';
                                        return (
                                            <li key={index}>
                                                <a href={`#${id}`} className={cn(
                                                    "text-sm text-muted-foreground hover:text-foreground",
                                                    item.type === 'h3' && ''
                                                )}>
                                                    {item.text}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    </aside>
                </div>
              ) : (
                <div className="w-full max-w-2xl space-y-6">
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
            </main>

            <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4">
                <div className="max-w-2xl mx-auto relative">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:opacity-50"
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

    