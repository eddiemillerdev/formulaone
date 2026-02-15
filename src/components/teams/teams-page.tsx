"use client";

import { motion } from "framer-motion";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const asAssetUrl = (path: string) => encodeURI(path);

const teams = [
  {
    name: "Red Bull Racing",
    color: "from-[#1d4ed8] to-[#dc2626]",
    image: "/backgrounds/Austrian Grand Prix/2025 Austrian GP - Max Verstappen 3.jpg",
  },
  {
    name: "Ferrari",
    color: "from-[#dc2626] to-[#7f1d1d]",
    image: "/backgrounds/Monaco Grand Prix/2025 Monaco GP - Charles Leclerc.jpg",
  },
  {
    name: "Mercedes",
    color: "from-[#0f766e] to-[#164e63]",
    image: "/backgrounds/British Grand Prix/2025 British GP - Lewis Hamilton Grid.jpg",
  },
  {
    name: "McLaren",
    color: "from-[#f97316] to-[#7c2d12]",
    image: "/backgrounds/Las Vegas Grand Prix/2025 Las Vegas GP - Oscar Piastri & Liam Lawson.jpg",
  },
  {
    name: "Aston Martin",
    color: "from-[#065f46] to-[#022c22]",
    image: "/backgrounds/Saudi Arabian Grand Prix/2025 Saudi Arabian GP - Isack Hadjar, Fernando Alonso & Liam Lawson.jpg",
  },
  {
    name: "Williams",
    color: "from-[#1e3a8a] to-[#0f172a]",
    image: "/backgrounds/Australian Grand Prix/2025 Australian GP - George Russell.jpg",
  },
  {
    name: "Alpine",
    color: "from-[#0ea5e9] to-[#1e3a8a]",
    image: "/backgrounds/Miami Grand Prix/2025 Miami GP - Pierre Gasly.jpg",
  },
  {
    name: "RB",
    color: "from-[#312e81] to-[#1f2937]",
    image: "/backgrounds/Italian Grand Prix/2025 Italian GP - Isack Hadjar 2.jpg",
  },
  {
    name: "Sauber",
    color: "from-[#65a30d] to-[#365314]",
    image: "/backgrounds/Qatar Grand Prix/2025 Qatar GP - Kimi Antonelli.jpg",
  },
  {
    name: "Haas",
    color: "from-[#6b7280] to-[#111827]",
    image: "/backgrounds/United States Grand Prix/2025 United States GP - Oliver Bearman.jpg",
  },
];

export function TeamsPage() {
  return (
    <main className="mx-auto w-[min(1280px,95vw)] space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-8">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Teams
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.9] tracking-wide md:text-3xl md:tracking-wider">Team Hub</h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Placeholder teams page is now live. You can replace cards with your final team data, logos, sponsor blocks, and dedicated team landing pages later.
        </p>
      </FadeIn>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team, index) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * index, duration: 0.45 }}
            whileHover={{ y: -6 }}
          >
            <Card className="overflow-hidden border-border/70 bg-card/70 pt-0">
              <div
                className={`relative h-44 bg-gradient-to-br ${team.color} bg-cover bg-center`}
                style={{
                  backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.42), rgba(0,0,0,0.62)), url('${asAssetUrl(team.image)}')`,
                }}
              />
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-tight">{team.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Team profile, drivers, schedule highlights, and package guides will appear here.</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
