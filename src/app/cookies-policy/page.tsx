import type { Metadata } from "next";

import { CookiesPolicyContent } from "@/components/legal/cookies-policy-content";

export const metadata: Metadata = {
  title: "Cookies Policy | F1 Pass",
  description: "How F1 Pass uses cookies and similar technologies on this website.",
};

export default function CookiesPolicyPage() {
  return <CookiesPolicyContent />;
}
