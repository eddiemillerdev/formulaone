import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TopBar } from "@/components/layout/top-bar";
import { AppProviders } from "@/components/providers/app-providers";
import { ScrollToTop } from "@/components/scroll-to-top";

import "./globals.css";

export const metadata: Metadata = {
  title: "F1 Pass | Premium Formula 1 Tickets",
  description:
    "Authorized Formula 1 reseller platform for official race tickets, VIP hospitality, and paddock experiences.",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AppProviders>
          <ScrollToTop />
          <div className="relative min-h-screen bg-background text-foreground">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_-5%,rgba(255,30,0,0.2),transparent_35%),radial-gradient(circle_at_88%_8%,rgba(255,59,34,0.1),transparent_40%)]" />
            <TopBar />
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
