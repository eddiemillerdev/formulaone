"use client";

import { useState } from "react";
import { Headphones, Mail, MessageSquare, Send } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SUBJECT_OPTIONS = [
  { value: "booking", label: "Booking & tickets" },
  { value: "refunds", label: "Refunds & cancellations" },
  { value: "technical", label: "Technical issue" },
  { value: "payment", label: "Payment & billing" },
  { value: "general", label: "General enquiry" },
] as const;

export function SupportPage() {
  const [subject, setSubject] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim()) return;
    setSubmitted(true);
  }

  return (
    <main className="mx-auto w-[min(1280px,95vw)] space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-8 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Support
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Get in touch
        </h1>
        <p className="max-w-[70ch] text-sm text-muted-foreground md:text-base">
          Have a question about your booking, refunds, or the platform? Choose a subject and send us a message. We aim to respond within 24 hours.
        </p>
      </FadeIn>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <FadeIn delay={0.04}>
          <Card className="border-border/80 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-xl uppercase tracking-tight">Contact form</CardTitle>
              <CardDescription>Select a subject and we’ll route your request to the right team.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
                  <MessageSquare className="mx-auto size-10 text-primary" />
                  <p className="mt-3 font-display text-lg uppercase text-foreground">Message sent</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We’ll get back to you as soon as possible, usually within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="subject" className="w-full rounded-xl">
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="rounded-xl resize-none"
                      placeholder="Describe your question or issue..."
                      required
                    />
                  </div>
                  <Button type="submit" className="rounded-full" size="lg" disabled={!subject.trim()}>
                    <Send className="mr-2 size-4" /> Send message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.06} className="space-y-4">
          <Card className="border-border/80 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-lg uppercase tracking-tight">Other ways to get help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 rounded-xl border border-border/70 bg-background/50 p-3">
                <Headphones className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Concierge</p>
                  <p className="text-sm text-muted-foreground">Premium support for active bookings. Check your confirmation email for a direct link.</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-border/70 bg-background/50 p-3">
                <Mail className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">support@f1pass.com — we reply within 24 hours on business days.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>
    </main>
  );
}
