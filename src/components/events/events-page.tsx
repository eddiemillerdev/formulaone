"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { EventCard } from "@/components/events/event-card";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import { FadeIn } from "@/components/motion/fade-in";
import { PageCallout } from "@/components/layout/page-callout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEventsQuery } from "@/hooks/use-events-query";

export function EventsPage() {
  const params = useSearchParams();
  const initialSearch = params.get("q") || "";

  const [search, setSearch] = useState(initialSearch);
  const [zone, setZone] = useState("all");

  const { data: events = [], isLoading, isError } = useEventsQuery();

  const zones = useMemo(() => {
    const discovered = Array.from(new Set(events.map((event) => event.zone))).filter(Boolean);
    return ["all", ...discovered];
  }, [events]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        [event.name, event.city, event.country, event.venue, event.zone]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesZone = zone === "all" || event.zone === zone;

      return matchesSearch && matchesZone;
    });
  }, [events, search, zone]);

  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Upcoming Events
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Find Tickets, Passes, and VIP Hospitality
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Filter by region or search by city and reserve inventory before sellout. Live package availability.
        </p>
      </FadeIn>

      <FadeIn delay={0.04} className="grid gap-3 rounded-2xl border border-border/80 bg-card/60 p-3 lg:grid-cols-[1fr_190px_auto]">
        <Input
          placeholder="Search city, race, or circuit"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-11 rounded-full"
        />
        <Select value={zone} onValueChange={setZone}>
          <SelectTrigger className="h-11 rounded-full">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {zones.map((zoneValue) => (
              <SelectItem key={zoneValue} value={zoneValue}>
                {zoneValue === "all" ? "All regions" : zoneValue}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-4 text-sm text-primary">
          {filtered.length} racing event{filtered.length === 1 ? "" : "s"} available
        </div>
      </FadeIn>

      {isError ? (
        <FadeIn delay={0.08}>
          <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            Could not load events. Please try again later.
          </div>
        </FadeIn>
      ) : null}

      {!isLoading && !filtered.length ? (
        <FadeIn delay={0.08}>
          <div className="rounded-2xl border border-border/80 bg-card/70 p-6">
            <p className="font-display text-2xl uppercase">No events found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another city, region, or package type.</p>
            <Button
              variant="secondary"
              className="mt-4 rounded-full"
              onClick={() => {
                setSearch("");
                setZone("all");
              }}
            >
              Reset filters
            </Button>
          </div>
        </FadeIn>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex min-h-[280px] items-center justify-center">
            <Empty className="w-full max-w-md border border-dashed border-border/80 bg-card/40 px-6">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Spinner className="size-8 text-primary" />
                </EmptyMedia>
                <EmptyTitle>Loading racing events</EmptyTitle>
                <EmptyDescription>
                  Please wait while we load available race weekends and packages.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          filtered.map((event, index) => (
              <FadeIn key={event.id} delay={0.08 + index * 0.04}>
                <EventCard event={event} />
              </FadeIn>
            ))
        )}
      </div>

      <PageCallout
        badge="Plan your season"
        title="View the full race calendar"
        description="See every Grand Prix weekend at a glance and jump straight to ticket packages for any date."
        href="/calendar"
        linkLabel="Open calendar"
      />
    </main>
  );
}
