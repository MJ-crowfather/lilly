
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ActivityTimeline } from '@/components/reconciliation/activity-timeline';
import { KeyDetails } from '@/components/reconciliation/key-details';
import { clutchDoneCases, activityLog as baseActivityLog, baseArtifacts, specialArtifacts, type Activity, type Artifact, billOfSaleData, driversLicenseData } from '@/lib/data';
import { ArrowUp, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useCompany } from '@/components/company-provider';
import { PaceIcon } from '@/components/pace-icon';
import { DocumentViewer } from '@/components/reconciliation/document-viewer';


const dashboardUrlMap: Record<string, string> = {
    '72590': 'https://ben-staging.vercel.app/dashboard/order/C-YRSRVHD6', // Christopher Merjanian
    '83145': 'https://ben-staging.vercel.app/dashboard/order/C-R1WCSQH6', // Jessica Miller
    '94221': 'https://ben-staging.vercel.app/dashboard/order/C-KKZ9X4MH', // Michael Smith
    '10538': 'https://ben-staging.vercel.app/dashboard/order/C-476OERXH', // Emily Johnson
    '11649': 'https://ben-staging.vercel.app/dashboard/order/C-SI57QIJG', // David Williams
};


export default function ActivityLogPage() {
    const { company } = useCompany();
    const router = useRouter();
    const params = useParams();
    const stockId = params.stockId as string;

    const [viewerArtifact, setViewerArtifact] = React.useState<Artifact | null>(null);

    const currentIndex = React.useMemo(() => 
        clutchDoneCases.findIndex(c => c.stock_id === stockId),
        [stockId]
    );

    React.useEffect(() => {
        if (currentIndex === -1 && clutchDoneCases.length > 0) {
            router.push('/done');
        }
    }, [currentIndex, router]);
    
    const caseData = clutchDoneCases[currentIndex];
    const billOfSale = billOfSaleData.find(b => b.stock_id === stockId);
    const driversLicense = driversLicenseData.find(d => d.stock_id === stockId);


    const activityLog = React.useMemo(() => {
        const caseSpecialArtifacts = specialArtifacts[stockId] || [];
        const newLog = JSON.parse(JSON.stringify(baseActivityLog));
        
        const documentsCapturedIndex = newLog.findIndex((act: Activity) => act.id === 'act2');
        if (documentsCapturedIndex !== -1) {
            const existingArtifactIds = new Set(newLog[documentsCapturedIndex].artifacts?.map((a: any) => a.id) || []);
            const artifactsToAdd = caseSpecialArtifacts
                .filter(sa => ['art-passport', 'art-ontario'].includes(sa.id))
                .filter(sa => !existingArtifactIds.has(sa.id));

            if (artifactsToAdd.length > 0) {
                if (!newLog[documentsCapturedIndex].artifacts) {
                    newLog[documentsCapturedIndex].artifacts = [];
                }
                newLog[documentsCapturedIndex].artifacts.push(...artifactsToAdd.map(a => ({ id: a.id })));
            }
        }
        return newLog;
    }, [stockId]);

    const getArtifactsForCase = React.useCallback((stockId: string): Artifact[] => {
        const caseSpecialArtifacts = specialArtifacts[stockId] || [];
        
        const allArtifacts = [...baseArtifacts, ...caseSpecialArtifacts];
        
        const uniqueArtifactsMap = new Map<string, Artifact>();
        allArtifacts.forEach(artifact => {
            uniqueArtifactsMap.set(artifact.id, {...(uniqueArtifactsMap.get(artifact.id)), ...artifact});
        });

        const uniqueArtifacts = Array.from(uniqueArtifactsMap.values());
        
        const dashboardArtifact = uniqueArtifacts.find(a => a.id === 'art-dash');
        if (dashboardArtifact) {
            dashboardArtifact.href = dashboardUrlMap[stockId] || 'https://ben-staging.vercel.app/';
        }

        return uniqueArtifacts;
    }, []);
    
    const artifacts = getArtifactsForCase(stockId);

    const navigate = (direction: 'next' | 'prev') => {
        const newIndex = direction === 'next' 
            ? (currentIndex + 1) % clutchDoneCases.length 
            : (currentIndex - 1 + clutchDoneCases.length) % clutchDoneCases.length;
        const nextStockId = clutchDoneCases[newIndex].stock_id;
        router.push(`/done/${nextStockId}`);
    };

    if (company !== 'Clutch' || !caseData || !billOfSale || !driversLicense) {
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
    
    const openDocumentViewer = (artifact: Artifact) => {
        if(artifact.type === 'image' || artifact.type === 'video'){
            setViewerArtifact(artifact);
        }
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
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('prev')} disabled={clutchDoneCases.length <= 1}>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('next')} disabled={clutchDoneCases.length <= 1}>
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
                                <ActivityTimeline activities={activityLog} artifacts={artifacts} onArtifactClick={openDocumentViewer} />
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
                            <KeyDetails caseData={caseData} artifacts={artifacts} onArtifactClick={openDocumentViewer} />
                        </aside>
                    </main>
                </div>
                {viewerArtifact && (
                    <DocumentViewer
                        artifact={viewerArtifact}
                        billOfSaleData={billOfSale}
                        driversLicenseData={driversLicense}
                        onOpenChange={(open) => !open && setViewerArtifact(null)}
                    />
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}
