import { Suspense } from "react";

import { EventDetailPage } from "@/components/events/event-detail-page";

type EventDetailRouteProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export default async function Page({ params }: EventDetailRouteProps) {
  const resolved = await params;
  return (
    <Suspense fallback={null}>
      <EventDetailPage eventId={resolved.eventId} />
    </Suspense>
  );
}
