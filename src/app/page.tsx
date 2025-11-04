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
  const needsAttentionCount = statusCards.find(s => s.title === 'Needs Attention')?.value ?? 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <div className="p-4 md:px-6">
            <StatusToolbar statuses={statusCards} />
          </div>
          <div className="flex-1 flex items-center justify-center p-4 md:p-6">
            {needsAttentionCount > 0 ? (
              <ReconciliationTable data={transactions} />
            ) : (
              <EmptyState 
                image="empty-state-birds"
                title="No blockers right now"
                description="Sit back and let things flow, we'll nudge you when it's time to step in."
                size="small"
              />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
