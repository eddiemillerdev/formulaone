import type { Metadata } from "next";

import { RefundPolicyContent } from "@/components/legal/refund-policy-content";

export const metadata: Metadata = {
  title: "Refund Policy | F1 Pass",
  description: "Refund and cancellation policy for F1 Pass ticket and hospitality bookings.",
};

export default function RefundPolicyPage() {
  return <RefundPolicyContent />;
}
