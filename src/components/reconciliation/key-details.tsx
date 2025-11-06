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
        <Link href="#" className="flex items-center gap-2 text-sm text-foreground bg-muted/60 hover:bg-muted rounded-md p-2">
            {icon}
            <span>{artifact.name}</span>
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
                            <h4 className="font-medium text-muted-foreground">Summary</h4>
                             <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li><span className="font-semibold text-foreground">Customer Name:</span> {caseData.customer_full_name}</li>
                                <li><span className="font-semibold text-foreground">Vehicle:</span> {caseData.vehicle_year} {caseData.vehicle_make} {caseData.vehicle_model}</li>
                                <li><span className="font-semibold text-foreground">BOS Effective Date:</span> {caseData.bos_effective_date}</li>
                                <li><span className="font-semibold text-foreground">Applicable Loan / Lien Amount:</span> {caseData.applicable_loan_balance}</li>
                                <li><span className="font-semibold text-foreground">Net Vehicle Value:</span> ${caseData.net_vehicle_value.toFixed(2)}</li>
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <Separator className="my-4" />

            <div className="space-y-4">
                 <h3 className="text-sm font-semibold">Artifacts</h3>
                 <div className="space-y-3">
                    {artifacts.map(artifact => <ArtifactLink key={artifact.id} artifact={artifact} />)}
                 </div>
            </div>
        </div>
    )
}
