

"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, ChevronsRight, Book, Share2, ChevronsUpDown } from 'lucide-react';
import { KnowledgeBaseIcon } from '../knowledge-base-icon';

const KnowledgeBaseHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Link href="/" className="text-muted-foreground hover:text-foreground">
        AE/PC Reporting
      </Link>
      <ChevronsRight className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium text-foreground">Knowledge Base</span>
    </div>
  );
};


const formatPath = (path: string) => {
  if (path.startsWith('/data/')) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <Link href="/data" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Data
        </Link>
        <ChevronsRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-foreground">AE/PC Report Sheet</span>
      </div>
    );
  }

  let title = "AE/PC Reporting";
  if (path.startsWith('/data')) {
    title = "Data";
  } else if (path.startsWith('/people')) {
    title = "Team";
  }

  return <h1 className="text-sm font-medium tracking-tight">{title}</h1>;
}

export function AppHeader() {
  const pathname = usePathname();
  
  if (pathname === '/knowledge-base') {
    return (
       <header className="flex h-[53px] items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <KnowledgeBaseHeader />
        </div>
      </header>
    )
  }
  
  const headerContent = formatPath(pathname);

  return (
    <header className="flex h-[53px] items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {headerContent}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button asChild variant="outline" size="sm" className="flex items-center gap-2 text-xs">
          <Link href="/knowledge-base">
            <Book className="h-4 w-4" />
            <span>Knowledge base</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </header>
  )
}
