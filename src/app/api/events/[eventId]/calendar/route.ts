import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies the event calendar ICS from the backend so email links never point to the backend.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const eventId = (await params).eventId;
  if (!eventId || typeof eventId !== "string") {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  const apiBase = process.env.API_BASE_URL || "https://f1experiences.co.uk/api/public";
  const backendOrigin = new URL(apiBase).origin;
  const icsUrl = `${backendOrigin}/e/${encodeURIComponent(eventId)}/calendar.ics`;

  try {
    const res = await fetch(icsUrl, {
      headers: { Accept: "text/calendar, application/octet-stream" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not load calendar" },
        { status: res.status }
      );
    }

    const text = await res.text();

    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="event.ics"',
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (e) {
    console.error("Calendar ICS proxy error:", e);
    return NextResponse.json(
      { error: "Failed to fetch calendar" },
      { status: 502 }
    );
  }
}
