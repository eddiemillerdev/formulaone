"use client";

import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, Clock, Download, ExternalLink, Mail } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOrderByReference, sendPaymentInstructionsEmail } from "@/lib/api/orders";
import { formatMoney } from "@/lib/api/events";
import type { OrderData } from "@/lib/api/orders";

type FinishStatus = "success" | "error";

function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

export function OrderFinishPage() {
  const params = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [sendingEmail, setSendingEmail] = useState<"me" | "attendees" | null>(null);

  const status = (params.get("status") || "error") as FinishStatus;
  const reference = params.get("reference") || "";
  const orderUrl = params.get("orderUrl") || "";
  const checkoutUrl = params.get("checkoutUrl") || "";
  const total = params.get("total") || "";

  const message = useMemo(() => {
    const fromQuery = params.get("message");
    if (fromQuery) return fromQuery;
    if (status === "success") return "Order created successfully.";
    return "Order could not be completed.";
  }, [params, status]);

  const isSuccess = status === "success";

  useEffect(() => {
    if (!reference || status !== "success") return;
    fetchOrderByReference(reference).then((res) => {
      if (res?.data) setOrderData(res.data);
    });
  }, [reference, status]);

  const isPaymentPending = orderData?.is_payment_received === false;
  const deadlinePassed = orderData?.payment_deadline_at
    ? new Date(orderData.payment_deadline_at) < new Date()
    : false;
  const currency = orderData?.currency ?? { code: "EUR", symbol: "€" };
  const totalLabel = total || (orderData?.grand_total != null ? formatMoney(orderData.grand_total, currency.code) : "");

  return (
    <main className="mx-auto w-[min(840px,92vw)] space-y-6 py-12 pb-20">
      <FadeIn>
        <Card
          className={
            isSuccess
              ? isPaymentPending
                ? "border-amber-500/35 bg-amber-500/10"
                : "border-emerald-500/35 bg-emerald-500/10"
              : "border-destructive/35 bg-destructive/10"
          }
        >
          <CardHeader>
            <div className="mb-2 inline-flex items-center gap-2">
              <Badge
                className={
                  isSuccess
                    ? isPaymentPending
                      ? "rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300"
                      : "rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "rounded-full border border-destructive/40 bg-destructive/15 text-destructive"
                }
              >
                {isSuccess
                  ? isPaymentPending
                    ? "Reservation pending payment"
                    : "Order success"
                  : "Order error"}
              </Badge>
            </div>
            <CardTitle className="font-display text-4xl uppercase tracking-tight">
              {isSuccess
                ? isPaymentPending
                  ? "Reservation confirmed"
                  : "Order Finish: Success"
                : "Order Finish: Error"}
            </CardTitle>
            <CardDescription
              className={
                isSuccess
                  ? isPaymentPending
                    ? "text-amber-700/90 dark:text-amber-100/90"
                    : "text-emerald-700/90 dark:text-emerald-100/90"
                  : "text-destructive/90"
              }
            >
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {isSuccess && isPaymentPending && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
                  <Clock className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="font-medium text-amber-700 dark:text-amber-200">Payment required</p>
                    <p className="text-amber-700/90 dark:text-amber-200/90">
                      Complete your bank transfer and submit your payment receipt. Download the payment
                      instructions PDF or have it sent to your email before heading to the bank.
                    </p>
                    {orderData?.payment_deadline_at && (
                      <p className="mt-2 text-amber-700/90 dark:text-amber-200/90">
                        {deadlinePassed ? (
                          <span className="text-destructive">Payment deadline has passed.</span>
                        ) : (
                          <>
                            Pay by <strong>{formatDate(orderData.payment_deadline_at)}</strong>. If payment is
                            not received by then, your order will be cancelled.
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
                {(orderData?.payment_instructions_pdf_url || isPaymentPending) && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                    <p className="mb-2 text-sm font-medium text-amber-700 dark:text-amber-200">Payment instructions – take this to the bank</p>
                    <p className="mb-3 text-xs text-amber-700/90 dark:text-amber-200/80">Download the PDF or have it sent by email. It contains the amount, reference and bank details for your transfer.</p>
                    <div className="flex flex-wrap gap-2">
                      {orderData?.payment_instructions_pdf_url ? (
                        <a
                          href={orderData.payment_instructions_pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-500/30 dark:text-amber-200"
                        >
                          <Download className="size-4" /> Download PDF
                        </a>
                      ) : (
                        <span className="text-xs text-amber-700/80 dark:text-amber-200/80">Loading PDF link…</span>
                      )}
                      <button
                        type="button"
                        onClick={async () => {
                          if (!reference) return;
                          setSendingEmail("me");
                          await sendPaymentInstructionsEmail(reference, "me");
                          setSendingEmail(null);
                        }}
                        disabled={!!sendingEmail}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-500/30 disabled:opacity-50 dark:text-amber-200"
                      >
                        <Mail className="size-4" /> {sendingEmail === "me" ? "Sending..." : "Email to me"}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!reference) return;
                          setSendingEmail("attendees");
                          await sendPaymentInstructionsEmail(reference, "attendees");
                          setSendingEmail(null);
                        }}
                        disabled={!!sendingEmail}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-500/30 disabled:opacity-50 dark:text-amber-200"
                      >
                        <Mail className="size-4" /> {sendingEmail === "attendees" ? "Sending..." : "Email to all attendees"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 text-foreground">
              {isSuccess ? (
                isPaymentPending ? (
                  <Clock className="size-5 text-amber-600 dark:text-amber-300" />
                ) : (
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-300" />
                )
              ) : (
                <AlertTriangle className="size-5 text-destructive" />
              )}
              <span>
                {isSuccess
                  ? isPaymentPending
                    ? "Your reservation is held. Please complete payment to confirm your tickets."
                    : "Your request has been processed."
                  : "Please review the details below."}
              </span>
            </div>

            {reference ? (
              <p className="text-muted-foreground">
                Reference: <span className="font-semibold text-foreground">{reference}</span>
              </p>
            ) : null}

            {totalLabel ? (
              <p className="text-muted-foreground">
                Grand total: <span className="font-semibold text-foreground">{totalLabel}</span>
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              {isSuccess && orderUrl ? (
                <Button asChild className="rounded-full">
                  <Link href={orderUrl}>
                    View Order <ExternalLink className="ml-2 size-4" />
                  </Link>
                </Button>
              ) : null}

              {!isSuccess && checkoutUrl ? (
                <Button asChild className="rounded-full">
                  <a href={checkoutUrl} target="_blank" rel="noreferrer">
                    Complete Payment <ExternalLink className="ml-2 size-4" />
                  </a>
                </Button>
              ) : null}

              <Button asChild variant="secondary" className="rounded-full">
                <Link href="/events">Back to races</Link>
              </Button>

              <Button asChild variant="outline" className="rounded-full">
                <Link href="/checkout">Back to order page</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
