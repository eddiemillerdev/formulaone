import type { Metadata } from "next";

import { CorporatePackagesContent } from "@/components/corporate/corporate-packages-content";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export const metadata: Metadata = {
  title: `Corporate Packages | ${APP_NAME}`,
  description: "F1 corporate hospitality and VIP experiences for organisations at Grand Prix circuits in the UK.",
};

export default function CorporatePackagesPage() {
  return <CorporatePackagesContent />;
}
