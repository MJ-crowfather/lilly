"use client"

import type { StatusCard as StatusCardType } from "@/lib/data"
import { cn } from "@/lib/utils"

const iconMap: { [key: string]: React.FC<any> } = {
  "Needs Attention": (props) => (
    <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <circle cx="4" cy="4" r="4" />
    </svg>
  ),
  "Void": (props) => (
    <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <rect width="8" height="8" rx="2" />
    </svg>
  ),
  "In Progress": (props) => (
    <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <rect width="8" height="8" rx="2" />
    </svg>
  ),
  "Done": (props) => (
     <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <rect width="8" height="8" rx="2" />
    </svg>
  ),
}

const colorMap = {
    "Needs Attention": "text-orange-500 border-orange-200 bg-orange-50/50",
    "Void": "text-gray-400",
    "In Progress": "text-blue-500",
    "Done": "text-green-500",
}

export function StatusToolbar({ statuses }: StatusToolbarProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      {statuses.map((status) => {
        const Icon = iconMap[status.title]
        return (
          <div
            key={status.title}
            className={cn(
              "flex items-center gap-2 p-1 rounded-md",
              status.title === "Needs Attention" && "border px-2" ,
              colorMap[status.title]
            )}
          >
            <Icon className="h-2 w-2" />
            <span>{status.title}</span>
            <span className="font-semibold text-foreground">{status.value}</span>
          </div>
        )
      })}
    </div>
  )
}
