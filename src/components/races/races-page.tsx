"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { PageCallout } from "@/components/layout/page-callout";
import { RaceImageCarousel } from "@/components/races/race-image-carousel";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEventsQuery } from "@/hooks/use-events-query";
import { type RaceMappingItem, RACE_MAPPINGS } from "@/lib/races-mapping";

function RaceCardSkeleton() {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-b from-card to-muted/25",
        "shadow-[0_14px_40px_-16px_rgba(0,0,0,0.55)]",
      )}
    >
      <div className="h-1 shrink-0 bg-gradient-to-r from-primary via-amber-500/85 to-primary" aria-hidden />
      <Skeleton className="h-48 w-full shrink-0 rounded-none md:h-52" />
      <div className="space-y-3 px-5 pb-2 pt-5">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-10 w-full max-w-[18ch]" />
      </div>
      <div className="flex flex-1 flex-col space-y-4 px-5 pb-5">
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-[94%] rounded-md" />
        <div className="rounded-lg border-l-2 border-primary/30 bg-muted/50 py-2 pl-3">
          <Skeleton className="h-3 w-3/4" />
        </div>
        <Skeleton className="mt-auto h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function RacesPage() {
  const { data: events = [], isLoading, isError } = useEventsQuery();

  /** Only races that have a live API event with `calendar_key` equal to this race's `id` (see `races-mapping.ts`). */
  const { displayRaces, racesSyncedToApi } = useMemo(() => {
    if (isLoading) {
      return { displayRaces: [] as RaceMappingItem[], racesSyncedToApi: false };
    }
    if (isError || !events.length) {
      return { displayRaces: [] as RaceMappingItem[], racesSyncedToApi: false };
    }
    const keySet = new Set(
      events.map((e) => e.calendarKey).filter((k): k is string => Boolean(k)),
    );
    const matched = RACE_MAPPINGS.filter((race) => keySet.has(race.id));
    return { displayRaces: matched, racesSyncedToApi: matched.length > 0 };
  }, [events, isLoading, isError]);

  const showSyncNote = !isLoading && !isError && events.length > 0 && racesSyncedToApi;

  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          2026 Races
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.9] tracking-wide md:text-3xl md:tracking-wider">
          Race Destinations
        </h1>
        <p className="max-w-[75ch] text-sm text-muted-foreground md:text-base">
          Discover each Formula 1 race destination with curated imagery and race-specific highlights. Use this page to explore races, then move to events to check real-time package availability.
        </p>
        {isError ? (
          <p className="text-sm text-amber-600/90 dark:text-amber-400/90">
            Live booking data could not be loaded. Races are hidden until the events API is available.
          </p>
        ) : null}
        {showSyncNote ? (
          <p className="text-xs text-muted-foreground">
            Only races with a matching calendar key on a live event are listed. Add or fix keys in admin to show more.
          </p>
        ) : null}
      </FadeIn>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <RaceCardSkeleton />
              </motion.div>
            ))
          : displayRaces.map((race, index) => {
              const matchedEvent = events.find((e) => e.calendarKey === race.id);
              const availabilityHref = matchedEvent
                ? `/events/${matchedEvent.id}`
                : `/events?q=${encodeURIComponent(race.name)}`;
              const carouselImageCount = race.images.filter(Boolean).length;
              const metaBottomClass =
                carouselImageCount > 1 ? "bottom-14" : "bottom-3";
              return (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                className="h-full"
              >
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary/25 bg-gradient-to-b from-card via-card to-muted/20",
                    "shadow-[0_14px_44px_-18px_rgba(0,0,0,0.55)] transition-all duration-300",
                    "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/15",
                  )}
                >
                  <div
                    className="h-1 shrink-0 bg-gradient-to-r from-primary via-amber-500/85 to-primary"
                    aria-hidden
                  />
                  <div className="relative overflow-hidden">
                    <RaceImageCarousel
                      images={race.images}
                      title={race.name}
                      className="h-48 md:h-52"
                      bottomMeta={
                        <>
                          <div
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/50 to-transparent"
                            aria-hidden
                          />
                          <div
                            className={cn(
                              "absolute inset-x-0 px-4 md:px-5",
                              metaBottomClass,
                            )}
                          >
                            <p
                              className={cn(
                                "flex max-w-[92%] flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase leading-none tracking-[0.22em]",
                                "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95)]",
                              )}
                            >
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="size-3 shrink-0 text-white" aria-hidden />
                                {race.dateLabel}
                              </span>
                              <span className="text-white/90" aria-hidden>
                                ·
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="size-3 shrink-0 text-white" aria-hidden />
                                {race.location}
                              </span>
                            </p>
                          </div>
                        </>
                      }
                    />
                  </div>

                  <div className="relative z-[1] space-y-2 px-5 pb-1 pt-4">
                    <h2 className="font-display text-[1.65rem] font-black uppercase leading-[0.92] tracking-[0.02em] text-foreground md:text-[1.85rem]">
                      {race.name}
                    </h2>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">{race.description}</p>
                    <div className="rounded-lg border-l-2 border-primary/40 bg-muted/45 px-3 py-2.5 dark:bg-muted/30">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Circuit
                      </p>
                      <p className="mt-1 font-display text-sm font-semibold uppercase leading-snug text-foreground">
                        {race.circuit}
                      </p>
                    </div>
                    <Link
                      href={availabilityHref}
                      className={cn(
                        "race-cta-link mt-auto inline-flex h-11 w-full items-center justify-center rounded-lg px-4",
                        "transition-[transform,filter,box-shadow]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee0000]/90 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                        "group-hover:scale-[1.01] active:scale-[0.99]",
                      )}
                    >
                      Check availability
                    </Link>
                  </div>
                </article>
              </motion.div>
            );
            })}
      </section>

      {!isLoading && !displayRaces.length ? (
        <p className="text-center text-sm text-muted-foreground">
          {isError || !events.length
            ? "Try again later or open Events to browse what is on sale."
            : "No races listed yet. Set each live event's calendar key in admin to match this site (e.g. japanese-gp), then refresh. You can also open Events."}
        </p>
      ) : null}

      <PageCallout
        badge="Next step"
        title="Check availability and book"
        description="See live ticket packages and VIP options for every race. Filter by event and secure your seats."
        href="/events"
        linkLabel="Browse events"
      />
    </main>
  );
}
