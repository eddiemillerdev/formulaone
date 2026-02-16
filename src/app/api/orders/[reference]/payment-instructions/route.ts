import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies the payment instructions PDF from the backend and forces download.
 * The client never hits the backend URL directly.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  const reference = (await params).reference;
  if (!reference || typeof reference !== "string") {
    return NextResponse.json({ error: "Missing order reference" }, { status: 400 });
  }

  const apiBase = process.env.API_BASE_URL || "https://f1experiences.co.uk/api/public";
  const backendOrigin = new URL(apiBase).origin;
  const pdfUrl = `${backendOrigin}/order/${encodeURIComponent(reference)}/payment-instructions.pdf`;

  try {
    const res = await fetch(pdfUrl, {
      headers: { Accept: "application/pdf" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not load payment instructions" },
        { status: res.status }
      );
    }

    const blob = await res.arrayBuffer();
    const filename = `Payment-Instructions-${reference}.pdf`;

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (e) {
    console.error("Payment instructions proxy error:", e);
    return NextResponse.json(
      { error: "Failed to fetch payment instructions" },
      { status: 502 }
    );
  }
}
