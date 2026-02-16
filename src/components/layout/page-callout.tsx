"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PageCalloutProps = {
  badge?: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export function PageCallout({ badge, title, description, href, linkLabel }: PageCalloutProps) {
  return (
    <FadeIn delay={0.03}>
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardContent className="p-4 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              {badge && (
                <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.1em] text-primary">
                  {badge}
                </span>
              )}
              <h2 className="mt-3 font-display font-bold text-lg uppercase leading-tight tracking-tight md:text-xl">
                {title}
              </h2>
              <p className="mt-3 max-w-[50ch] text-sm text-muted-foreground">{description}</p>
            </div>
            <div>
              <Button className="rounded-full" size="lg" asChild>
                <Link href={href}>
                  {linkLabel}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
