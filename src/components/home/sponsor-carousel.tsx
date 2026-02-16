"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { SPONSOR_IMAGES } from "@/config/sponsors";

export function SponsorCarousel() {
  if (SPONSOR_IMAGES.length === 0) return null;

  return (
    <FadeIn delay={0.05}>
      <section className="mx-auto w-[min(1280px,95vw)] py-8">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Our partners
        </p>
        <div
          className="grid gap-4 md:gap-6 justify-items-center items-center"
          style={{
            gridTemplateColumns: `repeat(${Math.max(1, Math.ceil(SPONSOR_IMAGES.length / 2))}, minmax(0, 1fr))`,
          }}
        >
          {SPONSOR_IMAGES.map((sponsor, index) => {
            const content = (
              <img
                src={sponsor.src}
                alt={sponsor.alt ?? "Sponsor"}
                className="h-8 w-full max-w-[72px] object-contain object-center opacity-90 transition hover:opacity-100 md:h-9 md:max-w-[80px]"
              />
            );
            const wrapperClass =
              "flex items-center justify-center rounded-lg border border-border/50 bg-card/60 px-3 py-2 transition hover:border-primary/30 hover:bg-card/80 w-[72px] md:w-[88px] min-h-[48px]";
            if (sponsor.link) {
              return (
                <a
                  key={sponsor.src + index}
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={wrapperClass}
                >
                  {content}
                </a>
              );
            }
            return (
              <div key={sponsor.src + index} className={wrapperClass}>
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </FadeIn>
  );
}
