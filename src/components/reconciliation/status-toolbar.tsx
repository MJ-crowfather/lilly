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
    <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <rect width="8" height="8" rx="1.5" />
    </svg>
  ),
  "Void": (props) => (
    <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <rect width="8" height="8" rx="1.5" />
    </svg>
  ),
  "In Progress": (props) => (
    <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <rect width="8" height="8" rx="1.5" />
    </svg>
  ),
  "Done": (props) => (
     <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <rect width="8" height="8" rx="1.5" />
    </svg>
  ),
}

const colorMap = {
    "Needs Attention": "text-orange-500",
    "Void": "text-gray-500",
    "In Progress": "text-blue-500",
    "Done": "text-green-500",
}

const activeColorMap = {
    "Needs Attention": "text-orange-500 border-orange-200 bg-orange-50/50",
    "Void": "text-gray-700 border-gray-200 bg-gray-50/50",
    "In Progress": "text-blue-500 border-blue-200 bg-blue-50/50",
    "Done": "text-green-500 border-green-200 bg-green-50/50",
}

const linkMap: { [key: string]: string } = {
  "Needs Attention": "/",
  "Void": "/void",
  "In Progress": "#",
  "Done": "#",
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
            <Icon className="h-1.5 w-1.5" />
            <span>{status.title}</span>
            <span className={cn(
              "font-semibold",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}>{status.value}</span>
          </Link>
        )
      })}
    </div>
  )
}