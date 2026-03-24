"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { publicAssetUrl } from "@/lib/public-asset-url";
import { cn } from "@/lib/utils";

/** Desktop nav: main sections only (Races uses a year dropdown). */
const headerLinks = [
  { href: "/events", label: "Events" },
  { href: "/calendar", label: "Calendar" },
  { href: "/teams", label: "Teams" },
];

/** Mobile nav: full list so all pages are reachable. */
const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/races", label: "Races · 2026" },
  { href: "/races/2027", label: "Races · 2027" },
  { href: "/events", label: "Events" },
  { href: "/calendar", label: "Calendar" },
  { href: "/teams", label: "Teams" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/races") return pathname === "/races";
    if (href === "/races/2027") return pathname === "/races/2027";
    if (href.startsWith("/events")) return pathname.startsWith("/events") || pathname.startsWith("/checkout");
    if (href.startsWith("/calendar")) return pathname.startsWith("/calendar");
    if (href.startsWith("/teams")) return pathname.startsWith("/teams");
    if (href.startsWith("/about")) return pathname.startsWith("/about");
    if (href.startsWith("/faq")) return pathname.startsWith("/faq");
    if (href.startsWith("/support")) return pathname.startsWith("/support");
    return pathname === href;
  };

  const racesSectionActive = pathname === "/races" || pathname.startsWith("/races/");

  return (
    <header className="relative sticky top-0 z-50 bg-[#15151e]/95 pt-[env(safe-area-inset-top,0px)] shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] backdrop-blur-xl">
      {/* Pattern behind links: repeat to fill */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-repeat"
        style={{ backgroundImage: `url(${JSON.stringify(publicAssetUrl("/images/pattern.svg"))})` }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-[74px] w-[min(1220px,94vw)] items-stretch gap-4">
        <SiteLogo />

        <nav className="ml-auto hidden h-full shrink-0 items-stretch gap-0.5 md:flex" aria-label="Primary">
          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              className={cn(
                "relative flex h-full items-center gap-0.5 font-display font-normal normal-case tracking-[0.02em] px-2.5 py-2 text-sm text-white transition-colors",
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:transition-[opacity,background-color] after:duration-150",
                "after:opacity-0 hover:after:opacity-100 hover:after:bg-white",
                "outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#15151e]",
                racesSectionActive && "after:opacity-100 after:bg-[#ff1e00]",
                racesSectionActive && "hover:after:bg-white",
              )}
            >
              Races
              <ChevronDown className="size-4 shrink-0 opacity-85" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[60] min-w-[12rem]">
              <DropdownMenuItem asChild>
                <Link href="/races" className="cursor-pointer font-display">
                  2026 season
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/races/2027" className="cursor-pointer font-display">
                  2027 season
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {headerLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex h-full items-center font-display font-normal normal-case tracking-[0.02em] px-2.5 py-2 text-sm text-white transition-colors",
                  "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:transition-[opacity,background-color] after:duration-150",
                  "after:opacity-0 hover:after:opacity-100 hover:after:bg-white",
                  active && "after:opacity-100 after:bg-[#ff1e00]",
                  active && "hover:after:bg-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="rounded-none size-11 border border-white/20 bg-white/5 text-white shadow-none hover:bg-white/12 hover:text-white"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="rounded-none border-[#2a2a38] bg-[#20202d] text-white [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100"
            >
              <SheetHeader>
                <SheetTitle className="font-display uppercase tracking-wide text-white">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 grid gap-2" aria-label="Mobile Primary">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-display font-normal normal-case tracking-wide rounded-none px-3 py-2 text-sm text-white transition-colors hover:bg-[#252534] hover:text-white",
                      isActive(link.href) && "bg-[#252534] text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
