import type { Metadata } from "next";

import { LegalNoticesContent } from "@/components/legal/legal-notices-content";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export const metadata: Metadata = {
  title: `Legal Notices | ${APP_NAME}`,
  description:
    "Legal notices, terms and conditions for use of this site. Operator information, intellectual property, disclaimer, limitation of liability and contact details.",
};

export default function LegalNoticesPage() {
  return <LegalNoticesContent />;
}
