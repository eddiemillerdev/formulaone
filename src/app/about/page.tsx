import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/about-page-content";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

export const metadata: Metadata = {
  title: `About Us | ${APP_NAME}`,
  description: `${APP_NAME} offers official F1 ticket packages to Grands Prix in the UK. Based in the UK, we help you get the most out of your Grand Prix weekend.`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
