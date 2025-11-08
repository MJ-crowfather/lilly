"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { StatusCard as StatusCardType } from "@/lib/data"
import { cn } from "@/lib/utils"

type StatusToolbarProps = {
    statuses: StatusCardType[]
}

const iconMap: { [key: string]: React.FC<any> } = {
  "Needs Attention": (props) => (
    <svg viewBox="0 0 8 8" {...props}>
      <rect width="8" height="8" rx="2" className="fill-orange-100 dark:fill-orange-900/50 stroke-orange-500 dark:stroke-orange-400" strokeWidth="1.5"/>
    </svg>
  ),
  "Void": (props) => (
    <svg viewBox="0 0 8 8" {...props}>
      <rect width="8" height="8" rx="2" className="fill-gray-100 dark:fill-gray-800 stroke-gray-500 dark:stroke-gray-400" strokeWidth="1.5"/>
    </svg>
  ),
  "In Progress": (props) => (
    <svg viewBox="0 0 8 8" {...props}>
      <rect width="8" height="8" rx="2" className="fill-blue-100 dark:fill-blue-900/50 stroke-blue-500 dark:stroke-blue-400" strokeWidth="1.5"/>
    </svg>
  ),
  "Done": (props) => (
     <svg viewBox="0 0 8 8" {...props}>
      <rect width="8" height="8" rx="2" className="fill-green-100 dark:fill-green-900/50 stroke-green-500 dark:stroke-green-400" strokeWidth="1.5"/>
    </svg>
  ),
}

const colorMap = {
    "Needs Attention": "text-foreground dark:text-foreground",
    "Void": "text-foreground dark:text-foreground",
    "In Progress": "text-foreground dark:text-foreground",
    "Done": "text-foreground dark:text-foreground",
}

const activeColorMap = {
    "Needs Attention": "text-foreground dark:text-foreground border-orange-200 dark:border-orange-500/50 bg-orange-50/50 dark:bg-orange-900/20",
    "Void": "text-foreground dark:text-foreground border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50",
    "In Progress": "text-foreground dark:text-foreground border-blue-200 dark:border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/20",
    "Done": "text-foreground dark:text-foreground border-green-200 dark:border-green-500/50 bg-green-50/50 dark:bg-green-900/20",
}

const linkMap: { [key: string]: string } = {
  "Needs Attention": "/",
  "Void": "/void",
  "In Progress": "/in-progress",
  "Done": "/done",
};

export function StatusToolbar({ statuses }: StatusToolbarProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      {statuses.map((status) => {
        const Icon = iconMap[status.title]
        const href = linkMap[status.title] || '#';
        const isActive = pathname === href;

        return (
          <Link href={href} key={status.title} className={cn(
              "flex items-center gap-1.5 p-1 rounded transition-colors",
              "hover:bg-muted/50",
              isActive ? activeColorMap[status.title] : colorMap[status.title],
              isActive && "border px-1.5" 
            )}>
            <Icon className="h-2 w-2" />
            <span>{status.title}</span>
            <span className={cn(
              "font-semibold",
              "text-muted-foreground"
            )}>{status.value}</span>
          </Link>
        )
      })}
    </div>
  )
}
