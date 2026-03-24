import { z } from "zod";

const API_BASE_URL =
  (typeof process.env.NEXT_PUBLIC_API_BASE_URL === "string" && process.env.NEXT_PUBLIC_API_BASE_URL.trim() !== "")
    ? process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
    : "/api/f1experiences";

const depositResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
});

export type DepositRequestPayload = {
  race_id: string;
  race_name: string;
  package_id: string;
  package_label: string;
  package_amount_label: string;
  quantity: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  corporate_group: boolean;
  travel_adviser: boolean;
  comments: string;
  privacy_accepted: boolean;
};

export async function submitDepositRequest(payload: DepositRequestPayload): Promise<{ ok: true } | { ok: false; message: string }> {
  const url = `${API_BASE_URL}/deposit-requests`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      privacy_accepted: payload.privacy_accepted ? true : false,
    }),
  });

  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return { ok: false, message: "Invalid response from server." };
  }

  const parsed = depositResponseSchema.safeParse(json);
  if (!parsed.success) {
    return { ok: false, message: "Unexpected response from server." };
  }

  if (!res.ok || parsed.data.status !== "success") {
    if (typeof json === "object" && json !== null && "errors" in json) {
      const errs = (json as { errors?: Record<string, string[]> }).errors;
      if (errs && typeof errs === "object") {
        const first = Object.values(errs).flat()[0];
        if (typeof first === "string") return { ok: false, message: first };
      }
    }
    const msg =
      typeof json === "object" && json !== null && "message" in json && typeof (json as { message: unknown }).message === "string"
        ? (json as { message: string }).message
        : "Request could not be sent.";
    return { ok: false, message: msg };
  }

  return { ok: true };
}
