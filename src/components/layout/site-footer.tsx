import Image from "next/image";
import Link from "next/link";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Races", href: "/races" },
      { label: "Events", href: "/events" },
      { label: "Season Calendar", href: "/calendar" },
      { label: "Teams", href: "/teams" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/support" },
      { label: "Help Center", href: "/support" },
      { label: "Booking FAQ", href: "/support" },
      { label: "Payment options", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Partnerships", href: "#" },
      { label: "Corporate Sales", href: "#" },
      { label: "Affiliate Program", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-[radial-gradient(circle_at_15%_-20%,rgba(255,30,0,0.16),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(255,59,34,0.08),transparent_38%)]">
      <div className="mx-auto w-[min(1220px,94vw)] py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Image
              src="/images/logo-light.png"
              alt="F1 Pass"
              width={162}
              height={36}
              className="h-auto w-[148px] object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
            <p className="max-w-[38ch] text-sm text-muted-foreground">
              Premium Formula 1 ticketing and hospitality discovery platform built for fast booking decisions,
              real-time inventory, and high-demand race weekends.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/80 bg-card/70 px-3 py-1">Live ticket inventory</span>
              <span className="rounded-full border border-border/80 bg-card/70 px-3 py-1">VIP concierge support</span>
              <span className="rounded-full border border-border/80 bg-card/70 px-3 py-1">Secure ordering flow</span>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="font-display text-base uppercase tracking-[0.06em] text-foreground">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} F1 Pass. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground">Instagram</Link>
            <Link href="#" className="hover:text-foreground">YouTube</Link>
            <Link href="#" className="hover:text-foreground">X</Link>
            <Link href="#" className="hover:text-foreground">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
