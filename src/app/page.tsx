'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { EmptyState } from '@/components/reconciliation/empty-state';
import { ReconciliationTable } from '@/components/reconciliation/reconciliation-table';
import { StatusToolbar } from '@/components/reconciliation/status-toolbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { statusCards, transactions } from '@/lib/data';

export default function Dashboard() {
  // In the image, "Needs attention" is 0, so we show the empty state.
  const needsAttentionCount = 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <div className="p-4 md:px-6 md:pt-6">
            <StatusToolbar statuses={statusCards} />
          </div>
          <div className="flex-1 flex items-center justify-center p-4 md:p-6">
            {needsAttentionCount > 0 ? (
              <ReconciliationTable data={transactions} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
