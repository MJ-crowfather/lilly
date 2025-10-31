'use client'

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { EmptyState } from '@/components/reconciliation/empty-state';
import { ReconciliationTable } from '@/components/reconciliation/reconciliation-table';
import { StatusCards } from '@/components/reconciliation/status-cards';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { statusCards, transactions } from '@/lib/data';

export default function Dashboard() {
  const needsAttentionCount = statusCards.find(
    (card) => card.title === 'Needs Attention'
  )?.value || 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col gap-8 p-4 md:p-8">
          <AppHeader />
          <StatusCards cards={statusCards} />
          <div className="flex-1">
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
