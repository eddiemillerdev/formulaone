"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/races", label: "Races" },
  { href: "/events", label: "Events" },
  { href: "/calendar", label: "Calendar" },
  { href: "/teams", label: "Teams" },
  { href: "/support", label: "Support" },
];

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/races") return pathname === "/races";
    if (href.startsWith("/events")) return pathname.startsWith("/events");
    if (href.startsWith("/calendar")) return pathname.startsWith("/calendar");
    if (href.startsWith("/teams")) return pathname.startsWith("/teams");
    if (href.startsWith("/support")) return pathname.startsWith("/support");
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] w-[min(1220px,94vw)] items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/images/logo-light.png"
            alt="F1 Pass"
            width={138}
            height={30}
            className="h-auto w-[122px] object-contain md:w-[138px]"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                isActive(link.href) && "bg-card text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border/70 bg-card">
            <SheetHeader>
              <SheetTitle className="font-display uppercase tracking-wide">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 grid gap-2" aria-label="Mobile Primary">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground",
                    isActive(link.href) && "bg-background text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
