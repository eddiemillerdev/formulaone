"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useF1TeamSectionsQuery } from "@/hooks/use-f1-teams-query";
import type { F1Team, F1TeamSection } from "@/lib/api/f1-teams";

const CAR_BG_IMAGE = "/images/car-bg.webp";

function TeamCard({ team, index }: { team: F1Team; index: number }) {
  const bgColor = team.background_color || "#333";
  const logoBg = "#1a1a1a";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-lg border border-border/70"
    >
      <div
        className="relative flex min-h-[200px] flex-col p-6 pb-0 text-white"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex shrink-0 flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
              {team.name}
            </h3>
            {team.logo_url && (
              <div
                className="flex shrink-0 items-center justify-center rounded-md p-2"
                style={{ backgroundColor: logoBg }}
              >
                <img
                  src={team.logo_url}
                  alt=""
                  className="h-10 w-10 object-contain"
                  role="presentation"
                />
              </div>
            )}
          </div>
          {team.drivers.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {team.drivers.map((d) => (
                <div key={`${d.first_name}-${d.last_name}`} className="flex items-center gap-2">
                  <span
                    className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white/30 bg-white/10"
                    style={{ backgroundColor: bgColor }}
                  >
                    <img
                      src={d.avatar_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="text-sm text-white/95">
                    <span className="font-medium uppercase">{d.last_name}</span>
                    <span className="ml-1 text-white/80">{d.first_name}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {team.car_image_url && (
          <div className="relative -mx-6 mt-4 min-h-28 flex-1 w-[calc(100%+3rem)] overflow-hidden flex items-center">
            {/* Car-bg image layer with transparency (not 50%) — extends to bottom of card */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
              style={{ backgroundImage: `url(${CAR_BG_IMAGE})` }}
            />
            {/* Gradient from team color */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, ${bgColor} 0%, ${bgColor} 15%, transparent 60%)`,
              }}
            />
            {/* Car image centered in the bg area */}
            <img
              src={team.car_image_url}
              alt=""
              className="relative z-10 max-h-full max-w-full object-contain object-left"
              role="presentation"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SectionBlock({ section }: { section: F1TeamSection }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold uppercase tracking-wide md:text-2xl">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{section.subtitle}</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {section.teams.map((team, index) => (
          <TeamCard key={team.id} team={team} index={index} />
        ))}
      </div>
    </section>
  );
}

export function TeamsPage() {
  const { data: sections = [], isLoading, error } = useF1TeamSectionsQuery();

  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-8">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Teams
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.9] tracking-wide md:text-3xl md:tracking-wider">
          Team Hub
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          F1 teams and drivers from the backend. Upload logos, cars and driver avatars in the
          dashboard; the default driver image is used when no avatar is set.
        </p>
      </FadeIn>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Empty className="w-full max-w-md border border-dashed border-border/80 bg-card/40 px-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Spinner className="size-8 text-primary" />
              </EmptyMedia>
              <EmptyTitle>Loading teams</EmptyTitle>
              <EmptyDescription>
                Please wait while we load F1 teams and drivers.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}
      {error && (
        <p className="text-center text-destructive">Failed to load teams.</p>
      )}
      {!isLoading && !error && sections.length === 0 && (
        <p className="text-center text-muted-foreground">No team sections yet.</p>
      )}
      {!isLoading && sections.length > 0 && (
        <div className="space-y-12">
          {sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>
      )}

      <FadeIn delay={0.05}>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
          <CardContent className="p-4 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.1em] text-primary">
                  <Mail className="size-3.5" /> Stay updated
                </span>
                <h2 className="mt-3 font-display font-bold text-lg uppercase leading-tight tracking-tight md:text-xl">
                  Questions or group bookings?
                </h2>
                <p className="mt-3 max-w-[50ch] text-sm text-muted-foreground">
                  Contact our team for help with ticket packages, corporate bookings, or any enquiry. We reply within 24 hours on business days.
                </p>
              </div>
              <Button className="rounded-full" size="lg" asChild>
                <Link href="/support">
                  Contact us
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
