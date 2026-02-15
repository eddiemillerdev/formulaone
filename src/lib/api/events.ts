import { z } from "zod";

// Proxy path; rewrite target comes from API_BASE_URL in next.config
const API_BASE_URL = "/api/f1experiences";

const SINGLE_ORGANISER_API_URL = `${API_BASE_URL}/organiser`;

const LEGACY_EVENTS_API_URL = process.env.NEXT_PUBLIC_EVENTS_API_URL;

const numberSchema = z.preprocess((value) => {
  if (typeof value === "number") return value;
  return Number(value);
}, z.number());

const nullableNumberSchema = z.preprocess((value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}, z.number().nullable());

const apiOrganiserSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    email: z.string().nullable().optional(),
    logo_url: z.string().nullable().optional(),
    organiser_url: z.string().nullable().optional(),
  })
  .passthrough();

const apiAddOnOptionSchema = z.object({
  id: numberSchema,
  title: z.string(),
  price_modifier: numberSchema,
});

const apiAddOnSchema = z.object({
  id: numberSchema,
  title: z.string(),
  description: z.string().nullable().optional(),
  price: numberSchema,
  options: z.array(apiAddOnOptionSchema).optional(),
});

const apiTicketSchema = z.object({
  id: numberSchema,
  title: z.string(),
  description: z.string().nullable().optional(),
  price: numberSchema,
  is_sold_out: z.boolean(),
  quantity_available: nullableNumberSchema.optional(),
  quantity_remaining: nullableNumberSchema.optional(),
  quantity_sold: nullableNumberSchema.optional(),
  start_sale_date: z.string().nullable().optional(),
  end_sale_date: z.string().nullable().optional(),
  add_ons: z.array(apiAddOnSchema).optional(),
});

const apiCurrencySchema = z.object({
  code: z.string(),
  symbol: z.string(),
}).optional();

const apiEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  description_html: z.string().nullable().optional(),
  start_date: z.string(),
  end_date: z.string(),
  venue_name: z.string().nullable().optional(),
  venue_name_full: z.string().nullable().optional(),
  location_address: z.string().nullable().optional(),
  location_address_line_1: z.string().nullable().optional(),
  location_address_line_2: z.string().nullable().optional(),
  location_state: z.string().nullable().optional(),
  location_post_code: z.string().nullable().optional(),
  location_country: z.string().nullable().optional(),
  location_lat: z.string().nullable().optional(),
  location_long: z.string().nullable().optional(),
  event_url: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  venue_image_url: z.string().nullable().optional(),
  organiser: apiOrganiserSchema.nullable().optional(),
  tickets: z.array(apiTicketSchema),
  currency: apiCurrencySchema,
});

const apiOrganiserWithEventsSchema = apiOrganiserSchema.extend({
  events: z.array(apiEventSchema),
});

const singleOrganiserResponseSchema = z.object({
  data: apiOrganiserWithEventsSchema,
});

const legacyEventsResponseSchema = z.object({
  data: z.array(apiEventSchema),
  meta: z
    .object({
      current_page: z.number(),
      last_page: z.number(),
      per_page: z.number(),
      total: z.number(),
    })
    .passthrough()
    .optional(),
});

export type TicketCategory = "grandstand" | "vip" | "paddock";

export type OrganiserInfo = {
  id: string;
  name: string;
  email: string | null;
  logoUrl: string;
  organiserUrl: string;
};

export type TicketAddOnOption = {
  id: number;
  title: string;
  priceModifier: number;
};

export type TicketAddOn = {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  options?: TicketAddOnOption[];
};

export type TicketPackage = {
  id: string;
  title: string;
  descriptionPlain: string;
  descriptionPreview: string;
  descriptionMarkdown: string;
  price: number;
  isSoldOut: boolean;
  isUnlimited: boolean;
  quantityRemaining: number | null;
  startSaleDate: string | null;
  endSaleDate: string | null;
  category: TicketCategory;
  addOns?: TicketAddOn[];
};

export type EventItem = {
  id: string;
  name: string;
  city: string;
  country: string;
  zone: string;
  venue: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  monthLabel: string;
  description: string;
  imageUrl: string;
  venueImageUrl: string;
  eventUrl: string;
  organiser: OrganiserInfo;
  tickets: TicketPackage[];
  ticketCount: number;
  fromPrice: number;
  currency?: { code: string; symbol: string };
};

