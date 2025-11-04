'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { EmptyState } from '@/components/reconciliation/empty-state';
import { StatusToolbar } from '@/components/reconciliation/status-toolbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { statusCards } from '@/lib/data';
import { Filter } from 'lucide-react';

export default function VoidPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <div className="p-4 md:px-6 md:pt-6">
            <StatusToolbar statuses={statusCards} />
          </div>
          <div className="border-b p-4 md:px-6">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 md:p-6">
            <EmptyState 
              image="empty-box"
              title="Nothing to see here yet"
              description="Any process that is void will land here."
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}