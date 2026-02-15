import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventItem } from "@/lib/api/events";
import { formatMoney } from "@/lib/api/events";

type EventCardProps = {
  event: EventItem;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/80 bg-card/90 transition-all hover:-translate-y-1 hover:border-primary/50">
      <div
        className="relative aspect-[16/10] w-full shrink-0 bg-cover bg-center"
        style={{
          backgroundImage: event.imageUrl
            ? `linear-gradient(130deg, rgba(21,21,30,0.1) 0%, rgba(21,21,30,0.65) 100%), url('${event.imageUrl}')`
            : "linear-gradient(130deg, #2b2a3f 0%, #4b2d2d 55%, #7e421f 100%)",
        }}
      />
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full border-border bg-background/60 text-muted-foreground">
            {event.monthLabel}
          </Badge>
          <Badge variant="outline" className="rounded-full border-border bg-background/60 text-muted-foreground">
            {event.city}
          </Badge>
          <Badge variant="outline" className="rounded-full border-border bg-background/60 text-muted-foreground">
            {event.zone}
          </Badge>
        </div>
        <CardTitle className="font-display text-2xl uppercase leading-tight tracking-tight text-foreground">
          {event.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          From <strong className="font-display text-lg text-foreground">{formatMoney(event.fromPrice)}</strong>
        </p>
        <Button asChild variant="secondary" className="rounded-full">
          <Link href={`/events/${event.id}`}>Check availability</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
