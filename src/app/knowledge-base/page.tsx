
'use client';

import * as React from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, ChevronsUp } from 'lucide-react';
import { KnowledgeBaseIcon } from '@/components/knowledge-base-icon';
import { PaceIcon } from '@/components/pace-icon';

export default function KnowledgeBasePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 flex flex-col items-center justify-center kb-grid-bg relative">
            <div className="flex flex-col items-center text-center">
              <Button variant="outline" className="rounded-full bg-secondary border-primary/50 text-primary hover:bg-secondary/90 mb-6">
                <KnowledgeBaseIcon className="mr-2" />
                Knowledge Base
              </Button>
              <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                Ask <PaceIcon /> Pace anything about PR Validation
              </h1>

              <div className="w-full max-w-2xl relative">
                <Textarea 
                  placeholder="Ask away..."
                  className="rounded-xl p-4 pr-12 h-14 resize-none shadow-lg focus-visible:ring-primary/50"
                />
                <Button size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-gray-300 hover:bg-gray-400 text-gray-700">
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

             <div className="absolute bottom-6 text-center">
                <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                    <ChevronsUp className="h-5 w-5"/>
                    <span className="text-xs font-medium">Explore Knowledge Base</span>
                </button>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
