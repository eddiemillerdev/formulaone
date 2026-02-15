"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RaceImageCarouselProps = {
  images: string[];
  title: string;
  className?: string;
};

function normalizeAssetUrl(path: string) {
  return encodeURI(path);
}

export function RaceImageCarousel({ images, title, className }: RaceImageCarouselProps) {
  const preparedImages = useMemo(() => {
    const clean = images.filter(Boolean).map(normalizeAssetUrl);
    return clean.length
      ? clean
      : ["/backgrounds/pass.jpg"];
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const active = preparedImages[currentIndex] ?? preparedImages[0];

  function goToPrev() {
    setCurrentIndex((prev) => (prev - 1 + preparedImages.length) % preparedImages.length);
  }

  function goToNext() {
    setCurrentIndex((prev) => (prev + 1) % preparedImages.length);
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(130deg, rgba(12,12,18,0.28), rgba(12,12,18,0.7)), url('${active}')`,
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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
                  onClick={() => setCurrentIndex(index)}
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
