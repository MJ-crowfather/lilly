'use client';

import Link from 'next/link';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DataPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="p-4 md:px-6 md:pt-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Datasets</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} className="p-0">
                          <Link href="/data/final-merged-sheet" className="block hover:bg-muted/50">
                            <div className="grid grid-cols-2">
                                <div className="font-medium p-4 flex items-center gap-2">
                                    <Gem className="h-4 w-4 text-muted-foreground" />
                                    <span>Final Merged Sheet</span>
                                </div>
                                <div className="p-4">
                                    Final Merged Sheet Dataset
                                </div>
                            </div>
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                </Table>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
