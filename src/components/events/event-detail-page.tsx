"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarRange, MapPin, ShieldCheck } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEventsQuery } from "@/hooks/use-events-query";
import type { TicketPackage } from "@/lib/api/events";
import { formatDate, formatMoney, getEventById } from "@/lib/api/events";
import { useBookingStore } from "@/store/booking-store";

type EventDetailPageProps = {
  eventId: string;
};

export function EventDetailPage({ eventId }: EventDetailPageProps) {
  const router = useRouter();
  const { data: events = [], isLoading, isError } = useEventsQuery();
  const setSelection = useBookingStore((state) => state.setSelection);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const selectedTicketRef = useRef<HTMLDivElement>(null);

  const event = useMemo(() => getEventById(events, eventId), [events, eventId]);
  const selectedPackage = useMemo(
    () => event?.tickets.find((t) => t.id === selectedPackageId) ?? null,
    [event?.tickets, selectedPackageId],
  );

  useEffect(() => {
    if (selectedPackageId && selectedTicketRef.current) {
      selectedTicketRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedPackageId]);

  if (isLoading) {
    return (
      <main className="mx-auto w-[min(1180px,92vw)] py-10">
        <Card className="border-border/80 bg-card/80">
          <CardContent className="py-10 text-sm text-muted-foreground">Loading event inventory...</CardContent>
        </Card>
      </main>
    );
  }

  if (isError || !event) {
    return (
      <main className="mx-auto w-[min(1180px,92vw)] py-10">
        <Card className="border-destructive/40 bg-destructive/10">
          <CardContent className="py-10 space-y-4">
            <p className="font-display text-2xl uppercase text-destructive">Event unavailable</p>
            <p className="text-sm text-destructive/90">Could not load this event from the API.</p>
            <Button variant="secondary" className="rounded-full" onClick={() => router.push("/events")}>
              Back to events
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto w-[min(1180px,92vw)] space-y-8 py-10 pb-20">
      <FadeIn className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" className="rounded-full" onClick={() => router.push("/events") }>
          <ArrowLeft className="mr-2 size-4" /> Back to events
        </Button>
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
          {event.dateLabel}
        </Badge>
      </FadeIn>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <FadeIn className="space-y-5">
          <Card className="overflow-hidden border-border/80 bg-card/85">
            <div
              className="h-64 bg-cover bg-center md:h-[19rem]"
              style={{
                backgroundImage: event.imageUrl
                  ? `linear-gradient(130deg, rgba(21,21,30,0.2) 0%, rgba(21,21,30,0.7) 100%), url('${event.imageUrl}')`
                  : "linear-gradient(130deg, #2b2a3f 0%, #4b2d2d 55%, #7e421f 100%)",
              }}
            />
            <CardHeader className="space-y-4">
              <CardTitle className="font-display text-4xl uppercase leading-none tracking-tight">{event.name}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">{event.description}</CardDescription>
              <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                <p className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-primary" /> {event.venue}, {event.city}
                </p>
                <p className="inline-flex items-center gap-2">
                  <CalendarRange className="size-4 text-primary" /> {event.dateLabel}
                </p>
                <p className="inline-flex items-center gap-2 md:col-span-2">
                  <ShieldCheck className="size-4 text-primary" /> Organized by {event.organiser.name}
                </p>
              </div>
            </CardHeader>
          </Card>
        </FadeIn>

        <FadeIn delay={0.06}>
          <Card className="sticky top-24 self-start border-primary/35 bg-gradient-to-br from-primary/20 via-card to-card">
            <CardHeader>
              <CardTitle className="font-display text-3xl uppercase">Booking Summary</CardTitle>
              <CardDescription>Live package inventory from public API endpoint.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Packages listed</span>
                <span className="font-semibold">{event.ticketCount}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Starting from</span>
                <span className="font-display text-xl">{formatMoney(event.fromPrice)}</span>
              </div>
              <div className="space-y-2">
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  {selectedPackageId ? "Selected package" : "Select package"}
                </label>
                <Select value={selectedPackageId ?? ""} onValueChange={(v) => setSelectedPackageId(v || null)}>
                  <SelectTrigger className="w-full max-w-full rounded-xl [&>span]:max-w-full [&>span]:truncate">
                    <SelectValue placeholder={selectedPackageId ? "Selected package" : "Choose a package"} />
                  </SelectTrigger>
                  <SelectContent>
                    {event.tickets.map((ticket) => {
                      const isSoldOut =
                        ticket.isSoldOut || (!ticket.isUnlimited && (ticket.quantityRemaining ?? 0) <= 0);
                      return (
                        <SelectItem key={ticket.id} value={ticket.id} disabled={isSoldOut} className="truncate max-w-full">
                          <span className="block truncate">{ticket.title} — {formatMoney(ticket.price)}
                          {isSoldOut ? " (Sold out)" : ""}</span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">
                Choose a package above or below to continue with order.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      <section className="space-y-4">
        <FadeIn>
          <h2 className="font-display text-4xl uppercase tracking-tight">Available Packages</h2>
        </FadeIn>

        {selectedPackage ? (
          <div ref={selectedTicketRef}>
            <FadeIn className="w-full space-y-3">
              <button
                type="button"
                onClick={() => setSelectedPackageId(null)}
                className="text-sm text-muted-foreground underline hover:text-foreground"
              >
                ← View all packages
              </button>
              <SelectedPackageCard
                event={event}
                ticket={selectedPackage}
                onContinue={() => {
                  setSelection({
                    eventId: event.id,
                    ticketId: selectedPackage.id,
                    ticketCategory: selectedPackage.category,
                  });
                  router.push(`/checkout?event=${event.id}&ticket=${selectedPackage.id}`);
                }}
              />
            </FadeIn>
          </div>
        ) : (
          <div className="grid w-full gap-4">
            {event.tickets.map((ticket, index) => {
              const isSoldOut =
                ticket.isSoldOut || (!ticket.isUnlimited && (ticket.quantityRemaining ?? 0) <= 0);
              const availabilityLabel = isSoldOut
                ? "Sold out"
                : ticket.isUnlimited
                  ? "Available"
                  : `${ticket.quantityRemaining} remaining`;

              return (
                <FadeIn key={ticket.id} delay={0.05 + index * 0.03}>
                  <Card className="w-full border-border/80 bg-card/80">
                    <CardHeader className="space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <CardTitle className="font-display text-2xl uppercase leading-tight">{ticket.title}</CardTitle>
                        <span className="font-display text-3xl leading-none">{formatMoney(ticket.price)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline" className="rounded-full border-border bg-background/70 text-muted-foreground">
                          {ticket.category.toUpperCase()}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="rounded-full border-border bg-background/70 text-muted-foreground"
                        >
                          {availabilityLabel}
                        </Badge>
                        <Badge variant="outline" className="rounded-full border-border bg-background/70 text-muted-foreground">
                          {formatDate(ticket.startSaleDate)} - {formatDate(ticket.endSaleDate)}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        {ticket.descriptionPreview || "Official Formula 1 ticket package"}
                      </CardDescription>
                      {ticket.descriptionMarkdown ? (
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={`details-${ticket.id}`} className="border-border/70">
                            <AccordionTrigger className="py-2 text-sm text-foreground hover:no-underline">
                              View full package details
                            </AccordionTrigger>
                            <AccordionContent className="pt-2">
                              <MarkdownContent markdown={ticket.descriptionMarkdown} />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : null}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        className="w-full rounded-full"
                        disabled={isSoldOut}
                        onClick={() => setSelectedPackageId(ticket.id)}
                      >
                        {isSoldOut ? "Currently Sold Out" : "Select package"}
                      </Button>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function SelectedPackageCard({
  event,
  ticket,
  onContinue,
}: {
  event: { id: string; name: string };
  ticket: TicketPackage;
  onContinue: () => void;
}) {
  const isSoldOut =
    ticket.isSoldOut || (!ticket.isUnlimited && (ticket.quantityRemaining ?? 0) <= 0);
  const availabilityLabel = isSoldOut
    ? "Sold out"
    : ticket.isUnlimited
      ? "Available"
      : `${ticket.quantityRemaining} remaining`;

  return (
    <Card className="w-full border-primary/30 bg-card/90">
      <CardHeader className="space-y-3">
        <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Selected package</p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <CardTitle className="font-display text-3xl uppercase leading-tight">{ticket.title}</CardTitle>
          <span className="font-display text-4xl leading-none">{formatMoney(ticket.price)}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline" className="rounded-full border-border bg-background/70 text-muted-foreground">
            {ticket.category.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="rounded-full border-border bg-background/70 text-muted-foreground">
            {availabilityLabel}
          </Badge>
          <Badge variant="outline" className="rounded-full border-border bg-background/70 text-muted-foreground">
            {formatDate(ticket.startSaleDate)} – {formatDate(ticket.endSaleDate)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {ticket.descriptionPreview || "Official Formula 1 ticket package"}
        </CardDescription>
        {ticket.descriptionMarkdown ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details" className="border-border/70">
              <AccordionTrigger className="py-2 text-sm text-foreground hover:no-underline">
                View full package details
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <MarkdownContent markdown={ticket.descriptionMarkdown} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : null}
      </CardHeader>
      <CardContent>
        <Button
          className="w-full rounded-full"
          disabled={isSoldOut}
          onClick={onContinue}
        >
          {isSoldOut ? "Currently Sold Out" : "Continue with this package"}
        </Button>
      </CardContent>
    </Card>
  );
}
