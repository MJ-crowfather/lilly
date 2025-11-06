
'use client';

import * as React from 'react';
import { Activity, Artifact } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { DocumentIcon, VideoIcon, DashboardIcon } from '@/components/ui/icons';
import Link from 'next/link';
import { DoneStatusIcon } from '@/components/reconciliation/done-status-icon';

const ArtifactPill = ({ artifact }: { artifact: Artifact }) => {
    let icon;
    switch(artifact.type) {
        case 'document': icon = <DocumentIcon className="h-3 w-3" />; break;
        case 'video': icon = <VideoIcon className="h-3 w-3" />; break;
        case 'dashboard': icon = <DashboardIcon className="h-3 w-3" />; break;
        default: icon = <DocumentIcon className="h-3 w-3" />;
    }

    return (
        <Link href="#" className="flex items-center gap-1.5 bg-background border rounded-md px-2 py-1 text-xs hover:bg-muted">
            {icon}
            <span className="font-medium">{artifact.name}</span>
            {artifact.external && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
        </Link>
    )
};

export const ActivityTimeline = ({ activities }: { activities: Activity[] }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="relative">
                {activities.map((activity, index) => {
                    const activityDate = new Date(activity.timestamp);
                    if (isNaN(activityDate.getTime())) {
                        console.error("Invalid timestamp for activity:", activity);
                        return null; 
                    }

                    return (
                        <React.Fragment key={activity.id}>
                            <div className="flex items-start gap-4 mb-8">
                                <div className="text-xs text-muted-foreground min-w-[60px] text-right mt-0.5">{activityDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                                <div className="relative flex flex-col items-center">
                                    <DoneStatusIcon className="h-2 w-2 mt-1" />
                                    {index < activities.length - 1 && <div className="w-px h-full bg-border absolute top-full" style={{height: 'calc(100% + 2rem + 2px)'}} />}
                                </div>
                                <div className="flex-1 pt-0 ml-2">
                                    <p className="text-xs">{activity.description}</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {activity.artifacts?.map(artifact => <ArtifactPill key={artifact.id} artifact={artifact} />)}
                                    </div>
                                </div>
                            </div>
                         </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
