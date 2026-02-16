"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

const PACKAGE_INCLUSIONS = [
  {
    title: "Access The Best Hotels",
    image: "https://assets.quintevents.com/m/14373f0f69c24165/72_DPI_WEB-F1-Experiences-Bahrain-Le-Meridien-Bedroom.jpg",
    description:
      "As the Official Experience, Hospitality & Travel Programme of Formula 1®, we source rooms for guests at some of the most in-demand hotels on Grand Prix™ weekends.",
  },
  {
    title: "Prime Locations",
    image: "https://assets.quintevents.com/m/11d206856058c18c/72_DPI_WEB-F1E-Singapore-2022-City-19.jpg",
    description:
      "Our hotels are carefully selected to offer the best combination of facilities, proximity to the F1® circuit and access to local attractions, including shopping, restaurants and nightlife. By prioritizing both comfort and convenience, our hotel rooms will create the best home base during a thrilling weekend of racing.",
  },
  {
    title: "Circuit Transfers",
    image: "https://assets.quintevents.com/m/34740cf3a0f35d1a/72_DPI_WEB-F1-Monaco-On-Site-Transportation.jpg",
    description:
      "Take the hassle out of getting to and from the circuit and focus on enjoying your weekend! At selected Grands Prix™ and available to guests who have booked a hotel as part of their Official F1® Ticket Package, daily circuit transfers use modern, air-conditioned coaches and are timed so you won't miss any of the on-track action.",
  },
  {
    title: "Ready to Book?",
    image: "https://assets.quintevents.com/m/127c9d32c7affa7d/72_DPI_WEB-F1E-Miami-2022-Fans-08.jpg",
    description:
      "Booking your stay is easy – look for the 'Add Accommodation & Transfers' section on select F1® Ticket Package pages and choose your hotel, room type, and room quantity. Already purchased your Official F1® Ticket Package? Contact your Sales Representative to add accommodation & circuit transfers to your Grand Prix™ weekend.",
  },
];

export function HotelBenefitsContent() {
  return (
    <main className="mx-auto page-width space-y-10 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Travel
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Premium Hotel Rooms & Convenient Circuit Transfers
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Take the hassle out of planning your trip by booking a stay in one of {APP_NAME}&apos;s premium hotels, with the added benefit of convenient daily round-trip transfers to and from the F1® circuit throughout your Grand Prix™ weekend.
        </p>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          From boutique trackside hotels to luxury city centre accommodation, {APP_NAME} offers a selection of rooms at F1® Grands Prix™ in the UK to suit any budget and preference, ensuring you have a comfortable home base and a stress-free commute to the track each day.
        </p>
      </FadeIn>

      <FadeIn delay={0.03}>
        <h2 className="font-display text-center text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
          Packages Include
        </h2>
      </FadeIn>

      <section className="grid gap-6 sm:grid-cols-2">
        {PACKAGE_INCLUSIONS.map((item, index) => (
          <FadeIn key={item.title} delay={0.04 + index * 0.02}>
            <Card className="overflow-hidden border-border/70 bg-card/80">
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </section>

      <FadeIn delay={0.12}>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
          <CardContent className="p-4 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-display text-lg font-bold uppercase tracking-tight md:text-xl">
                  Request Information
                </h2>
                <p className="mt-3 max-w-[50ch] text-sm text-muted-foreground">
                  Want to discuss Official F1® Ticket Packages and hotel or transfer options for a particular Grand Prix™? Get in touch and we&apos;ll be happy to help.
                </p>
              </div>
              <Button className="rounded-full shrink-0" size="lg" asChild>
                <Link href="/support?subject=general">
                  Contact us
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
