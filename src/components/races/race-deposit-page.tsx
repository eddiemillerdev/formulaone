"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitDepositRequest } from "@/lib/api/deposit";
import { splitPhoneForDepositApi } from "@/lib/split-phone-for-deposit";
import { type RaceMappingItem } from "@/lib/races-mapping";

import { DepositPhoneField } from "./deposit-phone-field";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1® Experiences";

const PEOPLE_OPTIONS = [
  { value: "1", label: "1 person" },
  { value: "2", label: "2 people" },
  { value: "3", label: "3 people" },
  { value: "4", label: "4 people" },
] as const;

type Props = {
  race: RaceMappingItem;
  year: number;
};

function raceBillboardTitle(raceName: string, eventYear: number) {
  return `FORMULA 1 ${raceName.toUpperCase()} ${eventYear}`;
}

export function RaceDepositPage({ race, year }: Props) {
  const packages = race.packages;
  const defaultPkg = packages[0];
  const location = race.location;

  const [packageId, setPackageId] = useState(defaultPkg?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [detailsUnlocked, setDetailsUnlocked] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [corporateGroup, setCorporateGroup] = useState(false);
  const [travelAdviser, setTravelAdviser] = useState(false);
  const [comments, setComments] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const depositSuccessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!submitted) return;
    const id = window.requestAnimationFrame(() => {
      depositSuccessRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [submitted]);

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === packageId) ?? defaultPkg,
    [packages, packageId, defaultPkg],
  );

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPackage || quantity < 1 || quantity > 4) {
      toast.error("Choose a package and number of people.");
      return;
    }
    setDetailsUnlocked(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPackage) return;
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    const { phone_country_code, phone_number, isValid } = splitPhoneForDepositApi(phone);
    if (!phone_number.trim() || !isValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!privacyAccepted) {
      toast.error("Please confirm privacy and contact consent to continue.");
      return;
    }

    setSubmitting(true);
    const result = await submitDepositRequest({
      race_id: race.id,
      race_name: race.name,
      package_id: selectedPackage.id,
      package_label: selectedPackage.label,
      package_amount_label: selectedPackage.amountLabel,
      quantity,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone_country_code,
      phone_number: phone_number.trim(),
      corporate_group: corporateGroup,
      travel_adviser: travelAdviser,
      comments: comments.trim(),
      privacy_accepted: true,
    });
    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    setSubmitted(true);
  }

  const quantityStr = String(quantity) as (typeof PEOPLE_OPTIONS)[number]["value"];

  return (
    <main className="mx-auto page-width space-y-8 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link
            href={`/races/${year}`}
            className="inline-flex min-h-9 shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            Back to {year} races
          </Link>
          <Badge className="h-9 min-h-9 shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-0 text-[11px] uppercase tracking-[0.12em] text-primary">
            Deposit
          </Badge>
        </div>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          {race.name}
        </h1>
        <p className="max-w-[75ch] text-sm text-muted-foreground md:text-base">{race.location}</p>
      </FadeIn>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-start">
        <FadeIn delay={0.04} className="min-w-0">
          <Card className="border-border/80 bg-card/80 text-left">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="font-display text-xl uppercase tracking-tight">Deposit request</CardTitle>
              <CardDescription className="text-pretty">
                {race.circuit} · {location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {submitted ? (
                <div
                  ref={depositSuccessRef}
                  className="scroll-mt-6 rounded-xl border border-primary/30 bg-primary/10 p-6 text-center"
                >
                  <p className="font-display text-lg uppercase text-foreground">Request received</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you. We have sent your deposit enquiry for {race.name}. We will contact you shortly.
                  </p>
                  <Button asChild className="mt-6 rounded-full" variant="outline">
                    <Link href={`/races/${year}`}>Return to races</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={detailsUnlocked ? handleSubmit : handleContinue} className="space-y-6">
                  <div className="space-y-4 text-sm leading-relaxed text-foreground">
                    <p className="text-pretty">
                      By placing a deposit through the {APP_NAME} Deposit Programme, you are guaranteed priority access to purchase an Official F1® Experiences Ticket Package before they are made available to the general public. Select from the below exciting deposit options to lock in your desired access for the Grand Prix™ in {location}.
                    </p>

                    <div className="rounded-lg border border-red-500/35 bg-red-500/[0.06] px-3 py-2.5 dark:border-red-400/30 dark:bg-red-500/[0.08]">
                      <p className="font-semibold text-red-600 dark:text-red-400">Please Note</p>
                      <p className="mt-1 text-pretty text-foreground/95">
                        This deposit can only be applied towards multi-day packages; single-day packages do not apply. All deposits are non-refundable and will be applied to your total package price* for the Grand Prix™ in {location}.
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">*2027 package pricing is not confirmed.</p>
                    </div>

                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] sm:gap-6">
                      <div className="flex min-w-0 flex-col gap-2">
                        <Label htmlFor="package" className="ml-1.5 text-foreground">
                          Package
                        </Label>
                        <Select value={packageId} onValueChange={setPackageId} disabled={detailsUnlocked}>
                          <SelectTrigger id="package" className="h-11 w-full rounded-xl">
                            <SelectValue placeholder="Select a package" />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.label} ({p.amountLabel})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex min-w-0 flex-col gap-2">
                        <Label htmlFor="people" className="ml-1.5 text-foreground">
                          People
                        </Label>
                        <Select
                          value={quantityStr}
                          onValueChange={(v) => setQuantity(Number.parseInt(v, 10))}
                          disabled={detailsUnlocked}
                        >
                          <SelectTrigger id="people" className="h-11 w-full rounded-xl">
                            <SelectValue placeholder="Number of people" />
                          </SelectTrigger>
                          <SelectContent>
                            {PEOPLE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {race.id === "chinese-gp" && detailsUnlocked ? (
                      <div className="rounded-lg border border-red-500/35 bg-red-500/[0.06] px-3 py-2.5 dark:border-red-400/30 dark:bg-red-500/[0.08]">
                        <p className="font-semibold text-red-600 dark:text-red-400">Please Note</p>
                        <p className="mt-1 text-pretty text-foreground/95">
                          Facial recognition technology will be used for event entry and security at the {raceBillboardTitle(race.name, year)}. Access to the circuit requires consent to its use for identity verification and safety purposes.
                        </p>
                      </div>
                    ) : null}
                    <p className="text-xs text-muted-foreground">Amount includes all applicable local taxes</p>
                  </div>

                  {!detailsUnlocked ? (
                    <Button type="submit" className="w-full rounded-full sm:w-auto" size="lg">
                      Continue
                    </Button>
                  ) : null}

                  {detailsUnlocked ? (
                    <div className="space-y-4 border-t border-border/60 pt-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="ml-1.5">
                            First name
                          </Label>
                          <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-11 rounded-xl"
                            autoComplete="given-name"
                            placeholder="Jane"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="ml-1.5">
                            Last name
                          </Label>
                          <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-11 rounded-xl"
                            autoComplete="family-name"
                            placeholder="Smith"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="ml-1.5">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 rounded-xl"
                            autoComplete="email"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="ml-1.5">
                            Phone
                          </Label>
                          <DepositPhoneField
                            id="phone"
                            value={phone}
                            placeholder="Phone number"
                            onPhoneChange={(value) => setPhone(value ?? "")}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <label className="flex cursor-pointer items-start gap-3 text-sm">
                          <Checkbox
                            checked={corporateGroup}
                            onCheckedChange={(v) => setCorporateGroup(v === true)}
                            className="mt-0.5"
                            id="corp"
                          />
                          <span>Is this request for a corporate group?</span>
                        </label>
                        <label className="flex cursor-pointer items-start gap-3 text-sm">
                          <Checkbox
                            checked={travelAdviser}
                            onCheckedChange={(v) => setTravelAdviser(v === true)}
                            className="mt-0.5"
                            id="reseller"
                          />
                          <span>Are you a Travel Adviser/Reseller?</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments" className="ml-1.5">
                          Comments
                        </Label>
                        <Textarea
                          id="comments"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          rows={4}
                          className="rounded-xl resize-none"
                          placeholder="Questions, accessibility needs, or other notes for our team…"
                        />
                      </div>

                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug">
                        <Checkbox
                          checked={privacyAccepted}
                          onCheckedChange={(v) => setPrivacyAccepted(v === true)}
                          className="mt-0.5"
                          id="privacy"
                          required
                        />
                        <span>
                          I agree to our{" "}
                          <Link href="/privacy-policy" className="font-medium text-primary underline-offset-4 hover:underline">
                            privacy policy
                          </Link>{" "}
                          and to be contacted regarding my selected event.
                        </span>
                      </label>

                      <Button type="submit" className="w-full rounded-full sm:w-auto" size="lg" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" /> Sending…
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 size-4" /> Submit deposit
                          </>
                        )}
                      </Button>
                    </div>
                  ) : null}
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.06} className="min-w-0 lg:sticky lg:top-24">
          <Card className="border-border/80 bg-card/80 text-left">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="font-display text-lg uppercase tracking-tight">Need help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-2 text-sm text-muted-foreground">
              <p className="text-pretty">
                Deposits register interest for {year}; final dates and availability are confirmed later. Questions? Visit our{" "}
                <Link href="/support" className="font-medium text-primary underline-offset-4 hover:underline">
                  support
                </Link>{" "}
                page.
              </p>
              <p className="text-xs text-muted-foreground/90">{APP_NAME}</p>
            </CardContent>
          </Card>
        </FadeIn>
      </section>
    </main>
  );
}
