import { Suspense } from "react";

import { EventsPage } from "@/components/events/events-page";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EventsPage />
    </Suspense>
  );
}
