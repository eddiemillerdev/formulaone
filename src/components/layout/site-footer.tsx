"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Races", href: "/races" },
      { label: "Events", href: "/events" },
      { label: "Season Calendar", href: "/calendar" },
      { label: "Teams", href: "/teams" },
      { label: "Hotel & Transfers", href: "/hotel-benefits" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact us", href: "/support" },
      { label: "Help Center", href: "/support" },
      { label: "Payment options", href: "/support" },
      { label: "Guidelines", href: "/guidelines" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Partnerships", href: "/support?subject=general" },
      { label: "Corporate Packages", href: "/corporate-packages" },
      { label: "Affiliate Programme", href: "/support?subject=general" },
      { label: "Authorised Sales Agents", href: "/authorized-sales" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cookie Policy", href: "/cookies-policy" },
      { label: "Legal Notices", href: "/legal-notices" },
      { label: "Code of Conduct", href: "/documents/code_of_conduct.pdf" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/f1/" },
  { label: "YouTube", href: "https://www.youtube.com/F1" },
  { label: "X", href: "https://twitter.com/f1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/formula1" },
];

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export function SiteFooter() {
  const [showMore, setShowMore] = useState(false);

  return (
    <footer className="mt-20 border-t border-[#2a2a38] bg-[#1e1d20] [background-image:radial-gradient(circle_at_15%_-20%,rgba(255,30,0,0.16),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(255,59,34,0.08),transparent_38%)]">
      <div className="mx-auto w-[min(1220px,94vw)] py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/logof1.svg"
                alt={APP_NAME}
                width={120}
                height={30}
                className="h-auto w-[120px] object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <p className="mx-auto max-w-[38ch] text-sm text-[#b8b8c5] lg:mx-0">
              Premium Formula 1 ticketing and hospitality discovery platform built for fast booking decisions,
              real-time inventory, and high-demand race weekends.
            </p>
            <div className="hidden flex-wrap gap-2 text-xs text-[#b8b8c5] lg:flex">
              <span className="rounded-full border border-[#2a2a38] bg-[#20202d] px-3 py-1">Live ticket inventory</span>
              <span className="rounded-full border border-[#2a2a38] bg-[#20202d] px-3 py-1">VIP concierge support</span>
              <span className="rounded-full border border-[#2a2a38] bg-[#20202d] px-3 py-1">Secure ordering flow</span>
            </div>

            {/* Mobile: Show more / Show less */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setShowMore((v) => !v)}
                className="inline-flex items-center gap-1.5 text-sm text-[#b8b8c5] transition-colors hover:text-white"
                aria-expanded={showMore}
              >
                {showMore ? (
                  <>
                    Show less <ChevronUp className="size-4" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {footerSections.map((section) => (
            <div
              key={section.title}
              className={cn(
                "space-y-3 text-center lg:text-left",
                showMore ? "block" : "hidden",
                "lg:block"
              )}
            >
              <p className="font-display text-base uppercase tracking-[0.06em] text-white">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.endsWith(".pdf") ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#b8b8c5] transition-colors hover:text-white">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-[#b8b8c5] transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright row: hidden on mobile unless expanded, always visible on lg */}
        <div
          className={cn(
            "mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#2a2a38] pt-5 text-center text-xs text-[#b8b8c5] lg:flex-row lg:text-left",
            showMore ? "flex" : "hidden",
            "lg:flex"
          )}
        >
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
