"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const defaultStyles =
  "text-white hover:text-white/90 flex items-center gap-1.5 transition-colors";
const lightStyles =
  "text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 transition-colors";

export function ThemeSwitcher({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isLight = variant === "light";

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide",
          isLight ? "text-neutral-500" : defaultStyles,
          className,
        )}
        aria-hidden
      >
        <Sun className="size-3.5" /> Light
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-1",
        isLight ? lightStyles : defaultStyles,
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
