import type { Metadata } from "next";

import { FaqPage } from "@/components/faq/faq-page";

export const metadata: Metadata = {
  title: "FAQ | F1 Pass",
  description:
    "Frequently asked questions about F1 Pass: booking, ticket delivery, payments, refunds, and support.",
};

export default function Faq() {
  return <FaqPage />;
}
