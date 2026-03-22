"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { publicAssetUrl } from "@/lib/public-asset-url";
import { cn } from "@/lib/utils";

type RaceImageCarouselProps = {
  images: string[];
  title: string;
  className?: string;
};

export function RaceImageCarousel({ images, title, className }: RaceImageCarouselProps) {
  const preparedImages = useMemo(() => {
    const clean = images.filter(Boolean).map((p) => publicAssetUrl(p));
    return clean.length
      ? clean
      : [publicAssetUrl("/backgrounds/pass.jpg")];
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const active = preparedImages[currentIndex] ?? preparedImages[0];
  const isActiveLoaded = loadedSrc === active;

  function goToPrev() {
    setLoadedSrc(null);
    setCurrentIndex((prev) => (prev - 1 + preparedImages.length) % preparedImages.length);
  }

  function goToNext() {
    setLoadedSrc(null);
    setCurrentIndex((prev) => (prev + 1) % preparedImages.length);
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Skeleton
        className={cn(
          "absolute inset-0 z-0 rounded-none transition-opacity duration-300",
          isActiveLoaded ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        aria-hidden
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0.85 }}
          animate={{ opacity: isActiveLoaded ? 1 : 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 z-[1]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- local static assets; onLoad drives skeleton */}
          <img
            src={active}
            alt=""
            decoding="async"
            loading={currentIndex === 0 ? "eager" : "lazy"}
            fetchPriority={currentIndex === 0 ? "high" : "low"}
            className="absolute inset-0 size-full object-cover"
            onLoad={() => setLoadedSrc(active)}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(12,12,18,0.28)] via-transparent to-[rgba(12,12,18,0.55)]" />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {preparedImages.length > 1 ? (
        <>
          <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="size-8 rounded-full border border-white/35 bg-black/35 text-white hover:bg-black/55"
              onClick={goToPrev}
            >
              <ChevronLeft className="size-4" />
            </Button>
          </div>
          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="size-8 rounded-full border border-white/35 bg-black/35 text-white hover:bg-black/55"
              onClick={goToNext}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
            <p className="rounded-full border border-white/35 bg-black/35 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/90">
              {currentIndex + 1}/{preparedImages.length}
            </p>
            <div className="flex gap-1.5">
              {preparedImages.map((_, index) => (
                <button
                  key={`${title}-${index}`}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  onClick={() => {
                    setLoadedSrc(null);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "h-1.5 w-6 rounded-full transition",
                    index === currentIndex ? "bg-primary" : "bg-white/45 hover:bg-white/70",
                  )}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
