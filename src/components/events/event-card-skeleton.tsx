import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-border/80 bg-card/90">
      <Skeleton className="aspect-[16/10] w-full shrink-0 rounded-none" />
      <CardHeader className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>
        <Skeleton className="h-8 w-full" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </CardFooter>
    </Card>
  );
}
