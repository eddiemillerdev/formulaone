"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function RefundPolicyContent() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Legal
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Refund Policy
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Refund and cancellation policy for ticket and hospitality bookings. Last updated: 2025.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-6 p-6 md:p-8 prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Once your order is confirmed, we generally cannot accept cancellations or offer refunds for change of mind or non-attendance. This is in line with standard practice for event tickets and hospitality.
            </p>
            <p className="text-muted-foreground">
              If an event is officially postponed, cancelled, or rescheduled by the promoter or circuit, we will contact affected customers with the options provided by the event organiser. Refunds or alternatives will be offered in accordance with the promoter’s policy at that time.
            </p>
            <p className="text-muted-foreground">
              For any refund or cancellation enquiry, please contact us via the <Link href="/support" className="text-primary hover:underline">Support</Link> page with your order details. We will respond in line with the terms that apply to your booking.
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
