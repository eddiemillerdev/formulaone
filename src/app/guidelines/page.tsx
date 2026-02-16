import type { Metadata } from "next";

import { GuidelinesContent } from "@/components/legal/guidelines-content";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export const metadata: Metadata = {
  title: `Guidelines | ${APP_NAME}`,
  description: "Guidelines for the use of trade marks and intellectual property rights belonging to the Formula 1 companies.",
};

export default function GuidelinesPage() {
  return <GuidelinesContent />;
}