const REGION_BY_COUNTRY: Record<string, string> = {
  australia: "Oceania",
  usa: "Americas",
  "united states": "Americas",
  mexico: "Americas",
  brazil: "Americas",
  canada: "Americas",
  monaco: "Europe",
  italy: "Europe",
  spain: "Europe",
  france: "Europe",
  "united kingdom": "Europe",
  netherlands: "Europe",
  belgium: "Europe",
  hungary: "Europe",
  austria: "Europe",
  azerbaijan: "Europe",
  singapore: "Asia",
  japan: "Asia",
  china: "Asia",
  qatar: "Middle East",
  bahrain: "Middle East",
  "saudi arabia": "Middle East",
  uae: "Middle East",
  "united arab emirates": "Middle East",
};

const DEFAULT_ORGANISER: OrganiserInfo = {
  id: "",
  name: "Formula One Digital Media Limited",
  email: null,
  logoUrl: "",
  organiserUrl: "",
};

export function formatMoney(amount: number, currencyCode?: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode ?? "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBA";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Dates TBA";
  }

  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(start);
  const startDay = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: "UTC",
  }).format(start);
  const endDay = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: "UTC",
  }).format(end);
  const year = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: "UTC",
  }).format(start);

  return `${month} ${startDay}-${endDay}, ${year}`;
}

function stripHtml(value: string | null | undefined) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdown(value: string | null | undefined) {
  if (!value) return "";
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value: string, limit = 190) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1).trimEnd()}...`;
}

function extractMarkdownPreview(markdown: string) {
  if (!markdown) return "";

  const lines = markdown.split(/\r?\n/);
  const paragraphs: string[] = [];
  let current: string[] = [];

  const flush = () => {
    if (!current.length) return;
    const text = stripMarkdown(current.join(" ").trim());
    if (text) paragraphs.push(text);
    current = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }

    if (
      /^#{1,6}\s/.test(line) ||
      /^(-|\*|\+)\s/.test(line) ||
      /^\d+\.\s/.test(line) ||
      /^>\s?/.test(line) ||
      /^---+$/.test(line) ||
      /^```/.test(line) ||
      /^\*.+\*$/.test(line)
    ) {
      flush();
      continue;
    }

    current.push(line);
  }

  flush();

  const firstReadable = paragraphs.find((text) => text.length > 35) || paragraphs[0] || "";
  return truncateText(firstReadable, 200);
}

function inferCountry(event: z.infer<typeof apiEventSchema>) {
  const explicit = event.location_country?.trim();
  if (explicit) return explicit;

  const title = event.title.toLowerCase();
  if (title.includes("australian")) return "Australia";
  if (title.includes("monaco")) return "Monaco";
  if (title.includes("singapore")) return "Singapore";
  if (title.includes("qatar")) return "Qatar";
  if (title.includes("miami") || title.includes("las vegas") || title.includes("united states")) {
    return "USA";
  }

  return "Global";
}

function inferZone(country: string) {
  return REGION_BY_COUNTRY[country.toLowerCase()] ?? "Global";
}

function detectCategory(title: string): TicketCategory {
  const value = title.toLowerCase();
  if (value.includes("paddock")) return "paddock";
  if (value.includes("grandstand") || value.includes("general admission")) {
    return "grandstand";
  }
  return "vip";
}

function normalizeOrganiser(
  organiser: z.infer<typeof apiOrganiserSchema> | null | undefined,
): OrganiserInfo {
  if (!organiser) return DEFAULT_ORGANISER;

  return {
    id: String(organiser.id),
    name: organiser.name || DEFAULT_ORGANISER.name,
    email: organiser.email ?? null,
    logoUrl: organiser.logo_url ?? "",
    organiserUrl: organiser.organiser_url ?? "",
  };
}

