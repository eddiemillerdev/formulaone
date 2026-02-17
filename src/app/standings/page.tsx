"use client";

import { useEffect, useState } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export default function StandingsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Empty className="w-full max-w-md border border-dashed border-border/80 bg-card/40 px-6">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner className="size-8 text-primary" />
            </EmptyMedia>
            <EmptyTitle>Loading standings</EmptyTitle>
            <EmptyDescription>
              Please wait while we load the latest standings. Do not refresh the page.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <h1 className="font-display text-3xl font-black uppercase tracking-tight">
        Standings
      </h1>
      <p className="text-muted-foreground">
        Standings content can go here.
      </p>
    </main>
  );
}
