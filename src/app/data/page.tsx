'use client';

import Link from 'next/link';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gem } from 'lucide-react';

export default function DataPage() {
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
                          <TableHead className="text-sm">Datasets</TableHead>
                          <TableHead className="text-sm">Description</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                        <TableCell className="font-medium text-sm">
                          <Link href="/data/final-merged-sheet" className="flex items-center gap-2 hover:underline">
                            <Gem className="h-4 w-4 text-muted-foreground" />
                            Final Merged Sheet
                          </Link>
                        </TableCell>
                        <TableCell className="text-sm">
                          Final Merged Sheet Dataset
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
