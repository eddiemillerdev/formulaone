import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventDetailSkeleton() {
  return (
    <main className="mx-auto w-[min(1280px,95vw)] space-y-8 py-10 pb-20">
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-10 w-36 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden border-border/80 bg-card/85 pt-0">
          <Skeleton className="aspect-[2/1] w-full rounded-none md:aspect-[19/8]" />
          <CardHeader className="space-y-4">
            <Skeleton className="h-10 w-[85%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid gap-2 md:grid-cols-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full md:col-span-2" />
            </div>
          </CardHeader>
        </Card>

        <Card className="border-primary/35 bg-card">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-px w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-3 w-full" />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/80 bg-card/85 pt-0">
              <Skeleton className="aspect-[16/10] w-full rounded-none" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
