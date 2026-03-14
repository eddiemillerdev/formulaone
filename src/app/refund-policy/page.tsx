import type { Metadata } from "next";

import { RefundPolicyContent } from "@/components/legal/refund-policy-content";

export const metadata: Metadata = {
  title: "Refund Policy | F1® Experiences",
  description: "Refund and cancellation policy for F1® Experiences ticket and hospitality bookings.",
};

export default function RefundPolicyPage() {
  return <RefundPolicyContent />;
}
