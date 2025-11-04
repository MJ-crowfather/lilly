
'use client';

import * as React from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const articleContent = [
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

function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export default function KnowledgeBaseArticlePage() {
  const [open, setOpen] = React.useState(true);

  const toc = articleContent.filter(item => item.type === 'h2' || item.type === 'h3');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <div className="flex-1 flex flex-col relative">
            <header className="h-[140px] w-full bg-gray-50 flex items-center px-8 login-diagonal-bg">
                <h1 className="text-3xl font-bold tracking-tight">AE/PC Reporting</h1>
            </header>
            <main className="flex-1 flex justify-center py-8 px-4 md:px-8">
              <div className="w-full max-w-6xl flex">
                <div className="w-2/3 pr-16 space-y-4">
                  <h2 className="text-xl font-semibold">Pace AI Agent - AE/PC Reporting Automation</h2>
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
                          return <ul key={index} className="list-disc pl-5 space-y-1 text-sm">
                              {item.items.map((li, liIndex) => <li key={liIndex}>{li}</li>)}
                          </ul>
                      }
                      return null;
                  })}
                </div>
                <aside className="w-1/3 sticky top-20 self-start">
                    <h3 className="text-xs font-semibold text-muted-foreground mb-2">In this knowledge base:</h3>
                     <Collapsible open={open} onOpenChange={setOpen}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                            <span className="text-sm font-medium">Pace AI Agent - AE/PC Reporting Automation</span>
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
            </main>
            <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4">
                <div className="max-w-2xl mx-auto relative">
                    <Textarea 
                      placeholder="Ask away..."
                      className="rounded-xl p-4 pr-12 h-14 resize-none shadow-lg focus-visible:ring-primary/50"
                    />
                    <Button size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-gray-300 hover:bg-gray-400 text-gray-700">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
