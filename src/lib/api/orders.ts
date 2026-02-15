import { z } from "zod";

// Proxy path; rewrite target comes from API_BASE_URL in next.config
const API_BASE_URL = "/api/f1experiences";

const ORDERS_API_URL = `${API_BASE_URL}/orders`;

const USE_MOCK_ORDER_SERVICE =
  (process.env.NEXT_PUBLIC_USE_MOCK_ORDER_SERVICE ?? "false").toLowerCase() === "true";

const nullableNumberSchema = z.preprocess((value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}, z.number().nullable());

const orderItemSchema = z.object({
  title: z.string().optional(),
  quantity: z.number().optional(),
  unit_price: z.number().optional(),
  total: z.number().optional(),
}).passthrough();

const orderDataSchema = z.object({
  order_reference: z.string(),
  order_url: z.string().nullable().optional(),
  payment_instructions_pdf_url: z.string().nullable().optional(),
  grand_total: nullableNumberSchema.optional(),
  is_payment_received: z.boolean().optional(),
  payment_deadline_at: z.string().nullable().optional(),
  has_pending_receipt: z.boolean().optional(),
  receipt_confirmed: z.boolean().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  receipt: z
    .object({
      confirmed: z.boolean(),
      filename: z.string().optional(),
      receipt_id: z.number().optional(),
      confirmed_at: z.string().optional(),
    })
    .nullable()
    .optional(),
  currency: z.object({ code: z.string(), symbol: z.string() }).optional(),
  event: z
    .object({
      title: z.string().optional(),
    })
    .passthrough()
    .optional(),
  order_items: z.array(orderItemSchema).optional(),
  attendees: z.array(z.unknown()).optional(),
}).passthrough();

const successResponseSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: orderDataSchema,
});

const errorResponseSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
  checkout_url: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type AddOnSelection = {
  addOnId: number;
  quantity: number;
  optionId?: number;
};

export type ReservationPayload = {
  eventId: string;
  ticketId: string;
  quantity: number;
  addOns?: AddOnSelection[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes?: string;
  };
  ticketHolders?: Array<{
    firstName: string;
    lastName: string;
    email: string;
  }>;
  payOffline?: boolean;
};

export type OrderData = z.infer<typeof orderDataSchema>;

export type ReservationResponse = {
  status: "success";
  reservationReference: string;
  orderUrl: string | null;
  message: string;
  grandTotal: number | null;
  data?: OrderData;
};

export class OrderApiError extends Error {
  statusCode?: number;
  checkoutUrl?: string;
  validationErrors?: Record<string, string[]>;

  constructor(input: {
    message: string;
    statusCode?: number;
    checkoutUrl?: string;
    validationErrors?: Record<string, string[]>;
  }) {
    super(input.message);
    this.name = "OrderApiError";
    this.statusCode = input.statusCode;
    this.checkoutUrl = input.checkoutUrl;
    this.validationErrors = input.validationErrors;
  }
}

export interface OrderService {
  submitReservation(payload: ReservationPayload): Promise<ReservationResponse>;
}

function buildTicketsPayload(payload: ReservationPayload) {
  const quantity = Math.max(1, Number(payload.quantity) || 1);
  const tickets: Array<{ ticket_id: number; quantity: number; add_ons?: Array<{ add_on_id: number; quantity: number; option_id?: number }> }> = [
    {
      ticket_id: Number(payload.ticketId),
      quantity,
      add_ons: payload.addOns?.map((a) => ({
        add_on_id: a.addOnId,
        quantity: a.quantity,
        option_id: a.optionId,
      })),
    },
  ];
  return tickets;
}

function buildTicketHolders(payload: ReservationPayload) {
  const quantity = Math.max(1, Number(payload.quantity) || 1);
  const holders = payload.ticketHolders?.slice(0, quantity) ?? [];

  while (holders.length < quantity) {
    holders.push({
      firstName: payload.customer.firstName,
      lastName: payload.customer.lastName,
      email: payload.customer.email,
    });
  }

  return holders.map((holder) => ({
    ticket_id: Number(payload.ticketId),
    first_name: holder.firstName,
    last_name: holder.lastName,
    email: holder.email,
  }));
}

function parseErrorPayload(raw: unknown) {
  const parsed = errorResponseSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Order could not be created. Please try again.",
      checkoutUrl: undefined,
      validationErrors: undefined,
    };
  }

  return {
    message: parsed.data.message,
    checkoutUrl: parsed.data.checkout_url,
    validationErrors: parsed.data.errors,
  };
}

