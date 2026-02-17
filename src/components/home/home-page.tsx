"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CheckCircle2, Flag, Shield, Sparkles, Trophy, Users } from "lucide-react";

import { EventCard } from "@/components/events/event-card";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import { HeroEventsCarousel } from "@/components/home/hero-events-carousel";
import { SponsorCarousel } from "@/components/home/sponsor-carousel";
import { FadeIn } from "@/components/motion/fade-in";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEventsQuery } from "@/hooks/use-events-query";

const featurePanels = [
  {
    title: "Season Calendar",
    copy: "See every race weekend at a glance. Plan your year and go straight to official ticket packages, dates and availability for each Grand Prix.",
    href: "/calendar",
    icon: CalendarDays,
    image: "/backgrounds/British Grand Prix/2025 British GP - Max Verstappen.jpg",
  },
  {
    title: "Team Hub",
    copy: "Explore your favourite F1® teams, their race calendar and dedicated ticket options. Find packages for the circuits that matter to you.",
    href: "/teams",
    icon: Users,
    image: "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Charles Leclerc.jpg",
  },
] as const;

const asAssetUrl = (path: string) => encodeURI(path);

/** Video hero: src or embedUrl, plus optional heading/description overlaid on the video. */
const HOME_VIDEO: {
  src?: string;
  embedUrl?: string;
  heading?: string;
  description?: string;
} | null = {
  src: "/f1.mp4",
  heading: "Live the race",
  description: "Official ticket packages and VIP experiences at every Grand Prix. Find your weekend and book in minutes.",
};

