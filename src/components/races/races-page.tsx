"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { RaceImageCarousel } from "@/components/races/race-image-carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RACE_MAPPINGS } from "@/lib/races-mapping";

export function RacesPage() {
  return (
    <main className="mx-auto w-[min(1280px,95vw)] space-y-8 py-10 pb-20">
      <FadeIn className="space-y-4 rounded-3xl border border-border/70 bg-[radial-gradient(circle_at_14%_-8%,rgba(255,30,0,0.22),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(255,59,34,0.1),transparent_44%),linear-gradient(145deg,#181822,#20202d)] p-8 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          2026 Races
        </Badge>
        <h1 className="font-display text-2xl uppercase leading-[0.9] tracking-tight md:text-3xl">
          Race Destinations
        </h1>
        <p className="max-w-[75ch] text-sm text-muted-foreground md:text-base">
          Discover each Formula 1 race destination with curated imagery and race-specific highlights. Use this page to explore races, then move to events to check real-time package availability.
        </p>
      </FadeIn>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {RACE_MAPPINGS.map((race, index) => (
          <motion.div
            key={race.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
            className="h-full"
          >
            <Card className="flex h-full flex-col overflow-hidden border-border/75 bg-card/80">
              <RaceImageCarousel images={race.images} title={race.name} className="h-52" />

              <CardHeader className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full border-border bg-background/70 text-muted-foreground">
                    <CalendarDays className="mr-1 size-3" /> {race.dateLabel}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-border bg-background/70 text-muted-foreground">
                    <MapPin className="mr-1 size-3" /> {race.location}
                  </Badge>
                </div>
                <CardTitle className="font-display text-3xl uppercase leading-[0.95] tracking-tight">
                  {race.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col space-y-4">
                <p className="text-sm text-muted-foreground">{race.description}</p>
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  Circuit: <span className="text-foreground">{race.circuit}</span>
                </p>
                <Link
                  href={`/events?q=${encodeURIComponent(race.name)}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  Check availability <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
