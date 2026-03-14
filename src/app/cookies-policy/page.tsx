import type { Metadata } from "next";

import { CookiesPolicyContent } from "@/components/legal/cookies-policy-content";

export const metadata: Metadata = {
  title: "Cookies Policy | F1® Experiences",
  description: "How F1® Experiences uses cookies and similar technologies on this website.",
};

export default function CookiesPolicyPage() {
  return <CookiesPolicyContent />;
}
