
'use client';

import Link from 'next/link';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gem, Pencil, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompany } from '@/components/company-provider';

export default function DataPage() {
  const { company } = useCompany();

  const isClutch = company === 'Clutch';
  const datasetName = isClutch ? 'Bill of Sale Dataset' : 'AE/PC Report Sheet';
  const datasetDesc = isClutch ? 'Bill of Sale Dataset' : 'AE/PC Report Sheet Dataset';
  const datasetLink = isClutch ? '/data/bill-of-sale' : '/data/final-merged-sheet';


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <div className="rounded-lg bg-card text-card-foreground">
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="text-xs">Datasets</TableHead>
                          <TableHead className="text-xs">Description</TableHead>
                          <TableHead />
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="group">
                        <TableCell className="font-medium text-xs">
                          <Link href={datasetLink} className="flex items-center gap-2 hover:underline">
                            <Gem className="h-4 w-4 text-muted-foreground" />
                            {datasetName}
                          </Link>
                        </TableCell>
                        <TableCell className="text-xs">
                          {datasetDesc}
                        </TableCell>
                        <TableCell className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </TableCell>
                    </TableRow>
                  </TableBody>
              </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

    