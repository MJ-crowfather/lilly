
'use client';

import * as React from 'react';
import { Activity, Artifact } from '@/lib/data';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { DocumentIcon, VideoIcon, DashboardIcon, FileImage } from '@/components/ui/icons';
import Link from 'next/link';
import { DoneStatusIcon } from '@/components/reconciliation/done-status-icon';

type ArtifactPillProps = {
    artifact: Artifact;
    onClick?: (artifact: Artifact) => void;
};

const ArtifactPill = ({ artifact, onClick }: ArtifactPillProps) => {
    let icon;
    switch(artifact.type) {
        case 'document': icon = <DocumentIcon className="h-3 w-3" />; break;
        case 'video': icon = <VideoIcon className="h-3 w-3" />; break;
        case 'dashboard': icon = <DashboardIcon className="h-3 w-3" />; break;
        case 'link': icon = <ExternalLink className="h-3 w-3" />; break;
        case 'image': icon = <FileImage className="h-3 w-3" />; break;
        default: icon = <DocumentIcon className="h-3 w-3" />;
    }
    
    const commonProps = {
      className: "flex items-center gap-1.5 bg-muted hover:bg-muted/80 rounded-md px-2 py-1 text-xs cursor-pointer",
    };

    if (artifact.type === 'image') {
        return (
            <button onClick={() => onClick?.(artifact)} {...commonProps}>
                {icon}
                <span className="font-medium">{artifact.name}</span>
            </button>
        )
    }

    return (
        <Link 
            href={artifact.href || '#'} 
            target={artifact.external ? '_blank' : undefined}
            rel={artifact.external ? 'noopener noreferrer' : undefined}
            {...commonProps}
        >
            {icon}
            <span className="font-medium">{artifact.name}</span>
            {artifact.external && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
        </Link>
    )
};

export const ActivityTimeline = ({ activities, artifacts: allArtifacts, onArtifactClick }: { activities: Activity[], artifacts: Artifact[], onArtifactClick: (artifact: Artifact) => void; }) => {

    const getArtifactById = (id: string) => {
        return allArtifacts.find(a => a.id === id);
    }
    
    return (
        <div className="relative">
            {activities.map((activity, index) => {
                const activityDate = new Date(activity.timestamp);
                if (isNaN(activityDate.getTime())) {
                    console.error("Invalid timestamp for activity:", activity);
                    return null;
                }

                const activityArtifacts = activity.artifacts?.map(a => getArtifactById(a.id)).filter((a): a is Artifact => !!a) || [];

                return (
                    <div key={activity.id} className="flex items-start gap-4 mb-16">
                        <div className="text-xs text-muted-foreground min-w-[60px] text-right mt-0.5">{activityDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                        <div className="relative flex flex-col items-center">
                            <div className="relative z-10 bg-muted/30">
                                <DoneStatusIcon className="h-2 w-2 mt-1" />
                            </div>
                            {index < activities.length - 1 && (
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px bg-gray-200" style={{ height: 'calc(100% + 4rem)' }}></div>
                            )}
                        </div>
                        <div className="flex-1 pt-0 ml-2">
                            <p className="text-sm">{activity.description}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {activityArtifacts.map(artifact => <ArtifactPill key={artifact.id} artifact={artifact} onClick={onArtifactClick} />)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

    