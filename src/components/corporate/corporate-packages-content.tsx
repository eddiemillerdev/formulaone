"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

const BENEFITS = [
  {
    title: "Cultivate experiences for corporate objectives",
    image: "https://assets.quintevents.com/m/698d362b12ab2b8e/72_DPI_WEB-F1E-Brazil-2023-Champions-Club.jpg",
    items: [
      "Relationship building opportunities",
      "Social & networking environments",
      "Company branded private & semi-private workspaces",
    ],
  },
  {
    title: "Exclusive VIP experiences",
    image: "https://assets.quintevents.com/m/384c31d979a436b3/72_DPI_WEB-F1E-Miami-2022-Guided-Paddock-Access-06310.jpg",
    items: [
      "World-class trackside locations",
      "Private events with F1® insiders & legends",
      "Unrivalled access to exclusive venues & activities",
    ],
  },
  {
    title: "Reliable & extensive resources",
    image: "https://assets.quintevents.com/m/2e3d2e654dc7e24/72_DPI_WEB-F1E-Monaco-2023-Paddock-Club-27.jpg",
    items: [
      "Established partnership with Formula 1®",
      "Dedicated on-site hospitality, dining & staffing support",
      "Global, year-long event footprint",
    ],
  },
];

export function CorporatePackagesContent() {
  return (
    <main className="mx-auto page-width space-y-10 py-10 pb-20">
      <FadeIn className="hero-panel-bg relative overflow-hidden rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Corporate
        </Badge>
        <h1 className="mt-4 font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          {APP_NAME} Corporate Hospitality
        </h1>
        <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground md:text-base">
          We create unique opportunities at F1® circuits in the UK for organisations to cultivate an experience for their clients and guests—forming powerful connections far beyond what would otherwise be possible.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <h2 className="font-display text-center text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
          Benefits of corporate hospitality
        </h2>
      </FadeIn>

      <section className="space-y-6">
        {BENEFITS.map((block, index) => (
          <FadeIn key={block.title} delay={0.04 + index * 0.02}>
            <Card className="overflow-hidden border-border/70 bg-card/80 pt-0 md:pt-0">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[220px]">
                  <Image
                    src={block.image}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                    {block.title}
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          </FadeIn>
        ))}
      </section>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
          <CardContent className="p-4 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-display font-bold text-lg uppercase tracking-tight md:text-xl">
                  Enquire about corporate packages
                </h2>
                <p className="mt-3 max-w-[50ch] text-sm text-muted-foreground">
                  Contact our team to discuss hospitality options, group bookings and tailored experiences for your organisation.
                </p>
              </div>
              <Button className="rounded-full" size="lg" asChild>
                <Link href="/support?subject=general">
                  Get in touch
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
