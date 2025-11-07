
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, ChevronsRight, Book, Share2 } from 'lucide-react';
import { useCompany } from '../company-provider';

const KnowledgeBaseHeader = () => {
  const router = useRouter();
  const { companyData } = useCompany();
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Link href="/" className="text-muted-foreground hover:text-foreground">
        {companyData.processName}
      </Link>
      <ChevronsRight className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium text-foreground">Knowledge Base</span>
    </div>
  );
};

const ActivityLogHeader = () => {
    const { companyData } = useCompany();
    return (
      <div className="flex items-center gap-2 text-sm">
        <Link href="/done" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            {companyData.processName}
        </Link>
        <ChevronsRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-foreground">Activity Logs</span>
      </div>
    );
};


const formatPath = (path: string, company: 'Eli Lilly' | 'Clutch' | 'skunk works') => {
  if (path.startsWith('/data/')) {
    const isClutch = company === 'Clutch';
    let dataSetName = 'AE/PC Report Sheet'; // Default for Lilly
    if (isClutch) {
        if (path.includes('bill-of-sale')) {
            dataSetName = 'Bill of Sale Dataset';
        } else if (path.includes('drivers-license')) {
            dataSetName = "Driver's License Dataset";
        }
    }

    return (
      <div className="flex items-center gap-2 text-xs">
        <Link href="/data" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Data
        </Link>
        <ChevronsRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-foreground">{dataSetName}</span>
      </div>
    );
  }

  let title = "AE/PC Reporting"; // Default for Eli Lilly
  if (company === 'Clutch') {
      title = "Document Verification";
  } else if (company === 'skunk works') {
      title = "Stealth Project";
  }

  if (path.startsWith('/data')) {
    title = "Data";
  } else if (path.startsWith('/people')) {
    title = "Team";
  }

  return <h1 className="text-sm font-medium tracking-tight">{title}</h1>;
}

export function AppHeader() {
  const pathname = usePathname();
  const { company } = useCompany();
  
  if (pathname.startsWith('/knowledge-base')) {
    return (
       <header className="flex h-[53px] items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <KnowledgeBaseHeader />
        </div>
      </header>
    )
  }

  if (pathname.startsWith('/done/')) {
    return (
      <header className="flex h-[53px] items-center justify-between gap-4 px-4 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <ActivityLogHeader />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2 text-xs">
            <Link href="/knowledge-base">
              <Book className="h-4 w-4" />
              <span>Knowledge Base</span>
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
  
  const headerContent = formatPath(pathname, company);

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
            <span>Knowledge Base</span>
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
