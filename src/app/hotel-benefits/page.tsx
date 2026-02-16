import type { Metadata } from "next";

import { HotelBenefitsContent } from "@/components/hotel/hotel-benefits-content";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export const metadata: Metadata = {
  title: `Hotel & Circuit Transfers | ${APP_NAME}`,
  description:
    "Premium hotel rooms and convenient daily circuit transfers for F1® Grand Prix weekends. Book accommodation and transfers with your Official F1® Ticket Package.",
};

export default function HotelBenefitsPage() {
  return <HotelBenefitsContent />;
}
