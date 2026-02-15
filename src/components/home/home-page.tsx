"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CheckCircle2, Flag, Shield, Sparkles, Trophy, Users } from "lucide-react";

import { EventCard } from "@/components/events/event-card";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import { HeroEventsCarousel } from "@/components/home/hero-events-carousel";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEventsQuery } from "@/hooks/use-events-query";

const featurePanels = [
  {
    title: "Season Calendar",
    copy: "Open the full monthly calendar with all race dates and direct ticket links.",
    href: "/calendar",
    icon: CalendarDays,
    image: "/backgrounds/British Grand Prix/2025 British GP - Max Verstappen.jpg",
  },
  {
    title: "Team Hub",
    copy: "A dedicated teams area now exists so you can plug official data later.",
    href: "/teams",
    icon: Users,
    image: "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Charles Leclerc.jpg",
  },
] as const;

const asAssetUrl = (path: string) => encodeURI(path);

export function HomePage() {
  const router = useRouter();
  const { data: events = [], isLoading, isError } = useEventsQuery();
  const [search, setSearch] = useState("");

  const featured = useMemo(() => events.slice(0, 3), [events]);

  function handleSearch() {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    router.push(`/events${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <main className="space-y-16 pb-20 md:space-y-20">
      <section className="mx-auto grid w-[min(1280px,95vw)] gap-5 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeIn className="relative overflow-hidden rounded-3xl border border-border/70 bg-[radial-gradient(circle_at_12%_-8%,rgba(255,30,0,0.2),transparent_37%),radial-gradient(circle_at_80%_10%,rgba(255,59,34,0.1),transparent_40%),linear-gradient(145deg,#16161f,#1e1e2a)] p-7 md:p-9">
          <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-primary">
            Formula 1 Ticket Platform
          </Badge>

          <h1 className="mt-5 max-w-[13ch] font-display text-2xl uppercase leading-[0.88] tracking-tight md:text-3xl">
            Race Weekends, VIP Access, One Booking Flow.
          </h1>
          <p className="mt-4 max-w-[58ch] text-sm text-muted-foreground md:text-base">
            Find live race inventory, compare ticket packages, and complete order flow in minutes. Built for high-demand Formula 1 weekends.
          </p>

          <div className="mt-6 grid gap-3 rounded-2xl border border-border/80 bg-card/70 p-3 md:grid-cols-[1fr_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search race, city, or circuit"
              className="h-11 rounded-full border-input bg-background"
            />
            <Button className="h-11 rounded-full px-6" onClick={handleSearch}>
              Find Tickets
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Global races", value: `${events.length || "--"}` },
              { label: "Avg response", value: "15m" },
              { label: "Fulfillment", value: "99.2%" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-border/70 bg-background/45 px-3 py-3"
              >
                <p className="font-display text-lg leading-none text-foreground">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="h-full min-h-[480px]">
          <HeroEventsCarousel events={events} variant="hero" className="h-full min-h-[480px]" />
        </FadeIn>
      </section>

      <section className="mx-auto grid w-[min(1280px,95vw)] gap-4 md:grid-cols-2">
        {featurePanels.map((panel, index) => (
          <motion.div
            key={panel.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <Card className="group h-full overflow-hidden border-border/80 bg-card/70">
              <div
                className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(130deg, rgba(11,11,16,0.35), rgba(11,11,16,0.68)), url('${asAssetUrl(panel.image)}')`,
                }}
              />
              <CardHeader>
                <CardTitle className="font-display text-base uppercase tracking-tight">{panel.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{panel.copy}</p>
                <Link href={panel.href} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <panel.icon className="size-4" /> Open section
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto w-[min(1280px,95vw)] space-y-8">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Simple flow</p>
          <h2 className="font-display text-xl uppercase tracking-tight md:text-2xl">How it works</h2>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose your race",
              copy: "Browse races and events, filter by circuit or package type, and pick your weekend.",
              icon: CalendarDays,
            },
            {
              step: "02",
              title: "Select a package",
              copy: "Compare official ticket packages, VIP options, and availability in one place.",
              icon: Trophy,
            },
            {
              step: "03",
              title: "Book & confirm",
              copy: "Complete guest details, add-ons, and submit. We handle the rest until race day.",
              icon: CheckCircle2,
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full border-border/80 bg-card/70">
                <CardHeader className="pb-2">
                  <span className="font-display text-2xl leading-none text-primary/60">{item.step}</span>
                  <item.icon className="size-8 text-primary" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="font-display text-sm uppercase tracking-tight">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.copy}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1280px,95vw)] space-y-5">
        <FadeIn className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Upcoming</p>
            <h2 className="font-display text-xl uppercase tracking-tight md:text-2xl">Featured Events</h2>
          </div>
          <Link href="/calendar" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            View full calendar <ArrowRight className="size-4" />
          </Link>
        </FadeIn>

        {isError ? (
          <Card className="border-destructive/40 bg-destructive/10">
            <CardContent className="py-6 text-sm text-destructive">
              Could not load events from the public API. Please retry.
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => <EventCardSkeleton key={index} />)
            : featured.map((event, index) => (
                <FadeIn key={event.id} delay={0.08 + index * 0.06}>
                  <EventCard event={event} />
                </FadeIn>
              ))}
        </div>
      </section>

      <section className="mx-auto grid w-[min(1280px,95vw)] gap-4 md:grid-cols-3">
        {[
          { icon: Flag, title: "24", copy: "Global race weekends covered in one booking flow." },
          { icon: Sparkles, title: "15m", copy: "Average concierge response time for urgent requests." },
          { icon: Trophy, title: "99.2%", copy: "On-time ticket fulfillment before race weekend." },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <Card className="h-full border-border/80 bg-card/80">
              <CardHeader className="pb-3">
                <item.icon className="size-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="font-display text-xl leading-none tracking-tight">{item.title}</p>
                <p className="mt-3 text-sm text-muted-foreground">{item.copy}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto w-[min(1280px,95vw)]">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
          <div className="grid gap-6 p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.1em] text-primary">
                <Shield className="size-3.5" /> Trusted booking
              </div>
              <h2 className="mt-4 font-display text-lg uppercase leading-tight tracking-tight md:text-xl">
                Official inventory, secure checkout
              </h2>
              <p className="mt-3 max-w-[50ch] text-sm text-muted-foreground">
                We connect you to authorised organiser inventory. Every booking is confirmed and backed by our concierge team until you&apos;re at the circuit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full" size="lg">
                <Link href="/events">Browse events</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full" size="lg">
                <Link href="/races">Explore races</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
