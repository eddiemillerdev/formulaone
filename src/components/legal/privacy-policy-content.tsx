"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function PrivacyPolicyContent() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Legal
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Privacy Policy
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          How we collect, use and protect your personal data. Last updated: August 2025.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-8 p-6 md:p-8 prose prose-sm dark:prose-invert max-w-none">
            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">1. About this policy</h2>
              <p className="text-muted-foreground">
                This Privacy Policy explains how F1 Pass (“we”, “our”, “us”) processes personal data in connection with our website and services, including ticket and hospitality bookings. We are based in the United Kingdom and comply with UK and applicable data protection law, including the UK GDPR.
              </p>
              <p className="text-muted-foreground mt-2">By using our website and services, you acknowledge that you have read and agree to this policy.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">2. Data we collect</h2>
              <p className="text-muted-foreground">We may collect:</p>
              <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                <li>Contact information (name, email, address, phone)</li>
                <li>Payment and billing details</li>
                <li>Booking and order history</li>
                <li>Device and browser data, IP address, and usage information (e.g. via cookies)</li>
                <li>Communications you send to us (e.g. support enquiries)</li>
              </ul>
              <p className="text-muted-foreground mt-2">We collect this when you use our site, make a booking, or contact us. We may also receive data from partners who help us provide our services.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">3. How we use your data</h2>
              <p className="text-muted-foreground">We use your data to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                <li>Process and fulfil your orders and bookings</li>
                <li>Communicate with you (confirmations, support, updates)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations and protect against fraud</li>
                <li>Send marketing where you have agreed (you can opt out at any time)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">4. Sharing your data</h2>
              <p className="text-muted-foreground">
                We may share your data with event organisers and partners to fulfil your booking, with payment and technology providers who help us run the service, and where required by law. We do not sell your personal data.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">5. Your rights</h2>
              <p className="text-muted-foreground">Under UK data protection law you have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request erasure of your data in certain circumstances</li>
                <li>Object to or restrict certain processing</li>
                <li>Data portability (receive your data in a structured format)</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                To exercise these rights or for any privacy enquiry, contact us using the details on our Contact or Support page. You also have the right to complain to the Information Commissioner’s Office (ICO) in the UK: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">6. Security and retention</h2>
              <p className="text-muted-foreground">
                We use appropriate technical and organisational measures to protect your data. We retain personal data for as long as needed to provide our services, comply with law, and resolve disputes. When no longer needed, we securely delete or anonymise it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">7. Changes</h2>
              <p className="text-muted-foreground">
                We may update this policy from time to time. The “Last updated” date at the top will change. Continued use of the site after changes means you accept the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">8. Contact</h2>
              <p className="text-muted-foreground">
                For questions about this Privacy Policy or our use of your data, please contact us via the Support or Contact page on this website.
              </p>
            </section>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
