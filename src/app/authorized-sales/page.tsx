import type { Metadata } from "next";

import { AuthorizedSalesContent } from "@/components/legal/authorized-sales-content";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export const metadata: Metadata = {
  title: `Authorised Sales Agents | ${APP_NAME}`,
  description:
    `${APP_NAME} Authorised Sales Agents in the UK. Purchase Official F1® Ticket Packages with confidence from an agent near you.`,
};

export default function AuthorizedSalesPage() {
  return <AuthorizedSalesContent />;
}