export function HomePage() {
  const router = useRouter();
  const { data: events = [], isLoading, isError } = useEventsQuery();
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const featured = useMemo(() => events.slice(0, 3), [events]);

  useEffect(() => {
    const q = search.trim();
    if (q === "") return;
    const t = setTimeout(() => {
      router.push(`/events?q=${encodeURIComponent(q)}`);
    }, 400);
    return () => clearTimeout(t);
  }, [search, router]);

  function handleSearch() {
    const q = search.trim();
    setSearching(true);
    router.push(q ? `/events?q=${encodeURIComponent(q)}` : "/events");
  }

  function handleNavigate(href: string) {
    setNavigatingTo(href);
    router.push(href);
  }

  return (
    <main className="space-y-16 pb-20 md:space-y-20">
      <section className="mx-auto grid page-width gap-5 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeIn className="hero-panel-bg relative overflow-hidden rounded-3xl border border-border/70 p-4 md:p-9">
          <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-primary">
            Formula 1 Ticket Platform
          </Badge>

          <h1 className="mt-5 max-w-[13ch] font-display font-black text-2xl uppercase leading-[0.88] tracking-wide md:text-3xl md:tracking-wider">
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
            <Button className="h-11 rounded-full px-6" onClick={handleSearch} disabled={searching}>
              {searching ? <Spinner className="size-4" /> : null}
              {searching ? "Searching…" : "Find Tickets"}
            </Button>
          </div>

          <div className="mt-6 grid gap-3 text-center sm:grid-cols-3 sm:text-left">
            {[
              { label: "Global races", value: `${events.length || "--"}`, sub: "Events with live ticket inventory" },
              { label: "Avg response", value: "15m", sub: "Concierge reply time" },
              { label: "Fulfillment", value: "99.2%", sub: "Orders delivered before race weekend" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-border/70 bg-background/45 px-3 py-3"
              >
                <p className="font-display text-2xl font-black leading-none text-foreground md:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/80">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="h-full min-h-[480px]">
          <HeroEventsCarousel events={events} variant="hero" className="h-full min-h-[480px]" />
        </FadeIn>
      </section>

      <section className="mx-auto page-width overflow-hidden rounded-3xl border border-border/70">
        <FadeIn delay={0.04}>
          <div className="relative min-h-[28rem] w-full bg-muted/50 md:min-h-[32rem]">
            {/* Video background */}
            {HOME_VIDEO?.embedUrl ? (
              <iframe
                src={HOME_VIDEO.embedUrl}
                title="F1 Pass video"
                className="absolute inset-0 h-full w-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : HOME_VIDEO?.src ? (
              <video
                src={HOME_VIDEO.src}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            ) : null}
            {/* Overlay for readability */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30"
              aria-hidden
            />
            {/* Hero content */}
            <div className="relative flex min-h-[28rem] flex-col justify-end p-8 md:min-h-[32rem] md:p-10">
              {HOME_VIDEO?.heading ? (
                <h2 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide text-white drop-shadow-lg md:text-4xl md:tracking-wider">
                  {HOME_VIDEO.heading}
                </h2>
              ) : null}
              {HOME_VIDEO?.description ? (
                <p className="mt-3 max-w-[42ch] text-sm text-white/90 drop-shadow md:text-base">
                  {HOME_VIDEO.description}
                </p>
              ) : null}
              {!HOME_VIDEO?.src && !HOME_VIDEO?.embedUrl ? (
                <p className="mt-4 text-xs text-white/70">
                  Set <code className="rounded bg-white/20 px-1.5 py-0.5">HOME_VIDEO.src</code> or <code className="rounded bg-white/20 px-1.5 py-0.5">embedUrl</code> in home-page.tsx
                </p>
              ) : null}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto grid page-width gap-4 md:grid-cols-2">
        {featurePanels.map((panel, index) => (
          <motion.div
            key={panel.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <Card className="group h-full overflow-hidden border-border/80 bg-card/70 pt-0 md:pt-0">
              <div
                className="h-40 shrink-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(130deg, rgba(11,11,16,0.35), rgba(11,11,16,0.68)), url('${asAssetUrl(panel.image)}')`,
                }}
              />
              <CardHeader className="text-center md:text-left">
                <CardTitle className="font-display text-base uppercase tracking-tight">{panel.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center md:text-left">
                <p className="text-sm text-muted-foreground">{panel.copy}</p>
                <Link href={panel.href} className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline md:justify-start">
                  <panel.icon className="size-4" /> Open section
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto page-width space-y-8">
        <FadeIn className="text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Simple flow</p>
          <h2 className="font-display font-bold text-xl uppercase tracking-tight md:text-2xl">How it works</h2>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose your race",
              copy: "Browse the F1® calendar, filter by circuit or region, and pick your Grand Prix weekend. See dates and availability in one place.",
              icon: CalendarDays,
            },
            {
              step: "02",
              title: "Select a package",
              copy: "Compare official ticket packages—grandstand, VIP, hospitality—with live pricing and availability. Reserve before sell-out.",
              icon: Trophy,
            },
            {
              step: "03",
              title: "Book & confirm",
              copy: "Enter guest details and optional add-ons, then submit. You get confirmation and payment instructions; we handle the rest until you're at the circuit.",
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
              <Card className="relative flex h-full flex-col overflow-hidden border-border/80 bg-card/70 md:flex-row">
                <div className="flex flex-1 flex-col justify-center px-4 py-6 text-center md:px-6 md:text-left">
                  <span className="font-display text-2xl font-bold leading-none text-primary/60">{item.step}</span>
                  <CardTitle className="font-display text-sm uppercase tracking-tight mt-2">{item.title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
                </div>
                <div className="flex items-center justify-center overflow-hidden py-4 md:justify-end md:mr-[-70px] md:py-0">
                  <item.icon className="size-24 shrink-0 text-primary/40 md:size-32 lg:size-40" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto page-width">
        <Link
          href="/calendar"
          className="hero-panel-bg flex flex-col flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 px-4 py-4 md:px-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/5 md:flex-row md:px-6 md:text-left"
        >
          <div className="flex items-center gap-3">
            <CalendarDays className="size-5 shrink-0 text-primary md:size-6" />
            <span className="font-display text-sm font-bold uppercase tracking-tight md:text-base">2026 F1® Calendar</span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-primary">
            See full schedule <ArrowRight className="size-4" />
          </span>
        </Link>
      </section>

      <section className="mx-auto page-width space-y-5">
        <FadeIn className="flex flex-wrap items-end justify-between gap-3 text-center md:text-left">
          <div className="mx-auto md:mx-0">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Upcoming</p>
            <h2 className="font-display font-bold text-xl uppercase tracking-tight md:text-2xl">Featured Events</h2>
            <p className="mt-1 max-w-[50ch] text-sm text-muted-foreground md:max-w-none">
              Official ticket packages with live availability. Select an event to see options and reserve your weekend.
            </p>
          </div>
          <Link href="/calendar" className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline md:justify-start">
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

      <section className="mx-auto grid page-width gap-4 md:grid-cols-3">
        {[
          { icon: Flag, title: "24", copy: "Grands Prix in one place. Browse the full F1® calendar and book official ticket packages for any race weekend.", label: "Race weekends" },
          { icon: Sparkles, title: "15m", copy: "Our concierge typically replies within 15 minutes for booking and payment questions. We're here until you're at the circuit.", label: "Avg. response" },
          { icon: Trophy, title: "99.2%", copy: "Tickets and confirmations delivered before race weekend. Secure checkout and clear payment instructions every time.", label: "On-time fulfillment" },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <Card className="h-full border-border/80 bg-card/80">
              <CardHeader className="flex flex-col items-center pb-3 md:items-start">
                <item.icon className="size-16 text-primary md:size-20" />
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-display text-3xl font-black leading-none tracking-tight md:text-4xl">{item.title}</p>
                <p className="mt-3 text-sm text-muted-foreground">{item.copy}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <SponsorCarousel />

      <section className="mx-auto page-width">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
          <div className="grid gap-6 p-4 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.1em] text-primary">
                <Shield className="size-3.5" /> Trusted booking
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Authorised access to official F1® ticket inventory.</p>
              <h2 className="mt-3 font-display font-bold text-lg uppercase leading-tight tracking-tight md:text-xl">
                Official inventory, secure checkout
              </h2>
              <p className="mt-3 max-w-[50ch] text-sm text-muted-foreground">
                We connect you to authorised organiser inventory. Every booking is confirmed and backed by our concierge team until you&apos;re at the circuit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                className="rounded-full"
                size="lg"
                onClick={() => handleNavigate("/events")}
                disabled={!!navigatingTo}
              >
                {navigatingTo === "/events" ? <Spinner className="size-4" /> : null}
                {navigatingTo === "/events" ? "Loading…" : "Browse events"}
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                onClick={() => handleNavigate("/races")}
                disabled={!!navigatingTo}
              >
                {navigatingTo === "/races" ? <Spinner className="size-4" /> : null}
                {navigatingTo === "/races" ? "Loading…" : "Explore races"}
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
