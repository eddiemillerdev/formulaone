import { NextRequest, NextResponse } from "next/server";

/**
 * Same-origin proxy to Laravel (API_BASE_URL). Browser calls /api/f1experiences/… on this app;
 * this route server-fetches the backend — no CORS (unlike NEXT_PUBLIC_* direct API URLs).
 */
export const dynamic = "force-dynamic";

function upstreamBase(): string {
  return (process.env.API_BASE_URL || "https://dash.f1experiences.co.uk/api/public").replace(/\/$/, "");
}

async function proxy(request: NextRequest, pathSegments: string[] | undefined) {
  const subPath = pathSegments?.length ? pathSegments.join("/") : "";
  const base = upstreamBase();
  const targetUrl = `${base}/${subPath}${request.nextUrl.search}`;

  const headers = new Headers();
  const accept = request.headers.get("accept");
  if (accept) headers.set("Accept", accept);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  const authorization = request.headers.get("authorization");
  if (authorization) headers.set("Authorization", authorization);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "follow",
    cache: "no-store",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = await request.arrayBuffer();
  }

  try {
    const upstream = await fetch(targetUrl, init);

    const outHeaders = new Headers();
    const ct = upstream.headers.get("content-type");
    if (ct) outHeaders.set("Content-Type", ct);

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: outHeaders,
    });
  } catch (e) {
    console.error("API proxy error:", targetUrl, e);
    return NextResponse.json({ error: "Upstream request failed" }, { status: 502 });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
