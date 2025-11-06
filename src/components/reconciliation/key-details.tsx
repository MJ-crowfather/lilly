
'use client';

import * as React from 'react';
import Link from 'next/link';
import { type ClutchDoneCase, type Artifact } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { DocumentIcon, VideoIcon, DashboardIcon } from '@/components/ui/icons';

const ArtifactLink = ({ artifact }: { artifact: Artifact }) => {
    let icon;
    switch(artifact.type) {
        case 'document': icon = <DocumentIcon className="h-4 w-4" />; break;
        case 'video': icon = <VideoIcon className="h-4 w-4" />; break;
        case 'dashboard': icon = <DashboardIcon className="h-4 w-4" />; break;
        case 'link': icon = <ExternalLink className="h-4 w-4" />; break;
        default: icon = <DocumentIcon className="h-4 w-4" />;
    }

    return (
        <Link href="#" className="inline-flex items-center gap-2 text-foreground bg-muted hover:bg-muted/80 rounded-md p-2 text-xs">
            {icon}
            <span className="text-xs">{artifact.name}</span>
            {artifact.external && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
        </Link>
    )
};


export const KeyDetails = ({ caseData, artifacts }: { caseData: ClutchDoneCase, artifacts: Artifact[] }) => {
    return (
        <div className="p-4">
             <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" className="border-b-0">
                    <div className="flex justify-between items-center">
                        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2 w-full">Key Details</AccordionTrigger>
                         <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Maximize2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </div>
                    <AccordionContent>
                        <div className="space-y-3 text-sm">
                            <h4 className="font-medium text-muted-foreground text-xs">Summary</h4>
                             <div className="grid grid-cols-[max-content,1fr] gap-x-2 gap-y-2 text-xs">
                                <span className="text-muted-foreground">Customer Name:</span>
                                <span className="font-medium text-foreground text-left">{caseData.customer_full_name}</span>
                                
                                <span className="text-muted-foreground">Vehicle:</span>
                                <span className="font-medium text-foreground text-left">{caseData.vehicle_year} {caseData.vehicle_make} {caseData.vehicle_model}</span>
                                
                                <span className="text-muted-foreground">BOS Effective Date:</span>
                                <span className="font-medium text-foreground text-left">{caseData.bos_effective_date}</span>

                                <span className="text-muted-foreground">Applicable Loan / Lien Amount:</span>
                                <span className="font-medium text-foreground text-left">{caseData.applicable_loan_balance}</span>
                                
                                <span className="text-muted-foreground">Net Vehicle Value:</span>
                                <span className="font-medium text-foreground text-left">${caseData.net_vehicle_value.toFixed(2)}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <Separator className="my-4" />

            <div className="space-y-4">
                 <h3 className="text-xs font-semibold">Artifacts</h3>
                 <div className="flex flex-col items-start gap-3">
                    {artifacts.map(artifact => <ArtifactLink key={artifact.id} artifact={artifact} />)}
                 </div>
            </div>
        </div>
    )
}
