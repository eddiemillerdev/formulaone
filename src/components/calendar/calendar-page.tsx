"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CalendarDays, FlagTriangleRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { PageCallout } from "@/components/layout/page-callout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useEventsQuery } from "@/hooks/use-events-query";
import { type EventItem, formatMoney } from "@/lib/api/events";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type MonthBucket = {
  key: string;
  title: string;
  year: number;
  monthIndex: number;
  events: EventItem[];
};

function getUtcDateParts(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
    weekDay: date.getUTCDay(),
  };
}

function getDaysInUtcMonth(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

export function CalendarPage() {
  const { data: events = [], isLoading, isError } = useEventsQuery();

  const months = useMemo<MonthBucket[]>(() => {
    const map = new Map<string, MonthBucket>();

    for (const event of events) {
      const parts = getUtcDateParts(event.startDate);
      if (!parts) continue;

      const key = `${parts.year}-${String(parts.month + 1).padStart(2, "0")}`;
      if (!map.has(key)) {
        const monthTitle = new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(Date.UTC(parts.year, parts.month, 1)));

        map.set(key, {
          key,
          title: monthTitle,
          year: parts.year,
          monthIndex: parts.month,
          events: [],
        });
      }

      map.get(key)?.events.push(event);
    }

    return Array.from(map.values())
      .map((bucket) => ({
        ...bucket,
        events: [...bucket.events].sort(
          (left, right) => new Date(left.startDate).getTime() - new Date(right.startDate).getTime(),
        ),
      }))
      .sort(
        (left, right) =>
          new Date(Date.UTC(left.year, left.monthIndex, 1)).getTime() -
          new Date(Date.UTC(right.year, right.monthIndex, 1)).getTime(),
      );
  }, [events]);

  return (
    <main className="mx-auto page-width space-y-10 py-10 pb-20">
      <FadeIn className="hero-panel-bg relative overflow-hidden rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          View Calendar
        </Badge>
        <h1 className="mt-4 font-display font-black text-2xl uppercase leading-[0.9] tracking-wide md:text-3xl md:tracking-wider">
          Full Race Calendar
        </h1>
        <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground md:text-base">
          A month-by-month overview of all published race weekends. Click any event tile to open ticket packages and continue to order.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-2 text-xs text-muted-foreground">
          <CalendarDays className="size-4 text-primary" />
          {events.length} race weekends in the calendar
        </div>
      </FadeIn>

      {isError ? (
        <Card className="border-destructive/40 bg-destructive/10">
          <CardContent className="py-6 text-sm text-destructive">
            Could not load calendar data from the API.
          </CardContent>
        </Card>
      ) : null}

      {isLoading ? (
        <div className="flex min-h-[320px] items-center justify-center py-8">
          <Empty className="w-full max-w-md border border-dashed border-border/80 bg-card/40 px-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Spinner className="size-8 text-primary" />
              </EmptyMedia>
              <EmptyTitle>Loading calendar</EmptyTitle>
              <EmptyDescription>
                Please wait while we load the race calendar.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : null}

      {!isLoading && !months.length ? (
        <Card className="border-border/70 bg-card/70">
          <CardContent className="py-8 text-sm text-muted-foreground">No races published yet.</CardContent>
        </Card>
      ) : null}

      <section className="space-y-8">
        {months.map((month, monthIndex) => {
          const firstWeekday = new Date(Date.UTC(month.year, month.monthIndex, 1)).getUTCDay();
          const totalDays = getDaysInUtcMonth(month.year, month.monthIndex);

          const eventByDay = new Map<number, typeof month.events>();
          for (const event of month.events) {
            const parts = getUtcDateParts(event.startDate);
            if (!parts) continue;
            const list = eventByDay.get(parts.day) || [];
            list.push(event);
            eventByDay.set(parts.day, list);
          }

          const cells = [
            ...Array.from({ length: firstWeekday }, () => null),
            ...Array.from({ length: totalDays }, (_, index) => index + 1),
          ];

          return (
            <FadeIn key={month.key} delay={0.04 + monthIndex * 0.03}>
              <Card className="border-border/70 bg-card/65">
                <CardHeader className="flex flex-row items-end justify-between gap-3">
                  <CardTitle className="font-display text-2xl uppercase tracking-tight md:text-4xl">{month.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{month.events.length} race{month.events.length === 1 ? "" : "s"}</p>
                </CardHeader>
                <CardContent>
                  {/* Mobile: list of events (no 7-col grid) */}
                  <div className="space-y-3 md:hidden">
                    {month.events.length === 0 ? (
                      <p className="py-4 text-sm text-muted-foreground">No races this month.</p>
                    ) : (
                      month.events.map((event) => {
                        const parts = getUtcDateParts(event.startDate);
                        const dayLabel = parts ? `${parts.day} ${WEEK_DAYS[parts.weekDay]}` : "";
                        return (
                          <Link
                            key={event.id}
                            href={`/events/${event.id}`}
                            className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/50 p-4 transition hover:border-primary/40 hover:bg-primary/5"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="font-display text-sm font-semibold uppercase leading-tight text-foreground">{event.name}</p>
                              <p className="mt-1 text-xs text-muted-foreground">{dayLabel}</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              <span className="text-sm font-medium text-primary">{formatMoney(event.fromPrice, event.currency?.code)}</span>
                              <FlagTriangleRight className="size-4 text-muted-foreground" />
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>

                  {/* Desktop: full calendar grid */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-7 gap-2 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                      {WEEK_DAYS.map((day) => (
                        <div key={day} className="rounded-md border border-border/50 bg-background/50 px-2 py-2 text-center">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 grid grid-cols-7 gap-2">
                      {cells.map((day, index) => {
                        if (day == null) {
                          return <div key={`blank-${index}`} className="min-h-[120px] rounded-lg border border-border/40 bg-background/20" />;
                        }

                        const dailyEvents = eventByDay.get(day) || [];

                        return (
                          <div
                            key={`${month.key}-${day}`}
                            className="min-h-[120px] rounded-lg border border-border/60 bg-background/45 p-2"
                          >
                            <p className="font-display text-base uppercase leading-none text-foreground">{day}</p>
                            <div className="mt-2 space-y-2">
                              {dailyEvents.length ? (
                                dailyEvents.map((event) => (
                                  <Link
                                    key={event.id}
                                    href={`/events/${event.id}`}
                                    className="block rounded-md border border-primary/25 bg-primary/10 px-2 py-1.5 text-[11px] leading-tight text-foreground transition hover:border-primary/55 hover:bg-primary/20"
                                  >
                                    <span className="line-clamp-2 font-medium">{event.name}</span>
                                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                      <FlagTriangleRight className="size-3" />
                                      from {formatMoney(event.fromPrice, event.currency?.code)}
                                    </span>
                                  </Link>
                                ))
                              ) : (
                                <p className="pt-1 text-[10px] text-muted-foreground/70">No race</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          );
        })}
      </section>

      <PageCallout
        badge="Explore"
        title="Discover F1 teams and drivers"
        description="Browse teams, driver line-ups and team-specific ticket options for the season."
        href="/teams"
        linkLabel="View teams"
      />
    </main>
  );
}
