import { Suspense } from "react";
import { OrderViewPage } from "@/components/checkout/order-view-page";

export default async function Page({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  return (
    <Suspense fallback={null}>
      <OrderViewPage reference={reference} />
    </Suspense>
  );
}
