import type { Metadata } from "next";

import { TermsContent } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms of Use | F1® Experiences",
  description: "Terms and conditions for using F1® Experiences and purchasing F1® ticket packages.",
};

export default function TermsPage() {
  return <TermsContent />;
}
