"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function CookiesPolicyContent() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Legal
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Cookies Policy
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          How we use cookies and similar technologies on this website. Last updated: October 2025.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-8 p-6 md:p-8 prose prose-sm dark:prose-invert max-w-none">
            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">What are cookies?</h2>
              <p className="text-muted-foreground">
                A cookie is a small text file stored on your computer or mobile device by a website’s server. Each cookie is unique to your web browser and may contain anonymous information such as a unique identifier. It allows a website to remember things like your preferences or what’s in your basket.
              </p>
              <p className="text-muted-foreground mt-2">
                Most websites use cookies to improve your experience by enabling the site to ‘remember’ you. To learn more about cookies, visit{" "}
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">All About Cookies</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">How long do cookies last?</h2>
              <p className="text-muted-foreground">
                <strong>Session cookies</strong> are temporary and are only stored until you leave the website or close your browser.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Persistent cookies</strong> last for a fixed period and allow the website to recognise your device when you return.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">Who sets cookies?</h2>
              <p className="text-muted-foreground">
                <strong>First-party cookies</strong> are set by the website you are visiting and can only be read by that website.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Third-party cookies</strong> are set by another organisation (e.g. for analytics or advertising). They may be used for measurement, to run a third-party service, or to deliver or target advertising.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">How we use cookies</h2>
              <p className="text-muted-foreground">
                We use first- and third-party cookies to offer an improved, personalised experience. Uses include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                <li><strong>Strictly necessary:</strong> Essential to use the site and its features (e.g. purchasing tickets).</li>
                <li><strong>Performance:</strong> To understand how visitors use the site (e.g. which pages are visited). Information is aggregated and anonymous.</li>
                <li><strong>Functionality:</strong> To remember choices you make (e.g. preferences, text size).</li>
                <li><strong>Targeting or advertising:</strong> To show relevant adverts and measure campaign effectiveness. You can manage preferences via Your Online Choices or your browser settings.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">How to control cookies</h2>
              <p className="text-muted-foreground">
                You can delete existing cookies and block new ones in your browser settings. If you do, some features may not work and you may need to adjust preferences on each visit. Settings are usually found under ‘Options’ or ‘Preferences’ in your browser. For help, use your browser’s Help option or see: Cookie settings in{" "}
                <a href="https://support.microsoft.com/en-us/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edge</a>,{" "}
                <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox</a>,{" "}
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome</a>,{" "}
                <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">Changes</h2>
              <p className="text-muted-foreground">
                We may update this Cookies Policy from time to time. The “Last updated” date at the top will change when we do. By continuing to use the site after updates, you accept the revised policy.
              </p>
            </section>

            <p className="text-sm text-muted-foreground border-t border-border pt-6">
              We use cookies to personalise content, analyse traffic and to contact you about our events and services where relevant. By continuing to use this website you consent to our use of cookies.
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
