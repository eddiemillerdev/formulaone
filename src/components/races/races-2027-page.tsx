"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { publicLocalPath } from "@/lib/public-asset-url";
import { RACE_MAPPINGS } from "@/lib/races-mapping";

const YEAR = 2027;

function raceTitleLine(raceName: string) {
  return `FORMULA 1 ${raceName.toUpperCase()} ${YEAR}`;
}

export function Races2027Page() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          {YEAR} Races
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.9] tracking-wide md:text-3xl md:tracking-wider">
          Race Destinations {YEAR}
        </h1>
        <p className="max-w-[75ch] text-sm text-muted-foreground md:text-base">
          Plan ahead for the {YEAR} season. Dates will be confirmed later; place a deposit to register your interest for each Grand Prix.
        </p>
      </FadeIn>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {RACE_MAPPINGS.map((race, index) => {
          const flagSrc = race.flagSvgPath;
          const cCountryCode = race.flagCountryCode;
          return (
            <motion.article
              key={race.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
              className={cn(
                "relative overflow-visible rounded-2xl border border-border/80",
                "bg-card text-card-foreground shadow-[0_10px_36px_-14px_rgba(0,0,0,0.2)]",
                "dark:border-border/60 dark:shadow-[0_10px_36px_-14px_rgba(0,0,0,0.45)]",
              )}
            >
              <div
                className="absolute left-5 top-0 z-10 flex size-12 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full md:-left-0 md:size-14"
                aria-hidden
              >
                {flagSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- SVG from public/2027/race-flags (same-origin, not S3)
                  <img
                    src={publicLocalPath(flagSrc)}
                    alt={cCountryCode}
                    className="size-[50%] object-contain"
                  />
                ) : null}
              </div>

              <Badge
                className={cn(
                  "absolute right-5 top-0 z-10 -translate-y-1/2 rounded-full border-0 px-2.5 py-1",
                  "bg-[#0f1419] text-[10px] font-bold uppercase tracking-[0.14em] text-white",
                  "dark:bg-zinc-950",
                )}
              >
                Dates TBC
              </Badge>

              <div className="px-5 pb-5 pt-8 md:px-6 md:pb-6 md:pt-9">
                <h2 className="font-display text-lg font-black uppercase leading-[1.05] tracking-[0.02em] text-foreground md:text-xl">
                  {raceTitleLine(race.name)}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{race.location}</p>
                <Link
                  href={`/races/${YEAR}/deposit/${race.id}`}
                  className={cn(
                    "race-deposit-link mt-5 inline-flex items-center gap-0.5 font-display text-sm font-bold tracking-wide",
                    "text-black hover:text-[#e60012] active:text-[#e60012]",
                    "dark:text-white dark:hover:text-[#e60012] dark:active:text-[#e60012]",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60012]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                  )}
                >
                  Deposit
                  <ChevronRight className="size-4 shrink-0" aria-hidden />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </section>
    </main>
  );
}
