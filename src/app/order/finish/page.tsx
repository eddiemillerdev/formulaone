import { Suspense } from "react";

import { OrderFinishPage } from "@/components/checkout/order-finish-page";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderFinishPage />
    </Suspense>
  );
}
