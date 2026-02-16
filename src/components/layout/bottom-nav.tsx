"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Flag, Home, Ticket, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/races", label: "Races", icon: Flag },
  { href: "/events", label: "Events", icon: Ticket },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/teams", label: "Teams", icon: Users },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/95 backdrop-blur-md md:hidden"
      style={{
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
      }}
      aria-label="Bottom navigation"
    >
      <div className="flex h-14 min-h-[56px] items-center justify-around">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors",
                "active:scale-95",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={cn("size-6 shrink-0", active && "stroke-[2.5]")}
                aria-hidden
              />
              <span
                className={cn(
                  "truncate text-[10px] font-medium tabular-nums leading-tight",
                  active && "font-semibold",
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
