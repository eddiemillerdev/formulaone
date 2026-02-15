"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, Download, Mail, Upload } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOrderByReference, uploadReceipt, confirmReceipt, removeReceipt, sendPaymentInstructionsEmail, type OrderData } from "@/lib/api/orders";
import { formatMoney } from "@/lib/api/events";

const ORDER_STORAGE_KEY = "f1-order";

function saveOrderToStorage(data: OrderData) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function loadOrderFromStorage(): OrderData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderData;
  } catch {
    return null;
  }
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

export function OrderViewPage({ reference: refProp }: { reference?: string }) {
  const params = useParams();
  const reference = refProp ?? (params?.reference as string) ?? "";

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [sendingEmail, setSendingEmail] = useState<"me" | "attendees" | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const loadOrder = useCallback(async () => {
    if (!reference) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const fromStorage = loadOrderFromStorage();
    if (fromStorage?.order_reference?.toUpperCase() === reference.toUpperCase()) {
      setOrder(fromStorage);
    }
    const res = await fetchOrderByReference(reference);
    if (res?.data) {
      setOrder(res.data);
      saveOrderToStorage(res.data);
    }
    setLoading(false);
  }, [reference]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  // Poll for payment status so the page turns green when the manager accepts payment (no refresh needed)
  useEffect(() => {
    if (!reference || !order || order.is_payment_received === true) return;
    const intervalMs = 5000;
    const t = setInterval(async () => {
      const res = await fetchOrderByReference(reference);
      if (res?.data) {
        setOrder(res.data);
        saveOrderToStorage(res.data);
      }
    }, intervalMs);
    return () => clearInterval(t);
  }, [reference, order?.is_payment_received]);

  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !reference) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    const result = await uploadReceipt(reference, file);
    setUploading(false);
    if (result.status === "success") {
      loadOrder();
    } else {
      setUploadError(result.message);
    }
    e.target.value = "";
  };

  const handleConfirmReceipt = async () => {
    if (!reference) return;
    setConfirming(true);
    setUploadError(null);
    const result = await confirmReceipt(reference);
    setConfirming(false);
    if (result.status === "success") {
      setUploadSuccess(true);
      loadOrder();
    } else {
      setUploadError(result.message);
    }
  };

  const handleChooseDifferent = async () => {
    if (!reference) return;
    setRemoving(true);
    setUploadError(null);
    const result = await removeReceipt(reference);
    setRemoving(false);
    if (result.status === "success") {
      loadOrder();
    } else {
      setUploadError(result.message);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-[min(840px,92vw)] py-12">
        <p className="text-muted-foreground">Loading order...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto w-[min(840px,92vw)] py-12 space-y-4">
        <Card className="border-destructive/35 bg-destructive/10">
          <CardContent className="py-10">
            <p className="font-display text-xl">Order not found</p>
            <p className="text-muted-foreground text-sm">We could not find an order with reference {reference}.</p>
            <Button asChild className="mt-4 rounded-full">
              <Link href="/events">Browse events</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const currency = order.currency ?? { code: "EUR", symbol: "€" };
  const format = (n: number) => formatMoney(n, currency.code);
  const isPaid = order.is_payment_received === true;
  const deadlinePassed = order.payment_deadline_at ? new Date(order.payment_deadline_at) < new Date() : false;
  const receiptConfirmed = order.receipt_confirmed === true;
  const hasUnconfirmedReceipt = order.receipt && !order.receipt.confirmed;
  const canUploadReceipt = !isPaid && !deadlinePassed && !receiptConfirmed;
  const showConfirmStep = canUploadReceipt && hasUnconfirmedReceipt;

  return (
    <main className="mx-auto w-[min(840px,92vw)] space-y-6 py-12 pb-20">
      <FadeIn>
        <Button asChild variant="secondary" className="rounded-full">
          <Link href="/events">
            <ArrowLeft className="mr-2 size-4" /> Back to races
          </Link>
        </Button>
      </FadeIn>

      <FadeIn>
        <Card className={isPaid ? "border-emerald-500/35 bg-emerald-500/10" : "border-amber-500/35 bg-amber-500/10"}>
          <CardHeader>
            <div className="mb-2 inline-flex items-center gap-2">
              <Badge
                className={
                  isPaid
                    ? "rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                    : "rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-300"
                }
              >
                {isPaid ? "Paid" : "Awaiting payment"}
              </Badge>
              <span className="text-muted-foreground">Reference: {order.order_reference}</span>
            </div>
            <CardTitle className="font-display text-3xl uppercase tracking-tight">
              {order.event?.title ?? "Order"} {order.order_reference}
            </CardTitle>
            <CardDescription>
              {order.first_name} {order.last_name} • {order.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isPaid && (
              <div className="space-y-4">
                <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="font-medium text-amber-700 dark:text-amber-200">Payment required</p>
                      <p className="text-sm text-amber-700/90 dark:text-amber-200/90">
                        Complete your bank transfer and submit your payment receipt. Download the payment
                        instructions PDF or have it sent to your email before heading to the bank.
                      </p>
                    {order.payment_deadline_at && (
                      <p className="mt-2 text-sm">
                        {deadlinePassed ? (
                          <span className="text-destructive">Payment deadline has passed. Your reservation may have been cancelled.</span>
                        ) : (
                          <>Pay by <strong>{formatDate(order.payment_deadline_at)}</strong>. If payment is not received by then, your order will be cancelled.</>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="mb-2 text-sm font-medium text-amber-700 dark:text-amber-200">Payment instructions – take this to the bank</p>
                <p className="mb-3 text-xs text-amber-700/90 dark:text-amber-200/80">Download the PDF or have it sent by email. It contains the amount, reference and bank details for your transfer.</p>
                <div className="flex flex-wrap gap-2">
                  {order.payment_instructions_pdf_url ? (
                    <a
                      href={order.payment_instructions_pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-500/30 dark:text-amber-200"
                    >
                      <Download className="size-4" /> Download PDF
                    </a>
                  ) : (
                    <span className="text-xs text-amber-700/80 dark:text-amber-200/80">PDF will be available after loading.</span>
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
            </div>
            )}

            {receiptConfirmed && (
              <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" /> Receipt submitted and confirmed. Our team will review it shortly.
              </p>
            )}
            {showConfirmStep && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Confirm your receipt</p>
                <p className="text-sm text-muted-foreground">
                  You uploaded: <strong>{order.receipt?.filename ?? "file"}</strong>. Is this the correct file?
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="rounded-full"
                    onClick={handleConfirmReceipt}
                    disabled={confirming}
                  >
                    {confirming ? "Confirming..." : "Yes, confirm & submit"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full"
                    onClick={handleChooseDifferent}
                    disabled={removing}
                  >
                    {removing ? "Removing..." : "No, choose different file"}
                  </Button>
                </div>
              </div>
            )}
            {canUploadReceipt && !showConfirmStep && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Submit payment receipt</p>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      className="hidden"
                      onChange={handleReceiptUpload}
                      disabled={uploading}
                    />
                    <Button type="button" asChild className="rounded-full">
                      <span>
                        <Upload className="mr-2 size-4" /> {uploading ? "Uploading..." : "Choose file"}
                      </span>
                    </Button>
                  </label>
                  <span className="text-xs text-muted-foreground">JPEG, PNG or PDF, max 8MB</span>
                </div>
                {uploadError && (
                  <p className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="size-4" /> {uploadError}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl uppercase tracking-tight">Order details</CardTitle>
          </CardHeader>
          <CardContent>
            {order.order_items && order.order_items.length > 0 && (
              <div className="space-y-3">
                {order.order_items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {item.title} {item.quantity && item.quantity > 1 ? `× ${item.quantity}` : ""}
                    </span>
                    <span>{format((item.total ?? (item.unit_price ?? 0) * (item.quantity ?? 1))) }</span>
                  </div>
                ))}
              </div>
            )}
            {order.grand_total != null && (
              <div className="mt-4 flex justify-between border-t pt-4 font-display text-lg">
                <span>Total</span>
                <span>{format(order.grand_total)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn>
        <Button asChild variant="secondary" className="rounded-full">
          <Link href="/events">Browse more events</Link>
        </Button>
      </FadeIn>
    </main>
  );
}
