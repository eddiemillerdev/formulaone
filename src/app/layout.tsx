import type { Metadata } from "next";

import { AppDownloadStripe } from "@/components/layout/app-download-stripe";
import { BottomNav } from "@/components/layout/bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TopBar } from "@/components/layout/top-bar";
import { AppProviders } from "@/components/providers/app-providers";
import { PwaRegister } from "@/components/pwa-register";
import { ScrollToTop } from "@/components/scroll-to-top";

import "./globals.css";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export const metadata: Metadata = {
  title: `${APP_NAME} | Premium Formula 1 Tickets`,
  description:
    "Authorised Formula 1 reseller platform for official race tickets, VIP hospitality, and paddock experiences.",
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1d20" },
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
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
        {/* PWA: iOS splash (optional: add device-specific sizes under /icons/splash-*.png) */}
        <link
          rel="apple-touch-startup-image"
          href="/icons/icon-512.png"
          media="(device-width: 428px) and (device-height: 926px)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/icon-512.png"
          media="(device-width: 390px) and (device-height: 844px)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/icon-512.png"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AppProviders>
          <PwaRegister />
          <ScrollToTop />
          <div className="relative min-h-screen bg-background text-foreground pb-[max(4rem,calc(4rem+env(safe-area-inset-bottom)))] md:pb-0">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_-5%,rgba(255,30,0,0.2),transparent_35%),radial-gradient(circle_at_88%_8%,rgba(255,59,34,0.1),transparent_40%)]" />
            <TopBar />
            <SiteHeader />
            {children}
            <SiteFooter />
            <AppDownloadStripe />
            <BottomNav />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
