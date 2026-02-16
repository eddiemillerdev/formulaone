import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WEEK_DAYS = 7;
const ROWS = 5;

export function CalendarSkeleton() {
  return (
    <section className="space-y-8">
      {[1, 2, 3].map((monthIndex) => (
        <Card key={monthIndex} className="border-border/70 bg-card/65">
          <CardHeader className="flex flex-row items-end justify-between gap-3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-16" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: WEEK_DAYS }).map((_, i) => (
                <Skeleton key={i} className="h-8 rounded-md" />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {Array.from({ length: WEEK_DAYS * ROWS }).map((_, i) => (
                <Skeleton key={i} className="min-h-[120px] rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