const mockOrderService: OrderService = {
  async submitReservation(payload) {
    const reference = `F1-${Date.now().toString().slice(-8)}`;

    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem("f1-pass-reservation-log");
      const list = existing ? (JSON.parse(existing) as ReservationPayload[]) : [];
      list.unshift(payload);
      window.localStorage.setItem("f1-pass-reservation-log", JSON.stringify(list.slice(0, 30)));
    }

    await new Promise((resolve) => setTimeout(resolve, 650));

    return {
      status: "success",
      reservationReference: reference,
      orderUrl: null,
      grandTotal: null,
      message: "Reservation request received in mock mode.",
    };
  },
};

const liveOrderService: OrderService = {
  async submitReservation(payload) {
    const quantity = Math.max(1, Number(payload.quantity) || 1);

    const requestBody = {
      event_id: Number(payload.eventId),
      tickets: buildTicketsPayload(payload),
      order_first_name: payload.customer.firstName,
      order_last_name: payload.customer.lastName,
      order_email: payload.customer.email,
      ticket_holders: buildTicketHolders(payload),
      pay_offline: Boolean(payload.payOffline),
    };

    const response = await fetch(ORDERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const raw = await response
      .json()
      .catch(() => ({ status: "error", message: "Invalid server response" }));

    if (response.ok) {
      const parsed = successResponseSchema.safeParse(raw);
      if (!parsed.success) {
        throw new OrderApiError({
          message: "Order created but response payload was unexpected.",
          statusCode: response.status,
        });
      }

      return {
        status: "success",
        reservationReference: parsed.data.data.order_reference,
        orderUrl: parsed.data.data.order_url ?? null,
        grandTotal: parsed.data.data.grand_total ?? null,
        message: parsed.data.message,
        data: parsed.data.data,
      };
    }

    const parsedError = parseErrorPayload(raw);

    throw new OrderApiError({
      message: parsedError.message,
      statusCode: response.status,
      checkoutUrl: parsedError.checkoutUrl,
      validationErrors: parsedError.validationErrors,
    });
  },
};

export const ORDER_SERVICE_MODE = USE_MOCK_ORDER_SERVICE ? "mock" : "live";
export const ordersApi = {
  endpoint: ORDERS_API_URL,
};

export const orderService: OrderService = USE_MOCK_ORDER_SERVICE ? mockOrderService : liveOrderService;

const ORDERS_GET_URL = (ref: string) => `${ORDERS_API_URL.replace(/\/$/, "")}/${encodeURIComponent(ref)}`;
const ORDERS_RECEIPT_URL = (ref: string) => `${ORDERS_GET_URL(ref)}/receipt`;

export async function confirmReceipt(reference: string): Promise<{ status: string; message: string }> {
  const res = await fetch(`${ORDERS_RECEIPT_URL(reference)}/confirm`, { method: "POST" });
  const raw = await res.json().catch(() => ({}));
  if (res.ok && raw.status === "success") {
    return { status: "success", message: raw.message ?? "Receipt confirmed." };
  }
  return { status: "error", message: raw.message ?? "Failed to confirm." };
}

export async function sendPaymentInstructionsEmail(
  reference: string,
  sendTo: "me" | "attendees"
): Promise<{ status: string; message: string }> {
  const res = await fetch(`${ORDERS_GET_URL(reference)}/payment-instructions/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ send_to: sendTo }),
  });
  const raw = await res.json().catch(() => ({}));
  if (res.ok && raw.status === "success") {
    return { status: "success", message: raw.message ?? "Email sent." };
  }
  return { status: "error", message: raw.message ?? "Failed to send." };
}

export async function removeReceipt(reference: string): Promise<{ status: string; message: string }> {
  const res = await fetch(ORDERS_RECEIPT_URL(reference), { method: "DELETE" });
  const raw = await res.json().catch(() => ({}));
  if (res.ok && raw.status === "success") {
    return { status: "success", message: raw.message ?? "Receipt removed." };
  }
  return { status: "error", message: raw.message ?? "Failed to remove." };
}

export async function fetchOrderByReference(reference: string): Promise<{ data: OrderData } | null> {
  try {
    const res = await fetch(ORDERS_GET_URL(reference), { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const raw = await res.json();
    if (raw.data) {
      const parsed = orderDataSchema.safeParse(raw.data);
      if (parsed.success) return { data: parsed.data };
      return { data: raw.data };
    }
    return null;
  } catch {
    return null;
  }
}

export async function uploadReceipt(reference: string, file: File): Promise<{ status: string; message: string }> {
  const form = new FormData();
  form.append("receipt", file);
  const res = await fetch(ORDERS_RECEIPT_URL(reference), {
    method: "POST",
    body: form,
  });
  const raw = await res.json().catch(() => ({}));
  if (res.ok && raw.status === "success") {
    return { status: "success", message: raw.message ?? "Receipt uploaded." };
  }
  return { status: "error", message: raw.message ?? "Upload failed." };
}
