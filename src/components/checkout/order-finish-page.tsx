"use client";

import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, Clock, Download, ExternalLink, Mail } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Spinner } from "@/components/ui/spinner";
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
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const status = (params.get("status") || "error") as FinishStatus;
  const reference = params.get("reference") || "";
  const orderUrl = params.get("orderUrl") || "";
  const checkoutUrl = params.get("checkoutUrl") || "";
  const total = params.get("total") || "";

  const message = useMemo(() => {
    const fromQuery = params.get("message");
    if (fromQuery) return fromQuery;
    if (status === "success") return "Order received. Your reservation is held—tickets are not confirmed until payment is complete.";
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
                    Full payment must be received to confirm the order. The reservation will remain in pending status until funds are received and credited to our account.
                    
                    To proceed, please download the payment instructions or have them sent to your email before initiating the transfer.
                    </p>
                  </div>
                </div>
                {(orderData?.payment_instructions_pdf_url || isPaymentPending) && reference && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                    <p className="mb-2 text-sm font-medium text-amber-700 dark:text-amber-200">Payment instructions</p>
                    <ol className="mb-3 list-decimal list-inside space-y-1.5 text-sm text-amber-700/90 dark:text-amber-200/80">
                      <li>Click “Download PDF” to access the bank transfer details. Alternatively, select “Email to me” or “Email to attendees” to receive the instructions directly.</li>
                      <li>Complete the wire transfer using the banking details provided in the document.</li>
                      <li>Ensure the reservation reference is included in the payment description to enable seamless allocation.</li>
                      <li>Once the wire has been processed, submit your payment confirmation or receipt as instructed in the PDF.</li>
                    </ol>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={downloadingPdf}
                        onClick={async () => {
                          setDownloadingPdf(true);
                          try {
                            const res = await fetch(`/api/orders/${encodeURIComponent(reference)}/payment-instructions`);
                            if (!res.ok) throw new Error("Download failed");
                            const blob = await res.blob();
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `Payment-Instructions-${reference}.pdf`;
                            a.click();
                            URL.revokeObjectURL(url);
                          } finally {
                            setDownloadingPdf(false);
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-500/30 disabled:opacity-50 dark:text-amber-200"
                      >
                        {downloadingPdf ? <Spinner className="size-4" /> : <Download className="size-4" />}
                        {downloadingPdf ? "Downloading…" : "Download PDF"}
                      </button>
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
                    ? (
                        <>
                          Your reservation is held. Please complete payment to confirm your tickets.
                          {orderData?.payment_deadline_at && !deadlinePassed && (
                            <> Pay by <strong>{formatDate(orderData.payment_deadline_at)}</strong> (business days only). If your payment confirmation or receipt is not received by then, your order will be cancelled.</>
                          )}
                        </>
                      )
                    : "Your request has been processed."
                  : "Please review the details below."}
              </span>
            </div>

            {reference ? (
              <p className="text-muted-foreground">
                Reference: <span className="font-semibold text-foreground">{reference}</span>
              </p>
            ) : null}

            {isSuccess && orderData && (orderData.amount != null || orderData.grand_total != null) ? (
              <div className="rounded-lg border border-border/70 bg-muted/30 p-4 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Payment summary</p>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
                  {orderData.amount != null && (
                    <>
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatMoney(orderData.amount, currency.code)}</span>
                    </>
                  )}
                  {orderData.booking_fee != null && orderData.booking_fee > 0 && (
                    <>
                      <span className="text-muted-foreground">Booking fee</span>
                      <span>{formatMoney(orderData.booking_fee, currency.code)}</span>
                    </>
                  )}
                  {orderData.organiser_booking_fee != null && orderData.organiser_booking_fee > 0 && (
                    <>
                      <span className="text-muted-foreground">Service fee</span>
                      <span>{formatMoney(orderData.organiser_booking_fee, currency.code)}</span>
                    </>
                  )}
                  {orderData.taxamt != null && orderData.taxamt > 0 && (
                    <>
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatMoney(orderData.taxamt, currency.code)}</span>
                    </>
                  )}
                  {orderData.grand_total != null && (
                    <>
                      <span className="font-semibold text-foreground">Grand total</span>
                      <span className="font-semibold text-foreground">{formatMoney(orderData.grand_total, currency.code)}</span>
                    </>
                  )}
                </div>
              </div>
            ) : totalLabel ? (
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
