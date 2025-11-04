"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, ChevronsRight, Book, Share2 } from 'lucide-react';

const formatPath = (path: string) => {
  if (path.startsWith('/data/')) {
    const sheetName = path.split('/data/')[1].replace(/-/g, ' ');
    const capitalizedSheetName = sheetName.charAt(0).toUpperCase() + sheetName.slice(1);
    return (
      <div className="flex items-center gap-2">
        <Link href="/data" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Data
        </Link>
        <ChevronsRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Final Merged Sheet</span>
      </div>
    );
  }

  let title = "AE/PC Reporting";
  if (path.startsWith('/data')) {
    title = "Data";
  } else if (path.startsWith('/people')) {
    title = "People";
  }

  return <h1 className="text-sm font-medium tracking-tight">{title}</h1>;
}

export function AppHeader() {
  const pathname = usePathname();
  const headerContent = formatPath(pathname);

  return (
    <header className="flex h-[53px] items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {headerContent}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Book className="h-4 w-4" />
          <span>Knowledge base</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </header>
  )
}
