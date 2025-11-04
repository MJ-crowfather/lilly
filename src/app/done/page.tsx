'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { StatusToolbar } from '@/components/reconciliation/status-toolbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { statusCards, doneCases } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, ListFilter, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const tableHeaders = [
  '',
  'Case Number',
  'Receipt Date',
  'Social Network',
  'Username',
  'Lilly Product',
  'Report Type',
  'Respondent Type',
  'Case Summary',
  'Assigned Agent',
];

const DoneStatusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 8 8" {...props}>
      <rect width="8" height="8" rx="1.5" className="fill-green-100 dark:fill-green-900/50 stroke-green-500 dark:stroke-green-400" strokeWidth="1"/>
    </svg>
);


export default function DonePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 flex flex-col">
            <div className="p-4 md:px-6 border-b">
              <div className="flex items-center justify-between">
                <StatusToolbar statuses={statusCards} />
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListFilter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="bg-card text-card-foreground">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {tableHeaders.map((header) => (
                                    <TableHead key={header} className="text-xs">{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doneCases.map((caseItem) => (
                                <TableRow key={caseItem.case_number} className="border-b-0">
                                    <TableCell className="py-2">
                                      <div className="flex items-center gap-2">
                                        <DoneStatusIcon className="h-2 w-2"/>
                                        <Check className="h-4 w-4 text-green-600" />
                                      </div>
                                    </TableCell>
                                    <TableCell className="font-medium py-2 text-xs">{caseItem.case_number}</TableCell>
                                    <TableCell className="py-2 text-xs">{caseItem.receipt_date}</TableCell>
                                    <TableCell className="py-2 text-xs">{caseItem.social_network}</TableCell>
                                    <TableCell className="py-2 text-xs">{caseItem.username}</TableCell>
                                    <TableCell className="py-2 text-xs">{caseItem.lilly_product}</TableCell>
                                    <TableCell className="py-2 text-xs">{caseItem.report_type}</TableCell>
                                    <TableCell className="py-2 text-xs">{caseItem.respondent_type}</TableCell>
                                    <TableCell className="max-w-[250px] truncate py-2 text-xs">{caseItem.case_summary}</TableCell>
                                    <TableCell className="py-2 text-xs">{caseItem.assigned_agent}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
