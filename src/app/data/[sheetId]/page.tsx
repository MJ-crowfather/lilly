
'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { finalMergedSheetData, type MergedSheetEntry } from '@/lib/data';
import { Filter, ArrowDownToLine, History, PanelTopOpen, ArrowUpDown } from 'lucide-react';

const tableHeaders = [
  "channel",
  "Lilly Agent assigned",
  "reporter_username",
  "Receipt Date",
  "lilly_products",
  "respondent_type",
  "hcp_type",
  "patient_gender",
  "patient_age",
  "ae_pc_details",
  "report_type",
  "contacted_poster",
  "poster_consent",
  "poster_contact_info",
  "lot_control_number"
];

function SortableHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2">
            {children}
            <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
        </div>
    )
}


export default function SheetDetailsPage({ params }: { params: { sheetId: string } }) {
  // In a real app, you would fetch data based on params.sheetId
  const data: MergedSheetEntry[] = finalMergedSheetData;
  const dataKeys = Object.keys(data[0] || {}) as (keyof MergedSheetEntry)[];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 flex flex-col">
            <div className="p-4 md:px-6 flex items-center justify-between border-b">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <ArrowDownToLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <History className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <PanelTopOpen className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="rounded-lg bg-card text-card-foreground">
                  <Table>
                      <TableHeader>
                          <TableRow>
                            {tableHeaders.map(header => (
                                <TableHead key={header} className="text-sm">
                                    <SortableHeader>{header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</SortableHeader>
                                </TableHead>
                            ))}
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {data.map((row, index) => (
                              <TableRow key={index}>
                                  {dataKeys.map(key => (
                                      <TableCell key={key} className="text-sm">{row[key]}</TableCell>
                                  ))}
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
