"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function GuidelinesContent() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Legal
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Guidelines
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Guidelines for the use of trade marks and intellectual property rights belonging to the Formula 1 companies.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-8 p-6 md:p-8 prose prose-sm dark:prose-invert max-w-none">
            <section>
              <h2 className="font-display text-base font-bold uppercase tracking-tight text-muted-foreground">Contents</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>Introduction</li>
                <li>Section 1 – Our Marks</li>
                <li>Section 2 – Other Intellectual Property Rights</li>
                <li>Section 3 – Using our Permitted Word Marks editorially</li>
                <li>Section 4 – Other uses of FORMULA 1 Rights</li>
                <li>Section 5 – Need more help?</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">Introduction</h2>
              <p className="text-muted-foreground">
                FORMULA 1 is the brand used to identify the most prestigious motor racing competition in the world. The Formula 1 companies own extensive rights in and to the FORMULA 1 brand, including trade marks (used and/or registered in the UK, EU and internationally) and other intellectual property rights.
              </p>
              <p className="text-muted-foreground mt-2">
                As a rule, trade marks cannot be used by third parties without a specific written licence. However, certain trade marks can be used editorially and by fans without requiring a licence where these Guidelines are adhered to. &quot;Fans&quot; means individuals, groups or collectives (e.g. fan clubs) who follow FORMULA 1 and support the races without doing so in a materially commercial manner—including not using FORMULA 1 Rights for clickbait, to build traffic to sell goods/services, or for excessively repetitive or intrusive advertising.
              </p>
              <p className="text-muted-foreground mt-2">
                These guidelines may be updated from time to time. We reserve the right to take action against unauthorised uses which we consider to infringe our rights.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">Section 1 – Our Marks</h2>
              <p className="text-muted-foreground">
                The core trade marks and corporate identities of the Formula 1 companies include the Logos and the Permitted Word Marks (Word Marks and Event Titles). This is not a full list.
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">The Logos</p>
              <p className="text-muted-foreground">
                You may not use any of our Logos for any purpose or in any medium unless you have an express written licence from the Formula 1 companies.
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">Permitted Word Marks</p>
              <p className="text-muted-foreground">Word Marks include: F1™, Formula 1™, Formula One™, FIA Formula One World Championship™, Grand Prix™, Paddock Club™, Formula One Paddock Club™, F1 Paddock Club™.</p>
              <p className="text-muted-foreground mt-2">
                Event Titles (e.g. FORMULA 1 PIRELLI BRITISH GRAND PRIX 2026) are listed on the official Formula 1 site. As covered in Section 3, Permitted Word Marks may be used to inform, not to brand.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">Section 2 – Other Intellectual Property Rights</h2>
              <p className="text-muted-foreground">
                In addition to Our Marks, the Formula 1 companies own or have exclusive rights in: Results and Timing data; Official Typeface; Statistics; Still Images; Audio and Audio Visual Content; Official Artworks, Graphics, Assets and Textures; Written Content. These &quot;Other Intellectual Property Rights&quot; should not be used contrary to these Guidelines. Fair dealing (e.g. in the UK) is a limited defence; if you intend to rely on it, seek independent advice. Limited use for private, non-commercial educational purposes may be acceptable; public postings (e.g. YouTube, websites, social media) are not included.
              </p>
              <p className="text-muted-foreground mt-2">
                For licensing enquiries: <a href="mailto:brandprotection@f1.com" className="text-primary hover:underline">brandprotection@f1.com</a>. Commercial licence enquiries should include a full proposal including financial details. For team/driver or circuit IP, contact the respective rights holders directly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">Section 3 – Using our Permitted Word Marks editorially</h2>
              <p className="text-muted-foreground">
                Permitted Word Marks can be used editorially to report on and provide information about FORMULA 1 events, including on publication covers or website pages, so long as the use is to inform or report and not to brand, and does not create an unauthorised association with third parties.
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">Appearance</p>
              <p className="text-muted-foreground">
                Event Titles should always be in BLOCK CAPITALS (™ not required). Word Marks in sentence-case contexts should be in Title Case with ™ or in BLOCK CAPITALS. In body copy, Title Case or BLOCK CAPITALS may be used without ™. Permitted Word Marks should not be stylised or in a different font from surrounding text.
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">Grammar</p>
              <p className="text-muted-foreground">
                Word Marks should be used as attributive modifiers (e.g. &quot;FORMULA 1 driver&quot;, &quot;F1 racing&quot;), not as nouns or in possessive form (e.g. not &quot;FORMULA 1&apos;s cars&quot;).
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">Section 4 – Other uses of FORMULA 1 Rights</h2>
              <p className="text-muted-foreground">
                Fundamental principles when using FORMULA 1 Rights: be clear that your use is not official or endorsed by us; be respectful; do not be unlawful, deceptive, obscene, harmful or disparaging; do not use our Logos; do not integrate Our Marks into other marks—differentiate sufficiently.
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">Internet</p>
              <p className="text-muted-foreground">
                Permitted Word Marks may be used editorially on websites to inform, not to brand. Unofficial fan sites dedicated to the FIA FORMULA ONE WORLD CHAMPIONSHIP should include this disclaimer in the footer of the landing/home page: <strong>This website is unofficial and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.</strong>
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">Linking &amp; domain names</p>
              <p className="text-muted-foreground">
                Linking to <a href="https://www.formula1.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.formula1.com</a> is permitted provided it does not create an unauthorised association; use the site name, not our Logos. Permitted Word Marks cannot be used in domain names for commercialised sites; use in non-commercial fan/news sites may be tolerated at our discretion. Sub-resource use (e.g. example.com/formula1) may be acceptable; prefix sub-domains (e.g. formula1.example.com) are not.
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">Social media, content &amp; commercial use</p>
              <p className="text-muted-foreground">
                Permitted Word Marks may be used editorially for non-commercial purposes on social media and in apps to inform or report, not to brand. Retweeting/sharing official content according to platform rules is permitted; copying and reproducing our content outside those platforms is not, except where properly embedded and linked. You may not use FORMULA 1 Rights for merchandise, endorsement, advertisements, AI training, or commercial use without an express licence. Our Marks cannot be used as company names, product names, trade marks or social handles.
              </p>
              <p className="text-muted-foreground mt-2">
                For ticket terms (including recording and giveaways), see <a href="https://tickets.formula1.com/en/t-61-terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tickets.formula1.com terms and conditions</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-0">Section 5 – Need more help?</h2>
              <p className="text-muted-foreground">
                For more help and information, please contact <a href="mailto:brandprotection@f1.com" className="text-primary hover:underline">brandprotection@f1.com</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
