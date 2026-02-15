"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/api/events";
import type { EventItem } from "@/lib/api/events";
import { cn } from "@/lib/utils";

const asAssetUrl = (path: string) => encodeURI(path);

const FALLBACK_IMAGE =
  "linear-gradient(130deg, #2b2a3f 0%, #4b2d2d 55%, #7e421f 100%)";

type HeroEventsCarouselProps = {
  events: EventItem[];
  variant?: "compact" | "hero";
  className?: string;
};

export function HeroEventsCarousel({ events, variant = "compact", className }: HeroEventsCarouselProps) {
  const list = useMemo(() => events.slice(0, 6), [events]);
  const [index, setIndex] = useState(0);
  const current = list[index] ?? list[0];

  if (!list.length) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-border/70 bg-card/60 p-8 text-center text-muted-foreground",
          variant === "hero" && "flex min-h-[480px] items-center justify-center",
          className,
        )}
      >
        Loading events…
      </div>
    );
  }

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + list.length) % list.length);
  };
  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % list.length);
  };

  if (variant === "hero") {
    const bgImage = current?.imageUrl
      ? `linear-gradient(135deg, rgba(14,14,20,0.35), rgba(14,14,20,0.7)), url('${asAssetUrl(current.imageUrl)}')`
      : FALLBACK_IMAGE;
    return (
      <div className={cn("relative h-full min-h-[480px] overflow-hidden rounded-3xl border border-border/70", className)}>
        <Link href={current ? `/events/${current.id}` : "/events"} className="block h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id ?? index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: bgImage }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="rounded-full border border-primary/45 bg-primary/15 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-primary">
              Upcoming events
            </span>
            <p className="mt-3 font-display text-lg uppercase leading-[0.95] tracking-tight text-white md:text-xl">
              {current?.name ?? "Event"}
            </p>
            <p className="mt-2 text-sm text-zinc-200">
              {current?.dateLabel ?? ""} • {current?.venue ?? ""}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-display text-lg text-white">
                {current ? formatMoney(current.fromPrice) : "—"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.08em] text-white">
                View packages <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        </Link>
        {list.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 text-white hover:bg-black/55"
              onClick={goPrev}
              aria-label="Previous event"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 text-white hover:bg-black/55"
              onClick={goNext}
              aria-label="Next event"
            >
              <ChevronRight className="size-5" />
            </Button>
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to event ${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={cn(
                    "h-2 w-6 rounded-full transition-colors",
                    i === index ? "bg-primary" : "bg-white/50 hover:bg-white/70",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
        Upcoming events
      </p>
      <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card/70">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id ?? index}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="p-3"
          >
            <Link
              href={current ? `/events/${current.id}` : "/events"}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/40 p-3 transition hover:border-primary/40 hover:bg-background/60"
            >
              <div
                className="size-14 shrink-0 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: current?.imageUrl
                    ? `url('${asAssetUrl(current.imageUrl)}')`
                    : FALLBACK_IMAGE,
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm uppercase leading-tight text-foreground">
                  {current?.name ?? "Event"}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {current?.dateLabel ?? ""} • {current?.venue ?? ""}
                </p>
                <p className="mt-1 font-display text-base text-primary">
                  {current ? formatMoney(current.fromPrice) : "—"}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </motion.div>
        </AnimatePresence>
        {list.length > 1 && (
          <>
            <div className="absolute left-1 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 rounded-full"
                onClick={goPrev}
                aria-label="Previous event"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 rounded-full"
                onClick={goNext}
                aria-label="Next event"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div className="flex justify-center gap-1 pb-2 pt-1">
              {list.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to event ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 w-5 rounded-full transition-colors",
                    i === index ? "bg-primary" : "bg-muted-foreground/40 hover:bg-muted-foreground/60",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
