"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Shield, Sparkles, Ticket } from "lucide-react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AboutPageContent() {
  return (
    <main className="mx-auto page-width space-y-10 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          About {APP_NAME}
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          About {APP_NAME}
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          {APP_NAME} offers Official F1® Ticket Packages to F1® Grands Prix™ in the UK and helps you get the most out of your Grand Prix™ weekend. Based in the United Kingdom, we serve fans across the UK, Europe and beyond with the best tickets available, first-class hotels where applicable, and seamless access you can trust.
        </p>
      </FadeIn>

      <section className="grid gap-6 md:grid-cols-2">
        <FadeIn delay={0.04}>
          <Card className="h-full border-border/80 bg-card/80">
            <CardContent className="p-6">
              <Ticket className="size-10 text-primary" />
              <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">F1® Grand Prix™ tickets</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Each Official F1® Ticket Package comes with carefully selected seating locations in the heart of the action. Choose from premium grandstand seats or exclusive trackside hospitality, each ensuring a prime view of the on-track action.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
        <FadeIn delay={0.05}>
          <Card className="h-full border-border/80 bg-card/80">
            <CardContent className="p-6">
              <Sparkles className="size-10 text-primary" />
              <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">Unique access to F1®</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Experience F1® like never before with access at each circuit on the calendar. From Pit Lane Walks and Guided Track Tours to the exclusive Paddock or Team Garages, and priority access to the post-race Podium Celebration—{APP_NAME} gets you closer to F1®.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
        <FadeIn delay={0.06}>
          <Card className="h-full border-border/80 bg-card/80">
            <CardContent className="p-6">
              <CalendarDays className="size-10 text-primary" />
              <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">Full service</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {APP_NAME} is your one-stop shop for a Grand Prix™ weekend. In one seamless process you can secure your seating, accommodation where offered, and transfers to and from the circuit. Our UK-based guest services team is on hand for any queries.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
        <FadeIn delay={0.07}>
          <Card className="h-full border-border/80 bg-card/80">
            <CardContent className="p-6">
              <Shield className="size-10 text-primary" />
              <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">Secure purchasing</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Official F1® Ticket Packages come from authorised sources, ensuring access to the circuit with no risk of fraud. Packages are shipped to your address with signature required, arranged for collection at the circuit, or delivered to your hotel when available.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      <FadeIn delay={0.08}>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
          <CardContent className="p-4 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-display font-bold text-lg uppercase tracking-tight md:text-xl">
                  Ready to book your Grand Prix™ weekend?
                </h2>
                <p className="mt-3 max-w-[50ch] text-sm text-muted-foreground">
                  Browse races, check availability and secure your official F1® tickets. Our team is here to help with any questions.
                </p>
              </div>
              <Button className="rounded-full" size="lg" asChild>
                <Link href="/events">
                  Browse events
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
