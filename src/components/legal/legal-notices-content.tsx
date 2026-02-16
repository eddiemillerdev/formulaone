"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function LegalNoticesContent() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Legal
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Legal Notices
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Last Updated: May 22, 2017
        </p>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          This website is operated by QuintEvents LLC (&quot;we&quot;, &quot;us&quot;, &quot;our&quot; and &quot;F1 Experiences&quot;). Access to and use of this site is subject to the following terms and conditions.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-8 p-6 md:p-8 prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY, AS THEY CONTAIN TERMS THAT IMPACT YOUR RIGHTS, OBLIGATIONS AND REMEDIES IN CONNECTION WITH YOUR USE OF THE SITE. BY ACCESSING OR USING THIS SITE YOU AGREE TO COMPLY WITH AND BE BOUND BY THESE TERMS AND CONDITIONS. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, YOU MUST NOT ACCESS OR USE THIS SITE.
            </p>
            <p className="text-muted-foreground">
              WE RESERVE THE RIGHT, IN OUR SOLE DISCRETION, TO CHANGE THESE TERMS AND CONDITIONS AT ANY TIME AND WITHOUT PRIOR NOTICE. WHEN WE MAKE ANY CHANGES, WE WILL UPDATE THE &quot;LAST UPDATED&quot; DATE AT THE TOP OF THIS PAGE. YOU ARE RESPONSIBLE FOR REVIEWING REGULARLY INFORMATION POSTED ONLINE TO OBTAIN TIMELY NOTICE OF ANY SUCH CHANGES. BY USING THIS SITE AFTER ANY SUCH CHANGES YOU AGREE TO COMPLY WITH, AND BE BOUND BY, THE TERMS AND CONDITIONS AS CHANGED.
            </p>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Access & using the Site</h2>
              <p className="text-muted-foreground">
                You may not use the Site in any manner that could damage, disable, overburden, or impair the Site&apos;s features or functionality, nor may you use the Site in any manner that could interfere with any other party&apos;s use and enjoyment of the Site. User access to and use of this website is subject to all applicable federal, state and local laws and regulations. This Site is operated and controlled by F1 Experiences from the United States. Access to and use of password protected and/or secure areas is restricted to authorized users only. You must not attempt to interfere with the proper working of this Site. We reserve the absolute right to alter, suspend or discontinue any aspect of this Site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Copyright, Database Rights, Trademarks And Other Intellectual Property Protection</h2>
              <p className="text-muted-foreground">
                The information, content and other material provided on this Site is for your personal, non-commercial use only. Except as otherwise indicated, all materials on this Site are protected by copyrights, database rights, trademarks and/or other intellectual property rights owned by F1 Experiences or used with permission. The F1 logo, FORMULA 1, F1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX, PADDOCK CLUB and related marks are trademarks of Formula One Licensing BV. You agree not to modify, copy, reproduce, republish, upload, frame, post, transmit or distribute any information, content or other material from this Site without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Feedback</h2>
              <p className="text-muted-foreground">
                Any information, content and other material you transmit to this site by email or otherwise is non-confidential and non-proprietary. Anything you transmit or post may be used by F1 Experiences for any purpose, including reproduction, disclosure, transmission, publication, broadcast and posting.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Our Information and Yours</h2>
              <p className="text-muted-foreground">
                Every effort has been made to ensure that information is accurate, but F1 Experiences is not responsible for any errors or omissions. We will only use any personal data collected during your use of this Site in accordance with our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Disclaimer</h2>
              <p className="text-muted-foreground">
                THE LAWS OF CERTAIN JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LEGAL WARRANTIES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE BELOW EXCLUSIONS MAY NOT APPLY. THIS SITE AND THE INFORMATION, CONTENT, NAMES, IMAGES, PICTURES, DATA, LOGOS AND ICONS ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;IS AVAILABLE&quot; BASIS WITHOUT ANY REPRESENTATION OR ENDORSEMENT AND WITHOUT WARRANTY OF ANY KIND WHETHER EXPRESS OR IMPLIED.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                TO THE FULLEST EXTENT PERMITTED BY LAW, WE ACCEPT NO LIABILITY TO YOU OR ANY THIRD PARTY FOR ANY DAMAGES ARISING FROM USE OR LOSS OF USE OF DATA, OR LOSS OF PROFITS, ARISING OUT OF OR IN CONNECTION WITH THE VIEWING, USE OR PERFORMANCE OF THE SITE OR ITS INFORMATION OR CONTENT. IN THE EVENT THAT THE FOREGOING LIMITATION OF LIABILITY IS DETERMINED TO BE UNENFORCEABLE, F1 EXPERIENCE&apos;S TOTAL CUMULATIVE LIABILITY SHALL BE LIMITED TO ONE HUNDRED U.S. DOLLARS (US$100).
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Links</h2>
              <p className="text-muted-foreground">
                Linking to this Site is permitted so long as such use does not create any unauthorized association between F1 Experiences, Formula 1 or their brands, and any third party. F1 Experiences may provide links to other websites as a convenience but we make no representations whatsoever about any other sites that you may access through this Site. A link to any other website does not mean that we endorse or accept any responsibility for such website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Statement Of Commitment To Respect For Human Rights</h2>
              <p className="text-muted-foreground">
                F1 Experience and Formula 1 are committed to respecting internationally recognized human rights in its operations globally. We focus our efforts in areas within our direct influence by taking proportionate steps to understand and monitor the potential human rights impacts of our activities; identify and assess actual or potential adverse human rights impacts; consider practical responses; engage in meaningful consultation where appropriate; and respect the human rights of our employees. Where domestic laws conflict with internationally recognized human rights, we will seek ways to honor them to the fullest extent which does not place us in violation of domestic law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Miscellaneous</h2>
              <p className="text-muted-foreground">
                <strong>Governing Law:</strong> These Terms and Conditions and any dispute arising herefrom are governed by the laws of the state of North Carolina, USA. Disputes shall be exclusively subject to the jurisdiction of the courts of Charlotte, North Carolina USA.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Entire Agreement:</strong> These Terms and Conditions, including our Privacy Policy and any supplemental terms, constitute the entire agreement between you and F1 Experiences regarding your access to and use of this Site.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Assignment:</strong> You may not assign your rights or obligations under these Terms and Conditions without our express prior written consent. F1 Experiences may assign its rights and obligations in its sole discretion.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight mt-8 mb-2">Contact Details</h2>
              <p className="text-muted-foreground">
                If you have any questions or concerns, please contact us at <a href="mailto:Info@F1Experiences.com" className="text-primary hover:underline">Info@F1Experiences.com</a>.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Support</strong><br />
                QuintEvents, LLC<br />
                9335 Harris Corners Parkway, Suite 500<br />
                Charlotte, North Carolina 28269
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>California Residents:</strong> Complaints or requests for further information may be sent to the above address or to <a href="mailto:marketing@F1Experiences.com" className="text-primary hover:underline">marketing@F1Experiences.com</a>. The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in writing at 1625 North Market Boulevard, Suite N112, Sacramento, CA 95834 or by telephone at (916) 445-1245 or (800) 952-5210.
              </p>
              <p className="text-muted-foreground mt-4 text-xs">
                Copyright © 2023 QuintEvents LLC. All Rights Reserved.
              </p>
            </section>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
