import { Card, CardContent } from "@/components/ui/card"

const EmptyStateIllustration = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M40 2.5H80L117.5 40V80L80 117.5H40L2.5 80V40L40 2.5Z" fill="hsl(var(--secondary))" />
    <path d="M40 2.5H80L117.5 40V80L80 117.5H40L2.5 80V40L40 2.5Z" stroke="hsl(var(--border))" strokeWidth="4"/>
    <path d="M38.75 60L53.75 75L81.25 45" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function EmptyState() {
  return (
    <Card className="w-full border-dashed shadow-none">
      <CardContent className="p-10 md:p-16 flex flex-col items-center justify-center text-center">
        <EmptyStateIllustration />
        <h3 className="mt-6 text-xl font-semibold">All Clear!</h3>
        <p className="mt-2 text-muted-foreground max-w-sm">
          There are no items that need your attention right now. Great job keeping things tidy!
        </p>
      </CardContent>
    </Card>
  )
}
