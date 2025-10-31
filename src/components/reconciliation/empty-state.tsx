import { Card, CardContent } from "@/components/ui/card"

const BirdsIllustration = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="180" height="120" viewBox="0 0 213 142" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M63.8893 72.221L56.9375 79.1728L43.0339 65.2692L49.9857 58.3174L63.8893 72.221Z" fill="#D6E6F2"/>
        <path d="M56.9375 79.1728L63.8893 72.221L49.9857 58.3174L43.0339 65.2692L56.9375 79.1728Z" stroke="#B0C4DE" strokeOpacity="0.5" strokeWidth="0.5"/>
        <path d="M81.2431 106.398L88.1949 99.446L74.2913 85.5424L67.3395 92.4942L81.2431 106.398Z" fill="#D6E6F2"/>
        <path d="M88.1949 99.446L81.2431 106.398L67.3395 92.4942L74.2913 85.5424L88.1949 99.446Z" stroke="#B0C4DE" strokeOpacity="0.5" strokeWidth="0.5"/>
        <path d="M125.751 32.7481L118.799 39.7001L104.895 25.7963L111.847 18.8445L125.751 32.7481Z" fill="#D6E6F2"/>
        <path d="M118.799 39.7001L125.751 32.7481L111.847 18.8445L104.895 25.7963L118.799 39.7001Z" stroke="#B0C4DE" strokeOpacity="0.5" strokeWidth="0.5"/>
        <path d="M167.34 68.2281L160.388 75.1801L146.484 61.2763L153.436 54.3245L167.34 68.2281Z" fill="#D6E6F2"/>
        <path d="M160.388 75.1801L167.34 68.2281L153.436 54.3245L146.484 61.2763L160.388 75.1801Z" stroke="#B0C4DE" strokeOpacity="0.5" strokeWidth="0.5"/>
        <path d="M136.652 86.5416L143.604 79.5898L129.7 65.6862L122.748 72.638L136.652 86.5416Z" fill="#D6E6F2"/>
        <path d="M143.604 79.5898L136.652 86.5416L122.748 72.638L129.7 65.6862L143.604 79.5898Z" stroke="#B0C4DE" strokeOpacity="0.5" strokeWidth="0.5"/>
    </svg>
)

export function EmptyState() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
        <BirdsIllustration />
        <h3 className="mt-6 text-lg font-semibold">No blockers right now</h3>
        <p className="mt-1 text-muted-foreground max-w-sm">
          Sit back and let things flow, we'll nudge you when it's time to step in.
        </p>
    </div>
  )
}
