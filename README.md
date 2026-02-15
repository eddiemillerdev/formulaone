# F1 Pass Web (Next.js)

Modern frontend foundation for the customer-facing Formula 1 ticket platform.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion
- TanStack Query
- Zustand
- Zod

## Public API Integration

This frontend now follows the **single organiser** flow by default.

### Event source (default)

- `GET /api/public/organiser`
- The app reads `data.events[]` (each event includes nested `tickets[]`).

### Order source (live mode)

- `POST /api/public/orders`
- Handles responses:
  - `201` success with `data.order_reference`
  - `402` payment-required with `checkout_url` redirect
  - `422` validation errors

## Environment variables

```bash
# Base for all public API calls
NEXT_PUBLIC_PUBLIC_API_BASE=https://your-domain.com/api/public

# Optional: explicit single-organiser endpoint override
NEXT_PUBLIC_ORGANISER_API_URL=https://your-domain.com/api/public/organiser

# Optional legacy fallback mode (if you still want /events)
NEXT_PUBLIC_EVENTS_API_URL=

# Optional explicit orders endpoint override
NEXT_PUBLIC_ORDERS_API_URL=https://your-domain.com/api/public/orders

# true = mock order adapter, false = real POST /orders (default false)
NEXT_PUBLIC_USE_MOCK_ORDER_SERVICE=false
```

## Order behavior notes

- Checkout submits one selected ticket type with quantity.
- Checkout now includes one `ticket_holders[]` form per ticket seat.
- Users can toggle “Copy buyer details to all ticket holders”.
- Flow now follows:
  - `organiser (single)` -> `races` -> `event/tickets` -> `order` -> `finish (success|error)`

## F1 Fonts

Place licensed font files here when available:

- `public/fonts/Formula1-Display-Regular.woff2`
- `public/fonts/Formula1-Text-Regular.woff2`

Fallback fonts are already wired (`Teko`, `Titillium Web`, `Barlow`).

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

Open `http://localhost:3000`.

## Routes

- `/` Home
- `/events` Events listing
- `/calendar` Big month calendar of all races
- `/teams` Teams placeholder page
- `/events/[eventId]` Event detail with package selection
- `/checkout?event=<id>&ticket=<id>` Checkout with order submission
- `/order/finish?status=success|error` Order finish status page
