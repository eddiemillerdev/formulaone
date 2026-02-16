"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Desktop nav: main sections only (logo = home; FAQ/Support in top bar). */
const headerLinks = [
  { href: "/races", label: "Races" },
  { href: "/events", label: "Events" },
  { href: "/calendar", label: "Calendar" },
  { href: "/teams", label: "Teams" },
];

/** Mobile nav: full list so all pages are reachable. */
const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/races", label: "Races" },
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
    if (href.startsWith("/events")) return pathname.startsWith("/events") || pathname.startsWith("/checkout");
    if (href.startsWith("/calendar")) return pathname.startsWith("/calendar");
    if (href.startsWith("/teams")) return pathname.startsWith("/teams");
    if (href.startsWith("/about")) return pathname.startsWith("/about");
    if (href.startsWith("/faq")) return pathname.startsWith("/faq");
    if (href.startsWith("/support")) return pathname.startsWith("/support");
    return pathname === href;
  };

  return (
    <header className="relative sticky top-0 z-50 bg-[#15151e]/95 pt-[env(safe-area-inset-top,0px)] shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] backdrop-blur-xl">
      {/* Pattern behind links: repeat to fill */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-repeat"
        style={{ backgroundImage: "url(/images/pattern.svg)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-[74px] w-[min(1220px,94vw)] items-stretch gap-4">
        <SiteLogo />

        <nav className="ml-auto hidden h-full shrink-0 items-stretch gap-0.5 md:flex" aria-label="Primary">
          {headerLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex h-full items-center font-display font-normal uppercase tracking-[0.06em] px-2.5 py-2 text-sm text-white transition-colors",
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
              <Button variant="outline" size="icon" className="rounded-none size-11">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-none border-[#2a2a38] bg-[#20202d]">
              <SheetHeader>
                <SheetTitle className="font-display uppercase tracking-wide">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 grid gap-2" aria-label="Mobile Primary">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-display font-normal uppercase tracking-wide rounded-none px-3 py-2 text-sm text-white transition-colors hover:bg-[#252534] hover:opacity-90",
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
