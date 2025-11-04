'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { StatusToolbar } from '@/components/reconciliation/status-toolbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { statusCards, doneCases } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, ListFilter } from 'lucide-react';

const tableHeaders = [
  'Case Number',
  'Receipt Date',
  'Social Network',
  'Username',
  'Lilly Product',
  'Report Type',
  'Respondent Type',
  'Country',
  'Case Summary',
  'Case Status',
  'Processing Time',
  'Assigned Agent',
];

export default function DonePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 flex flex-col">
            <div className="p-4 md:px-6">
                <StatusToolbar statuses={statusCards} />
            </div>
            <div className="rounded-lg border-t bg-card text-card-foreground shadow-sm mx-4 md:mx-6">
                <div className="p-4 flex items-center justify-between">
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ListFilter className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto px-4 md:px-6 pb-4">
                <div className="border-x border-b rounded-b-lg bg-card text-card-foreground">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {tableHeaders.map((header) => (
                                    <TableHead key={header}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doneCases.map((caseItem) => (
                                <TableRow key={caseItem.case_number}>
                                    <TableCell className="font-medium">{caseItem.case_number}</TableCell>
                                    <TableCell>{caseItem.receipt_date}</TableCell>
                                    <TableCell>{caseItem.social_network}</TableCell>
                                    <TableCell>{caseItem.username}</TableCell>
                                    <TableCell>{caseItem.lilly_product}</TableCell>
                                    <TableCell>{caseItem.report_type}</TableCell>
                                    <TableCell>{caseItem.respondent_type}</TableCell>
                                    <TableCell>{caseItem.country}</TableCell>
                                    <TableCell className="max-w-[250px] truncate">{caseItem.case_summary}</TableCell>
                                    <TableCell>{caseItem.case_status}</TableCell>
                                    <TableCell>{caseItem.processing_time}</TableCell>
                                    <TableCell>{caseItem.assigned_agent}</TableCell>
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
