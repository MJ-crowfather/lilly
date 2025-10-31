"use client"

import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  const pathname = usePathname();

  let title = "ACH + Checks Reconciliation";
  if (pathname.startsWith('/data')) {
    title = "Data";
  } else if (pathname.startsWith('/people')) {
    title = "People";
  }

  return (
    <header className="flex items-center justify-between gap-4 p-4 md:px-6 md:pt-6 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-sm font-normal tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="outline" size="sm">Share</Button>
      </div>
    </header>
  )
}
