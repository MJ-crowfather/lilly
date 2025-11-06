
'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ActivityTimeline } from '@/components/reconciliation/activity-timeline';
import { KeyDetails } from '@/components/reconciliation/key-details';
import { clutchDoneCases, activityLog as baseActivityLog, baseArtifacts, specialArtifacts, type Activity, type Artifact } from '@/lib/data';
import { ArrowUp, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useCompany } from '@/components/company-provider';
import { PaceIcon } from '@/components/pace-icon';


export default function ActivityLogPage() {
    const { company } = useCompany();
    const router = useRouter();
    const params = useParams();
    const stockId = params.stockId as string;

    const [currentIndex, setCurrentIndex] = React.useState(
        clutchDoneCases.findIndex(c => c.stock_id === stockId)
    );

    // This effect ensures that if the stockId in the URL changes, we update the component's state.
    React.useEffect(() => {
        const newIndex = clutchDoneCases.findIndex(c => c.stock_id === stockId);
        if (newIndex !== -1) {
            setCurrentIndex(newIndex);
        } else {
            // If the stockId is not found, maybe redirect to the main done page.
            router.push('/done');
        }
    }, [stockId, router]);
    
    // This ensures we always have the correct case data for the current stockId.
    const caseData = clutchDoneCases[currentIndex];

    const navigate = (direction: 'next' | 'prev') => {
        const nextIndex = direction === 'next' 
            ? (currentIndex + 1) % clutchDoneCases.length 
            : (currentIndex - 1 + clutchDoneCases.length) % clutchDoneCases.length;
        const nextStockId = clutchDoneCases[nextIndex].stock_id;
        router.push(`/done/${nextStockId}`);
    };
    
    const activityLog = React.useMemo(() => {
        const caseSpecialArtifacts = specialArtifacts[stockId] || [];
        // Important: Create a deep copy of baseActivityLog to avoid mutations across renders.
        const newLog = JSON.parse(JSON.stringify(baseActivityLog));
        
        if (caseSpecialArtifacts.length > 0) {
            const documentsCapturedIndex = newLog.findIndex((act: Activity) => act.id === 'act2');
            if (documentsCapturedIndex !== -1) {
                 if (!newLog[documentsCapturedIndex].artifacts) {
                    newLog[documentsCapturedIndex].artifacts = [];
                }
                newLog[documentsCapturedIndex].artifacts.push(...caseSpecialArtifacts);
            }
        }
        return newLog;
    }, [stockId]);

    const getArtifactsForCase = (stockId: string): Artifact[] => {
        const caseSpecialArtifacts = specialArtifacts[stockId] || [];
        const activityArtifacts = activityLog.flatMap(a => a.artifacts || []);
        
        // Combine and remove duplicates
        const allArtifacts = [...baseArtifacts, ...caseSpecialArtifacts, ...activityArtifacts];
        const uniqueArtifacts = Array.from(new Map(allArtifacts.map(item => [item.id, item])).values());
        
        return uniqueArtifacts;
    };
    
    const artifacts = getArtifactsForCase(stockId);

    // If data is not yet available (e.g., during initial render or if stockId is invalid),
    // show a loading or fallback state.
    if (company !== 'Clutch' || !caseData) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <div className="flex flex-col h-screen bg-muted/30">
                        <AppHeader />
                        <div className="flex-1 flex items-center justify-center">Loading...</div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-col h-screen bg-muted/30">
                    <AppHeader />
                    <main className="flex-1 flex overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-auto">
                            <div className="p-6 border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm text-muted-foreground">Stock ID</p>
                                        <span className="font-semibold text-sm">{caseData.stock_id}</span>
                                        <Badge variant="outline" className="font-normal">
                                            <Check className="h-4 w-4 mr-1 text-green-600" />
                                            Done
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{currentIndex + 1} / {clutchDoneCases.length}</span>
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('prev')}>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('next')}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center py-6 px-8">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink mx-4 text-xs text-muted-foreground font-semibold">Today</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 pb-8">
                                <ActivityTimeline activities={activityLog} />
                            </div>

                            <div className="bg-background/80 backdrop-blur-sm p-4 border-t">
                                <div className="max-w-4xl mx-auto relative">
                                    <PaceIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Textarea
                                        placeholder="Work with Pace"
                                        className="rounded-xl p-4 pl-12 h-14 resize-none shadow-lg focus-visible:ring-primary/50"
                                    />
                                    <Button
                                        size="icon"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-gray-800 hover:bg-gray-900 text-white disabled:opacity-50"
                                    >
                                        <ArrowUp className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <aside className="w-[350px] border-l bg-background overflow-y-auto">
                            <KeyDetails caseData={caseData} artifacts={artifacts} />
                        </aside>
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
