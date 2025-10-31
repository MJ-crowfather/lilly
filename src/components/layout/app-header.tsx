"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

const ReconciliationIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="0.5" y="0.5" width="13" height="13" rx="3.5" fill="white" stroke="#D1D5DB"/>
    </svg>
)


export function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4 p-4 md:px-6 md:pt-6 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-base font-semibold tracking-tight">ACH + Checks Reconciliation</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="outline" size="sm">Share</Button>
      </div>
    </header>
  )
}