function normalizeTicket(ticket: z.infer<typeof apiTicketSchema>): TicketPackage {
  const quantityAvailable = ticket.quantity_available;
  const quantityRemainingRaw = ticket.quantity_remaining;
  const isUnlimited = quantityAvailable == null && quantityRemainingRaw == null;
  const descriptionMarkdown = ticket.description?.trim() ?? "";
  const descriptionPlain = stripMarkdown(descriptionMarkdown);
  const descriptionPreview = extractMarkdownPreview(descriptionMarkdown) || truncateText(descriptionPlain, 200);

  const addOns: TicketAddOn[] | undefined = ticket.add_ons?.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    price: Number(a.price || 0),
    options: a.options?.map((o) => ({
      id: o.id,
      title: o.title,
      priceModifier: Number(o.price_modifier || 0),
    })),
  }));

  return {
    id: String(ticket.id),
    title: ticket.title,
    descriptionPlain,
    descriptionPreview,
    descriptionMarkdown,
    price: Number(ticket.price || 0),
    isSoldOut: Boolean(ticket.is_sold_out),
    isUnlimited,
    quantityRemaining: isUnlimited ? null : Number(quantityRemainingRaw ?? quantityAvailable ?? 0),
    startSaleDate: ticket.start_sale_date ?? null,
    endSaleDate: ticket.end_sale_date ?? null,
    category: detectCategory(ticket.title),
    addOns: addOns?.length ? addOns : undefined,
  };
}

function toMonthLabel(startDate: string) {
  const parsed = new Date(startDate);
  if (Number.isNaN(parsed.getTime())) return "TBA";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(parsed);
}

function normalizeEvent(
  event: z.infer<typeof apiEventSchema>,
  organiserFallback: z.infer<typeof apiOrganiserSchema> | null = null,
): EventItem {
  const country = inferCountry(event);
  const zone = inferZone(country);

  const tickets = event.tickets.map(normalizeTicket).sort((a, b) => a.price - b.price);

  const activeTickets = tickets.filter(
    (ticket) => !ticket.isSoldOut && (ticket.isUnlimited || (ticket.quantityRemaining ?? 0) > 0),
  );
  const fromPrice = activeTickets[0]?.price ?? tickets[0]?.price ?? 0;

  const currency = event.currency ? { code: event.currency.code, symbol: event.currency.symbol } : undefined;

  const description = stripHtml(event.description || event.description_html);
  const organiser = normalizeOrganiser(event.organiser ?? organiserFallback);

  return {
    id: String(event.id),
    name: event.title,
    city:
      event.location_state?.trim() ||
      event.location_address_line_2?.trim() ||
      event.location_address_line_1?.trim() ||
      "TBA",
    country,
    zone,
    venue: event.venue_name?.trim() || event.venue_name_full?.trim() || "Circuit TBA",
    startDate: event.start_date,
    endDate: event.end_date,
    dateLabel: formatDateRange(event.start_date, event.end_date),
    monthLabel: toMonthLabel(event.start_date),
    description,
    imageUrl: event.image_url || "",
    venueImageUrl: event.venue_image_url || "",
    eventUrl: event.event_url || "",
    organiser,
    tickets,
    currency,
    ticketCount: tickets.length,
    fromPrice,
  };
}

async function fetchFromSingleOrganiser(): Promise<EventItem[]> {
  const response = await fetch(SINGLE_ORGANISER_API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Single organiser API request failed (${response.status})`);
  }

  const payload = await response.json();
  const parsed = singleOrganiserResponseSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("Single organiser payload does not match expected schema.");
  }

  const organiser = parsed.data.data;

  return organiser.events
    .map((event) => normalizeEvent(event, organiser))
    .sort((left, right) => new Date(left.startDate).getTime() - new Date(right.startDate).getTime());
}

async function fetchFromLegacyEvents(url: string): Promise<EventItem[]> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Events API request failed (${response.status})`);
  }

  const payload = await response.json();
  const parsed = legacyEventsResponseSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("Events API payload does not match expected schema.");
  }

  return parsed.data.data
    .map((event) => normalizeEvent(event))
    .sort((left, right) => new Date(left.startDate).getTime() - new Date(right.startDate).getTime());
}

export async function fetchEvents(): Promise<EventItem[]> {
  if (LEGACY_EVENTS_API_URL) {
    return fetchFromLegacyEvents(LEGACY_EVENTS_API_URL);
  }

  return fetchFromSingleOrganiser();
}

export function getEventById(events: EventItem[], eventId: string | null | undefined) {
  if (!eventId) return null;
  return events.find((event) => event.id === eventId) ?? null;
}

export function getTicketById(
  event: EventItem | null | undefined,
  ticketId: string | null | undefined,
) {
  if (!event || !ticketId) return null;
  return event.tickets.find((ticket) => ticket.id === ticketId) ?? null;
}

export const eventsApi = {
  endpoint: LEGACY_EVENTS_API_URL ?? SINGLE_ORGANISER_API_URL,
  mode: LEGACY_EVENTS_API_URL ? "legacy-events" : "single-organiser",
  fetchEvents,
};
