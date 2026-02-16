import type { Metadata } from "next";

import { PrivacyPolicyContent } from "@/components/legal/privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy | F1 Pass",
  description: "How F1 Pass collects, uses and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
