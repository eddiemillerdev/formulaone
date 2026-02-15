import { Suspense } from "react";

import { CheckoutPage } from "@/components/checkout/checkout-page";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutPage />
    </Suspense>
  );
}
