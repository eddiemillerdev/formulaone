import { GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Same-origin proxy for files stored in S3 (private buckets return 403 to the browser).
 * Set NEXT_PUBLIC_ASSET_BASE_URL=/api/public-assets so publicAssetUrl() points here.
 * Server needs: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET, AWS_S3_ENDPOINT (if not AWS).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeS3Endpoint(raw: string | undefined) {
  const s = raw?.trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s.replace(/\/$/, "");
  return `https://${s.replace(/\/$/, "")}`;
}

let client: S3Client | null = null;
function getS3(): S3Client {
  if (client) return client;
  const region = process.env.AWS_REGION?.trim() || "eu-west-1";
  const endpoint = normalizeS3Endpoint(process.env.AWS_S3_ENDPOINT);
  client = new S3Client({
    region,
    ...(endpoint ? { endpoint, forcePathStyle: true } : {}),
  });
  return client;
}

function objectKey(segments: string[] | undefined): string | null {
  if (!segments?.length) return null;
  const joined = segments.join("/");
  if (!joined || joined.includes("..")) return null;
  let prefix = process.env.AWS_S3_PREFIX?.trim() || "";
  if (prefix && !prefix.endsWith("/")) prefix += "/";
  return prefix + joined;
}

function toWebStream(body: unknown): ReadableStream<Uint8Array> {
  if (
    body &&
    typeof body === "object" &&
    "transformToWebStream" in body &&
    typeof (body as { transformToWebStream: () => unknown }).transformToWebStream === "function"
  ) {
    return (body as { transformToWebStream: () => ReadableStream<Uint8Array> }).transformToWebStream();
  }
  return Readable.toWeb(body as Readable) as ReadableStream<Uint8Array>;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const bucket = process.env.AWS_S3_BUCKET?.trim();
  const { path: segments } = await context.params;
  const Key = objectKey(segments);

  if (!bucket || !Key) {
    return new NextResponse("Not configured", { status: 503 });
  }

  const s3 = getS3();

  try {
    const out = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key,
      }),
    );

    const headers = new Headers();
    const ct = out.ContentType || "application/octet-stream";
    headers.set("Content-Type", ct);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    if (out.ETag) headers.set("ETag", out.ETag);

    const stream = out.Body ? toWebStream(out.Body) : null;
    if (!stream) {
      return new NextResponse(null, { status: 204 });
    }

    return new NextResponse(stream, { status: 200, headers });
  } catch (e: unknown) {
    const name = e && typeof e === "object" && "name" in e ? String((e as { name: string }).name) : "";
    if (name === "NoSuchKey" || name === "NotFound") {
      return new NextResponse("Not found", { status: 404 });
    }
    console.error("[public-assets]", Key, e);
    return new NextResponse("Object storage error", { status: 502 });
  }
}

export async function HEAD(
  _request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const bucket = process.env.AWS_S3_BUCKET?.trim();
  const { path: segments } = await context.params;
  const Key = objectKey(segments);

  if (!bucket || !Key) {
    return new NextResponse(null, { status: 503 });
  }

  const s3 = getS3();

  try {
    const out = await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key,
      }),
    );
    const headers = new Headers();
    headers.set("Content-Type", out.ContentType || "application/octet-stream");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    if (out.ContentLength != null) headers.set("Content-Length", String(out.ContentLength));
    if (out.ETag) headers.set("ETag", out.ETag);
    return new NextResponse(null, { status: 200, headers });
  } catch (e: unknown) {
    const name = e && typeof e === "object" && "name" in e ? String((e as { name: string }).name) : "";
    if (name === "NotFound" || name === "NoSuchKey") {
      return new NextResponse(null, { status: 404 });
    }
    console.error("[public-assets] HEAD", Key, e);
    return new NextResponse(null, { status: 502 });
  }
}
