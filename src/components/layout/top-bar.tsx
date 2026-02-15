"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

const topLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
] as const;

const F1_TV_HREF = "https://f1tv.formula1.com";

export function TopBar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-9 w-[min(1220px,94vw)] items-center justify-end gap-5 px-2">
        
        <nav className="flex items-center gap-5" aria-label="Utility">
          {topLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium uppercase tracking-wide transition-colors",
                  "text-neutral-600 hover:text-neutral-900",
                  active && "text-neutral-900",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ThemeSwitcher variant="light" />
        <Separator orientation="vertical" className="h-4 bg-neutral-300" decorative />
        <a
          href={F1_TV_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-600 transition-colors hover:text-neutral-900"
          aria-label="F1 TV"
        >
          <Image src="/images/f1Tv.svg" alt="" width={20} height={14} className="h-3.5 w-auto" />
          <span className="hidden sm:inline">F1 TV</span>
        </a>
        <Separator orientation="vertical" className="h-4 bg-neutral-300" decorative />
      </div>
    </div>
  );
}
