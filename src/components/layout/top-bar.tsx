"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { publicAssetUrl } from "@/lib/public-asset-url";
import { cn } from "@/lib/utils";

const topLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
] as const;

const F1_TV_HREF = "https://f1tv.formula1.com";

export function TopBar() {
  const pathname = usePathname();

  const fiaUrl = "https://www.fia.com/";

  return (
    <div className="relative overflow-hidden border-b border-neutral-300/90 bg-neutral-100">
      {/* Visible vertical gradient: cooler gray at bottom (toward main nav), lighter at top — not flat white */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-400/80 via-neutral-200/50 to-neutral-50"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex h-9 w-[min(1220px,94vw)] items-center gap-5 px-2">
        <a
          href={fiaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center text-neutral-800 transition-colors hover:text-neutral-950"
          aria-label="FIA – Fédération Internationale de l'Automobile"
        >
          <Image src={publicAssetUrl("/images/fia-logo.svg")} alt="" width={28} height={20} className="h-5 w-auto" />
        </a>
        <nav className="ml-auto flex items-center gap-5" aria-label="Utility">
          {topLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-wide transition-colors",
                  "text-neutral-800 hover:text-neutral-950",
                  active && "text-neutral-950",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ThemeSwitcher variant="light" />
        <Separator orientation="vertical" className="h-4 bg-neutral-400/60" decorative />
        <a
          href={F1_TV_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-800 transition-colors hover:text-neutral-950"
          aria-label="F1 TV"
        >
          <Image src={publicAssetUrl("/images/f1Tv.svg")} alt="" width={20} height={14} className="h-3.5 w-auto" />
          <span className="hidden sm:inline">F1 TV</span>
        </a>
        <Separator orientation="vertical" className="h-4 bg-neutral-400/60" decorative />
      </div>
    </div>
  );
}
