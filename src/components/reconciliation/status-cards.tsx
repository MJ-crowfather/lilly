import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { StatusCard as StatusCardType } from "@/lib/data"
import { AlertTriangle, CheckCircle2, Loader2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type StatusCardsProps = {
  cards: StatusCardType[]
}

const iconMap = {
  "Needs Attention": (props: any) => <AlertTriangle {...props} />,
  "Void": (props: any) => <XCircle {...props} />,
  "In Progress": (props: any) => <Loader2 {...props} />,
  "Done": (props: any) => <CheckCircle2 {...props} />,
}

const colorMap = {
  "Needs Attention": "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  "Void": "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
  "In Progress": "bg-secondary text-secondary-foreground",
  "Done": "bg-accent text-accent-foreground",
}

export function StatusCards({ cards }: StatusCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = iconMap[card.title]
        return (
          <Card key={card.title} className={cn("shadow-sm", colorMap[card.title])}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className={cn("text-xs", card.change.startsWith('+') ? 'text-green-600' : 'text-red-600', colorMap[card.title] === "bg-accent text-accent-foreground" ? "text-accent-foreground/80" : "")}>
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
