'use client';

import * as React from 'react';
import { Activity, Artifact } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Check, ChevronRight } from 'lucide-react';
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
    let lastDate: string | null = null;
    
    return (
        <div className="max-w-4xl mx-auto">
            <div className="relative">
                {activities.map((activity, index) => {
                    const activityDate = new Date(activity.timestamp);
                    if (isNaN(activityDate.getTime())) {
                        console.error("Invalid timestamp:", activity.timestamp);
                        return null; // Don't render if date is invalid
                    }
                    const dateStr = activityDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    const showDate = dateStr !== lastDate;
                    if (showDate) {
                        lastDate = dateStr;
                    }

                    return (
                        <React.Fragment key={activity.id}>
                            {showDate && (
                                <div className="text-center my-6">
                                     <p className="text-xs text-muted-foreground font-semibold">{new Date(activity.timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) === new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ? 'Today' : new Date(activity.timestamp).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                </div>
                            )}
                            <div className="flex items-start gap-4 mb-8">
                                <div className="text-xs text-muted-foreground min-w-[60px] text-right mt-1">{activityDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                                <div className="relative flex flex-col items-center">
                                    <DoneStatusIcon className="h-4 w-4" />
                                    {index < activities.length - 1 && <div className="w-px h-full bg-border mt-1" style={{height: '4.5rem'}} />}
                                </div>
                                <div className="flex-1 pt-0.5 ml-2">
                                    <p className="text-sm">{activity.description}</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {activity.artifacts?.map(artifact => <ArtifactPill key={artifact.id} artifact={artifact} />)}
                                    </div>
                                    {activity.details && (
                                        <div className="mt-2 text-xs text-muted-foreground bg-muted p-3 rounded-md">
                                            {activity.details.seeReasoning && <button className="text-primary hover:underline">See reasoning</button>}
                                            {activity.details.viewData && <button className="text-primary hover:underline ml-4">View data</button>}
                                        </div>
                                    )}
                                </div>
                            </div>
                         </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
