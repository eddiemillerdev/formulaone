"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

const AUTHORISED_AGENTS: { country: string; company: string }[] = [
  { country: "Italy", company: "All Sport SRL" },
  { country: "Mexico", company: "Aristos International" },
  { country: "France", company: "BG Events Group" },
  { country: "Poland", company: "BSS Group" },
  { country: "India", company: "DreamSetGo" },
  { country: "Thailand", company: "Edge Global Limited" },
  { country: "Netherlands", company: "Emboost" },
  { country: "United Kingdom", company: "Exclusive GP (Grand Prix Events)" },
  { country: "Poland", company: "GP Destinations" },
  { country: "India", company: "Fanatic Sports Pvt Limited" },
  { country: "South Africa", company: "Fli Afrika Travel" },
  { country: "Austria", company: "Grand Prix Tickets" },
  { country: "France", company: "Groupe Couleur" },
  { country: "Israel", company: "Issta Sport Ltd" },
  { country: "Canada", company: "Montreal Grand Prix (8155640 Canada Inc)" },
  { country: "Australia", company: "MTA Travel" },
  { country: "Germany", company: "P1 Travel" },
  { country: "Brazil", company: "PGS Prime Global Services/PrimeXP" },
  { country: "United Kingdom", company: "Red Eye Events Ltd" },
  { country: "Monaco", company: "Senate Grand Prix" },
  { country: "Germany", company: "SportFive" },
  { country: "Australia", company: "Sportsnet Corporation Pty Ltd" },
  { country: "New Zealand", company: "STH New Zealand" },
  { country: "Canada", company: "The Traveller Inc" },
  { country: "New Zealand", company: "Williment Travel Group" },
  { country: "Netherlands", company: "XS2Event B.V." },
  { country: "United Arab Emirates", company: "ZK Sports" },
];

export function AuthorizedSalesContent() {
  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Official
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Authorised Sales Agents
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          {APP_NAME} is the Official Experience, Hospitality & Travel Programme for Formula 1® races in the UK. This partnership guarantees purchase security, as do our Authorised Sales Agents. Give yourself peace of mind of an Official F1® Ticket Package direct from the source, while having the convenience of purchasing in your home country, with a Sales Agent listed below.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <Card className="border-border/80 bg-card/80">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/80 bg-muted/30">
                    <th className="px-4 py-3 text-left font-display font-bold uppercase tracking-tight text-foreground md:px-6">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left font-display font-bold uppercase tracking-tight text-foreground md:px-6">
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {AUTHORISED_AGENTS.map((row, i) => (
                    <tr
                      key={`${row.country}-${row.company}-${i}`}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="px-4 py-3 md:px-6">{row.country}</td>
                      <td className="px-4 py-3 md:px-6">{row.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
