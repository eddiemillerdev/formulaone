"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEventsQuery } from "@/hooks/use-events-query";
import { formatMoney, getEventById, getTicketById } from "@/lib/api/events";
import { ORDER_SERVICE_MODE, OrderApiError, orderService } from "@/lib/api/orders";
import { useBookingStore } from "@/store/booking-store";

const ticketHolderSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
});

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  notes: z.string().optional(),
  ticketHolders: z.array(ticketHolderSchema).min(1, "At least one ticket holder is required"),
});

type CheckoutInput = z.infer<typeof checkoutSchema>;

const EMPTY_TICKET_HOLDER = {
  firstName: "",
  lastName: "",
  email: "",
};

function sameHolders(left: CheckoutInput["ticketHolders"], right: CheckoutInput["ticketHolders"]) {
  if (left.length !== right.length) return false;
  return left.every(
    (holder, index) =>
      holder.firstName === right[index]?.firstName &&
      holder.lastName === right[index]?.lastName &&
      holder.email === right[index]?.email,
  );
}

export function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: events = [], isLoading, isError } = useEventsQuery();

  const {
    eventId: storedEventId,
    ticketId: storedTicketId,
    quantity,
    selectedAddOns,
    setQuantity,
    setSelectedAddOns,
    clearBooking,
  } = useBookingStore();

  const eventId = searchParams.get("event") || storedEventId;
  const ticketId = searchParams.get("ticket") || storedTicketId;

  const selectedEvent = useMemo(() => getEventById(events, eventId), [events, eventId]);
  const selectedTicket = useMemo(
    () => getTicketById(selectedEvent, ticketId),
    [selectedEvent, ticketId],
  );

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
      ticketHolders: [EMPTY_TICKET_HOLDER],
    },
  });

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "ticketHolders",
  });

  const buyerFirstName = useWatch({ control: form.control, name: "firstName" });
  const buyerLastName = useWatch({ control: form.control, name: "lastName" });
  const buyerEmail = useWatch({ control: form.control, name: "email" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyFromBuyer, setCopyFromBuyer] = useState(false);
  const ticketHoldersError = form.formState.errors.ticketHolders?.message;

  function routeToFinish(input: {
    status: "success" | "error";
    message: string;
    reference?: string;
    orderUrl?: string | null;
    checkoutUrl?: string;
    total?: string;
  }) {
    const params = new URLSearchParams();
    params.set("status", input.status);
    params.set("message", input.message);
    if (input.reference) params.set("reference", input.reference);
    const frontendOrderUrl = input.reference ? `/order/${input.reference}` : null;
    if (frontendOrderUrl) params.set("orderUrl", frontendOrderUrl);
    if (input.checkoutUrl) params.set("checkoutUrl", input.checkoutUrl);
    if (input.total) params.set("total", input.total);
    router.push(`/order/finish?${params.toString()}`);
  }

  useEffect(() => {
    if (!selectedTicket || selectedTicket.isUnlimited) {
      return;
    }

    const maxQuantity = Math.max(1, selectedTicket.quantityRemaining ?? 1);
    if (quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
  }, [selectedTicket, quantity, setQuantity]);

  useEffect(() => {
    const desiredQuantity = Math.max(1, quantity);
    const current = form.getValues("ticketHolders");

    const buyerTemplate = {
      firstName: buyerFirstName || "",
      lastName: buyerLastName || "",
      email: buyerEmail || "",
    };

    const next = Array.from({ length: desiredQuantity }, (_, index) => {
      if (copyFromBuyer) {
        return buyerTemplate;
      }
      return current[index] ?? EMPTY_TICKET_HOLDER;
    });

    if (!sameHolders(current, next)) {
      replace(next);
    }
  }, [
    quantity,
    copyFromBuyer,
    buyerFirstName,
    buyerLastName,
    buyerEmail,
    form,
    replace,
  ]);

  const addOnsTotal = useMemo(() => {
    if (!selectedTicket?.addOns?.length || !selectedAddOns.length) return 0;
    let sum = 0;
    for (const sel of selectedAddOns) {
      const addOn = selectedTicket.addOns.find((a) => a.id === sel.addOnId);
      if (!addOn) continue;
      let unitPrice = addOn.price;
      if (sel.optionId) {
        const opt = addOn.options?.find((o) => o.id === sel.optionId);
        if (opt) unitPrice += opt.priceModifier;
      }
      sum += unitPrice * sel.quantity;
    }
    return sum;
  }, [selectedTicket, selectedAddOns]);

  const pricing = useMemo(() => {
    if (!selectedTicket) {
      return { subtotal: 0, addOnsTotal: 0, total: 0 };
    }
    const qty = Math.max(1, quantity);
    const subtotal = selectedTicket.price * qty;
    const total = subtotal + addOnsTotal;
    return { subtotal, addOnsTotal, total };
  }, [selectedTicket, quantity, addOnsTotal]);

  async function onSubmit(values: CheckoutInput) {
    if (!selectedEvent || !selectedTicket) {
      routeToFinish({
        status: "error",
        message: "Select a race package first.",
      });
      return;
    }

    if (values.ticketHolders.length < Math.max(1, quantity)) {
      form.setError("ticketHolders", {
        type: "manual",
        message: "Please complete ticket holder details for each ticket.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await orderService.submitReservation({
        eventId: selectedEvent.id,
        ticketId: selectedTicket.id,
        quantity,
        addOns: selectedAddOns.length ? selectedAddOns : undefined,
        payOffline: true, // Enable offline payment for this order
        customer: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          notes: values.notes,
        },
        ticketHolders: values.ticketHolders.slice(0, Math.max(1, quantity)),
      });

      const currencyCode = response.data?.currency?.code ?? selectedEvent.currency?.code ?? "EUR";
      const totalLabel = response.grandTotal == null ? undefined : formatMoney(response.grandTotal, currencyCode);
      if (response.data && typeof window !== "undefined") {
        try {
          window.localStorage.setItem("f1-order", JSON.stringify(response.data));
        } catch {}
      }
      clearBooking();
      setCopyFromBuyer(false);
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        notes: "",
        ticketHolders: [EMPTY_TICKET_HOLDER],
      });
      routeToFinish({
        status: "success",
        message: response.message,
        reference: response.reservationReference,
        orderUrl: response.orderUrl,
        total: totalLabel,
      });
    } catch (error) {
      if (error instanceof OrderApiError) {
        const validationMessage = error.validationErrors
          ? Object.values(error.validationErrors).flat()[0]
          : null;
        routeToFinish({
          status: "error",
          message: validationMessage || error.message,
          checkoutUrl: error.checkoutUrl,
        });
        return;
      }

      const message = error instanceof Error ? error.message : "Could not submit reservation";
      routeToFinish({
        status: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto w-[min(1280px,95vw)] py-10">
        <Card className="border-border/80 bg-card/80">
          <CardContent className="py-10 text-sm text-muted-foreground">Loading checkout details...</CardContent>
        </Card>
      </main>
    );
  }

  if (isError || !selectedEvent || !selectedTicket) {
    return (
      <main className="mx-auto w-[min(1280px,95vw)] py-10">
        <Card className="border-destructive/40 bg-destructive/10">
          <CardContent className="space-y-4 py-10">
            <p className="font-display text-2xl uppercase text-destructive">Package not selected</p>
            <p className="text-sm text-destructive/90">Choose a race and package first to continue checkout.</p>
            <Button className="rounded-full" variant="secondary" onClick={() => router.push("/events")}>
              Browse events
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const isSoldOut =
    selectedTicket.isSoldOut || (!selectedTicket.isUnlimited && (selectedTicket.quantityRemaining ?? 0) <= 0);

  const eventDetailUrl = `/events/${selectedEvent.id}`;

  return (
    <main className="mx-auto w-[min(1280px,95vw)] space-y-6 py-10 pb-20">
      <FadeIn className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" className="rounded-full" onClick={() => router.push(eventDetailUrl)}>
          <ArrowLeft className="mr-2 size-4" /> Back to event
        </Button>
      </FadeIn>
      <FadeIn className="space-y-2">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Finalize Booking</p>
        <h1 className="font-display font-black text-5xl uppercase leading-[0.95] tracking-tight md:text-6xl">Secure Your Race Weekend</h1>
        <p className="text-muted-foreground">
          {selectedEvent.name} • {selectedEvent.dateLabel}
        </p>
      </FadeIn>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.88fr]">
        <FadeIn className="space-y-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Card className="border-border/80 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-3xl uppercase tracking-tight">Guest Details</CardTitle>
              <CardDescription>
                {selectedTicket.title} • {formatMoney(selectedTicket.price)} per ticket
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input {...field} className="rounded-xl" placeholder="e.g. James" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input {...field} className="rounded-xl" placeholder="e.g. Smith" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} className="rounded-xl" placeholder="e.g. james@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} className="rounded-xl" placeholder="e.g. +44 7700 900000" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special requests</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Dietary, seating, transfer logistics"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="rounded-xl border border-border/70 bg-muted/30 space-y-3 p-4">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={1}
                      max={
                        selectedTicket.isUnlimited
                          ? undefined
                          : Math.max(1, selectedTicket.quantityRemaining ?? 20)
                      }
                      value={quantity}
                      onChange={(event) => setQuantity(Number(event.target.value))}
                      className="rounded-xl"
                      placeholder="1"
                    />

                    {selectedTicket.addOns && selectedTicket.addOns.length > 0 && (
                      <div className="grid gap-3 pt-2">
                        <Label>Optional add-ons</Label>
                        <p className="text-xs text-muted-foreground">
                          Add-ons have their own quantity (e.g. 1× Double accommodation or 2× Single). Not tied to ticket count.
                        </p>
                        {selectedTicket.addOns.map((addOn) => {
                          const sel = selectedAddOns.find((s) => s.addOnId === addOn.id);
                          const hasOptions = addOn.options && addOn.options.length > 0;
                          const selectedOptionTitle = sel?.optionId ? addOn.options?.find((o) => o.id === sel.optionId)?.title : null;
                          const addOnDisplayName = selectedOptionTitle ? `${addOn.title} (${selectedOptionTitle})` : addOn.title;
                          return (
                            <div key={addOn.id} className="space-y-2 rounded-lg border border-border/50 p-3">
                              <label className="flex items-center gap-3 text-sm">
                                <Checkbox
                                  checked={!!sel}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedAddOns([
                                        ...selectedAddOns.filter((s) => s.addOnId !== addOn.id),
                                        { addOnId: addOn.id, quantity: 1, optionId: hasOptions ? addOn.options?.[0]?.id : undefined },
                                      ]);
                                    } else {
                                      setSelectedAddOns(selectedAddOns.filter((s) => s.addOnId !== addOn.id));
                                    }
                                  }}
                                />
                                <span>{addOnDisplayName}</span>
                                <span className="text-muted-foreground">
                                  +{formatMoney(addOn.price, selectedEvent?.currency?.code)}
                                  {hasOptions && addOn.options && addOn.options.some((o) => o.priceModifier) && " base"}
                                </span>
                              </label>
                              {sel && (
                                <div className="ml-6 flex flex-wrap items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor={`addon-qty-${addOn.id}`} className="text-xs font-normal text-muted-foreground">
                                      Qty
                                    </Label>
                                    <Input
                                      id={`addon-qty-${addOn.id}`}
                                      type="number"
                                      min={1}
                                      max={99}
                                      value={sel.quantity}
                                      onChange={(e) => {
                                        const v = Math.max(1, Math.min(99, Number(e.target.value) || 1));
                                        setSelectedAddOns(
                                          selectedAddOns.map((s) =>
                                            s.addOnId === addOn.id ? { ...s, quantity: v } : s,
                                          ),
                                        );
                                      }}
                                      className="h-8 w-16 rounded-lg text-sm"
                                    />
                                  </div>
                                  {hasOptions && addOn.options && (
                                    <div className="flex flex-wrap gap-2">
                                      {addOn.options.map((opt) => (
                                        <label key={opt.id} className="flex items-center gap-2 text-xs">
                                          <input
                                            type="radio"
                                            name={`addon-${addOn.id}-option`}
                                            checked={sel.optionId === opt.id}
                                            onChange={() =>
                                              setSelectedAddOns(
                                                selectedAddOns.map((s) =>
                                                  s.addOnId === addOn.id ? { ...s, optionId: opt.id } : s,
                                                ),
                                              )
                                            }
                                          />
                                          {opt.title}
                                          {opt.priceModifier !== 0 && ` (${opt.priceModifier > 0 ? "+" : ""}${formatMoney(opt.priceModifier, selectedEvent?.currency?.code)})`}
                                        </label>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-3xl uppercase tracking-tight">Ticket Holders</CardTitle>
              <CardDescription>
                Add one ticket holder per seat ({Math.max(1, quantity)} total). Names will appear on the tickets.
              </CardDescription>
              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <Checkbox
                  checked={copyFromBuyer}
                  onCheckedChange={(value) => setCopyFromBuyer(Boolean(value))}
                />
                Copy buyer details to all ticket holders
              </label>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-4">
                    <p className="text-sm font-medium text-muted-foreground">Ticket holder #{index + 1}</p>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name={`ticketHolders.${index}.firstName` as const}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input {...f} disabled={copyFromBuyer} className="rounded-xl" placeholder="First name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`ticketHolders.${index}.lastName` as const}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input {...f} disabled={copyFromBuyer} className="rounded-xl" placeholder="Last name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`ticketHolders.${index}.email` as const}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...f}
                                disabled={copyFromBuyer}
                                className="rounded-xl"
                                placeholder="email@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
                {ticketHoldersError ? (
                  <p className="text-sm text-destructive">{ticketHoldersError}</p>
                ) : null}
                <Button className="rounded-full" type="submit" disabled={isSubmitting || isSoldOut}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Submitting reservation...
                    </>
                  ) : isSoldOut ? (
                    "Package sold out"
                  ) : (
                    "Submit Reservation Request"
                  )}
                </Button>
            </CardContent>
          </Card>
            </form>
          </Form>
        </FadeIn>

        <FadeIn delay={0.06}>
          <Card className="border-primary/30 bg-gradient-to-br from-card via-card to-primary/10">
            <CardHeader>
              <CardTitle className="font-display text-3xl uppercase tracking-tight">Order Summary</CardTitle>
              <CardDescription>Your request is confirmed before payment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="rounded-lg border border-border/70 bg-background/50 p-3 space-y-1">
                <p className="font-semibold text-foreground">{selectedEvent.name}</p>
                <p className="text-muted-foreground">{selectedEvent.dateLabel} • {selectedEvent.venue}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/50 p-3 space-y-1">
                <p className="font-semibold text-foreground">{selectedTicket.title}</p>
                <p className="text-muted-foreground">{selectedTicket.category} • {quantity} ticket{quantity !== 1 ? "s" : ""} × {formatMoney(selectedTicket.price, selectedEvent?.currency?.code)}</p>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-2 text-muted-foreground">
                <span>Tickets ({quantity} × {formatMoney(selectedTicket.price, selectedEvent?.currency?.code)})</span>
                <span>{formatMoney(pricing.subtotal, selectedEvent?.currency?.code)}</span>
                {selectedAddOns.length > 0 && selectedTicket.addOns && selectedAddOns.map((sel) => {
                  const addOn = selectedTicket.addOns?.find((a) => a.id === sel.addOnId);
                  if (!addOn) return null;
                  let unitPrice = addOn.price;
                  if (sel.optionId) {
                    const opt = addOn.options?.find((o) => o.id === sel.optionId);
                    if (opt) unitPrice += opt.priceModifier;
                  }
                  const lineTotal = unitPrice * sel.quantity;
                  const optionLabel = sel.optionId ? addOn.options?.find((o) => o.id === sel.optionId)?.title : null;
                  const lineTitle = optionLabel ? `${addOn.title} (${optionLabel})` : addOn.title;
                  return (
                    <span key={addOn.id} className="col-span-2 text-xs pl-2 border-l-2 border-border/50">
                      {lineTitle} × {sel.quantity} = {formatMoney(lineTotal, selectedEvent?.currency?.code)}
                    </span>
                  );
                })}
                {pricing.addOnsTotal > 0 && (
                  <>
                    <span>Add-ons total</span>
                    <span>{formatMoney(pricing.addOnsTotal, selectedEvent?.currency?.code)}</span>
                  </>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">Subtotal</span>
                <span className="font-display text-xl">{formatMoney(pricing.total, selectedEvent?.currency?.code)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Final amount to pay (including any fees) will be confirmed on the next page after your reservation is created.
              </p>
              <p className="text-xs text-muted-foreground">
                {ORDER_SERVICE_MODE === "mock"
                  ? "Order submission is currently running in mock mode."
                  : "Order submission is connected to the public orders API."}
              </p>
              <p className="text-xs text-muted-foreground/90">
                Prices and availability are subject to confirmation. After you submit, you will receive an email with next steps and payment instructions. Your reservation is held until the payment deadline.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </section>
    </main>
  );
}
