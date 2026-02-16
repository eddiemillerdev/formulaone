"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function TermsContent() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Legal
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Terms of Use
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Terms and conditions for using this website and purchasing F1 ticket packages. Last updated: 2025.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-6 p-6 md:p-8 prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              By using F1 Pass and our website, you agree to these terms. We provide a platform for discovering and booking official F1® ticket and hospitality packages. All bookings are subject to the relevant event organiser’s terms and our booking conditions communicated at checkout.
            </p>
            <p className="text-muted-foreground">
              You must provide accurate information when placing an order. Tickets are subject to availability and we reserve the right to refuse or cancel orders in line with our policies. Prices and availability are as shown at the time of booking and may change.
            </p>
            <p className="text-muted-foreground">
              For full terms applicable to your purchase, please refer to the checkout page and your order confirmation. For questions, contact us via the <Link href="/support" className="text-primary hover:underline">Support</Link> page.
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
