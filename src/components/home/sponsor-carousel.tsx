"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { SPONSOR_IMAGES } from "@/config/sponsors";

export function SponsorCarousel() {
  if (SPONSOR_IMAGES.length === 0) return null;

  return (
    <section className="mx-auto page-width space-y-6">
      <FadeIn delay={0.05} className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Partners
        </Badge>
        <h2 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Our Partners
        </h2>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Official partners and sponsors of Formula 1®. The brands that power the pinnacle of motorsport and bring the race weekend to life.
        </p>
      </FadeIn>
      <FadeIn delay={0.06}>
        {/* Horizontal scroll carousel: responsive, not crammed */}
        <div className="relative -mx-[min(2.5vw,24px)] md:-mx-[min(2.5vw,24px)]">
          <div
            className="flex gap-4 overflow-x-auto overflow-y-hidden py-2 scroll-smooth md:gap-6"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {SPONSOR_IMAGES.map((sponsor, index) => {
              const cellClass =
                "flex shrink-0 snap-center items-center justify-center rounded-lg border border-border/50 bg-card/60 px-4 py-3 transition hover:border-primary/30 hover:bg-card/80 min-h-[64px] w-[100px] md:min-h-[72px] md:w-[120px]";
              const imgClass =
                "h-8 w-full max-h-10 object-contain object-center opacity-90 transition hover:opacity-100 invert dark:invert-0 md:h-10 md:max-h-12";
              const content = (
                <img
                  src={sponsor.src}
                  alt={sponsor.alt ?? "Sponsor"}
                  className={imgClass}
                />
              );
              if (sponsor.link) {
                return (
                  <a
                    key={sponsor.src + index}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cellClass}
                  >
                    {content}
                  </a>
                );
              }
              return (
                <div key={sponsor.src + index} className={cellClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
