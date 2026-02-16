"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, MessageSquare } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FAQ_CATEGORIES = [
  { id: "general", label: "General" },
  { id: "basket", label: "Basket" },
  { id: "payment", label: "Payment" },
  { id: "e-tickets", label: "E-Tickets & mobile tickets" },
  { id: "shipping", label: "Shipping & pick up" },
] as const;

const FAQ_ITEMS = [
  // General
  { id: "purchase", category: "general" as const, question: "How can I purchase tickets?", answer: "We encourage you to book online on F1 Pass. The process is simple and takes only a few minutes: choose your race, select a ticket package, add to basket, enter guest details at checkout, and complete payment. You will receive an order confirmation by email." },
  { id: "genuine-tickets", category: "general" as const, question: "Where can I get genuine F1 tickets and avoid scams?", answer: "Genuine tickets and hospitality packages are available from the official Formula 1 ticket store, race promoters, and authorised agents such as F1 Pass. Be wary of unsolicited emails, heavily discounted offers, urgency tactics, or requests to pay by bank transfer or social media. Always use our secure checkout and never share card details outside the platform. Formula 1 cannot be held responsible for dealings with unauthorised vendors." },
  { id: "race-timetable", category: "general" as const, question: "Where can I find the race timetable?", answer: "You can find the race programme for each Grand Prix on the official Formula 1 website under the event page (Racing calendar). We also show event dates on our Calendar and Events pages so you can plan your booking." },
  { id: "event-dates", category: "general" as const, question: "When are event dates confirmed?", answer: "The FIA confirms the calendar ahead of each season, usually in December. You can purchase tickets for events that are open even if exact dates are still marked TBC (To Be Confirmed). You are purchasing for the event, not for specific dates—we will keep you informed of any changes." },
  { id: "availability", category: "general" as const, question: "How do I know if the tickets I want are still available?", answer: "If a ticket category is available, you can choose the quantity and add it to your basket. A sold-out message appears when tickets are no longer available. Contact our support team if you need more information." },
  { id: "grandstand-details", category: "general" as const, question: "How can I find out about a grandstand or seating area?", answer: "Click the details or info link next to the stand or package name on the event page. You can see package descriptions, and where available we show circuit maps so you can check locations." },
  { id: "special-seat", category: "general" as const, question: "Can I request a specific seat?", answer: "Selecting exact seats online is not possible. You can add seating preferences in the notes when placing your order, and we will do our best to pass these to the organiser. Final seat allocation is confirmed when tickets are issued, closer to the event." },
  { id: "adjoining-seats", category: "general" as const, question: "Will my tickets have adjoining seats?", answer: "Seat allocation is managed by the event promoter on a first-come, first-served basis. Tickets in the same order are seated together where possible, but this cannot be guaranteed. For multiple orders or specific seating requests, contact our support team—we will note your preference and forward it to the organiser where we can." },
  { id: "children-tickets", category: "general" as const, question: "Are tickets for children available?", answer: "Reduced-price tickets for children may be available for some events. Age restrictions can apply, and some categories have their own rules. Check the ticket description on the event page before purchasing, or contact us for the race you are interested in." },
  { id: "parking", category: "general" as const, question: "Are parking tickets available?", answer: "For some events, parking must be purchased in advance. When available, parking options appear in the event’s ticket shop. Contact our support team if you need help finding or adding parking to your booking." },
  { id: "wheelchair", category: "general" as const, question: "How do I know if a grandstand is wheelchair accessible?", answer: "Please contact our support team for information on accessible seating and tickets for disabled persons. We can direct you to the right package and advise on facilities at the circuit." },
  { id: "cancel-order", category: "general" as const, question: "Can I cancel my ticket order?", answer: "After you have confirmed your order, we cannot accept cancellations. For our cancellation and refund policy, please contact our support team or see our terms and conditions." },
  { id: "add-to-order", category: "general" as const, question: "Can I add tickets to my order after it has been processed?", answer: "Yes, if seats in your chosen section are still available. Contact us before placing an extra order so we can try to seat you together with your original tickets. We cannot guarantee availability, and any changes are subject to approval." },
  { id: "modify-order", category: "general" as const, question: "Can I modify my order?", answer: "Orders are generally not changeable once confirmed. If you have a request, contact our support team by email—we will let you know what is possible for your booking." },
  { id: "refund-no-attend", category: "general" as const, question: "Can I get a refund if I can't attend the race?", answer: "Tickets are generally non-refundable, as set out in our terms and conditions. We recommend reviewing your order carefully before completing the purchase." },
  { id: "refund-postponed", category: "general" as const, question: "Are F1 tickets refundable if the event is postponed or delayed?", answer: "If the event is officially postponed, delayed, or rescheduled by the circuit or organisers, we will contact all affected customers with the available options as soon as we have details. The options depend on what the event promoter offers; we will do our best to assist you through the process." },
  // Basket
  { id: "what-is-basket", category: "basket" as const, question: "What is a basket?", answer: "The basket stores the tickets you have selected before you go to checkout. You can view it, change quantities, or remove items. When you are ready, proceed to checkout to enter guest details and complete payment." },
  { id: "add-to-basket", category: "basket" as const, question: "How can I add tickets to my basket?", answer: "Find the tickets you want on the event page, choose the quantity (using the controls provided), and click Add to basket (or similar). The item will appear in your basket." },
  { id: "change-quantity", category: "basket" as const, question: "How can I change the number of tickets in my basket?", answer: "Open your basket (e.g. from the basket icon or link). Use the quantity controls to increase or decrease the number of tickets for each item, then continue to checkout when ready." },
  { id: "remove-from-basket", category: "basket" as const, question: "How can I remove items from my basket?", answer: "In the basket view, use the remove or delete option next to the item you want to remove. You can then add different tickets or proceed to checkout with the remaining items." },
  { id: "group-booking", category: "basket" as const, question: "How many tickets can I purchase at once? Can I make a group booking?", answer: "The maximum number of tickets per order depends on availability for that product. For large group bookings, please contact our support team—we will check availability and do our best to accommodate your request." },
  // Payment
  { id: "payment-types", category: "payment" as const, question: "What type of payment do you accept?", answer: "We accept credit and debit card payments online. For some events, bank transfer may be available—contact us by email with your order details and we can send an invoice if that option applies." },
  { id: "debit-cards", category: "payment" as const, question: "Do you accept debit cards?", answer: "Yes. If your debit card has a Mastercard or Visa logo, it can be used like a credit card for online payment at checkout." },
  { id: "payment-security", category: "payment" as const, question: "How safe is paying with my credit card?", answer: "Our payment platform is secure. Data is transmitted over an encrypted (SSL) connection so it cannot be read by third parties. Your card details are used only to process your order. If you prefer not to pay online, contact us—we may be able to arrange an alternative for your booking." },
  { id: "when-charged", category: "payment" as const, question: "When will my card be charged?", answer: "Your card is charged when your order is confirmed. The exact amount will be shown on the checkout page before you confirm." },
  { id: "bank-transfer", category: "payment" as const, question: "How can I pay by bank transfer?", answer: "Contact our support team by email or phone and request an invoice. We will need your event, ticket type, quantity, and billing details. Orders are confirmed once payment is received and verified. Not all events offer bank transfer; we will confirm if it is available for your booking." },
  { id: "bank-transfer-due", category: "payment" as const, question: "When must the bank transfer be paid?", answer: "Once your order is placed and we send you an invoice, the due date will be stated on the invoice. Payment must be received by that date to confirm your booking." },
  { id: "handling-fees", category: "payment" as const, question: "Why do you sometimes charge handling fees?", answer: "A handling or service fee may apply depending on the event. This helps cover our costs and the service we provide, and may be shown as a small percentage or fixed amount on the ticket price at checkout." },
  { id: "currency-difference", category: "payment" as const, question: "Why is there a difference between the ticket price shown and what I paid?", answer: "We may display prices in several currencies for information. The currency in which you are actually charged is shown on the checkout and payment page. Your card may also apply its own exchange rate if the charge is in a different currency." },
  { id: "payment-refused", category: "payment" as const, question: "My payment was refused. What should I do?", answer: "Try again and double-check card details and any typing errors. You can also try another card. If the problem continues, contact your bank—they may need to authorise the payment or adjust 3D Secure settings. Our support team can also help and may be able to offer an alternative such as bank transfer where available." },
  { id: "payment-error", category: "payment" as const, question: "My order is in a payment error status. Will I be charged? Can I try again?", answer: "If an order is in a payment error status, we cannot complete it. You will not be charged for that failed order. To purchase those tickets, please place a new order." },
  { id: "security-check", category: "payment" as const, question: "My order is in security check. What does that mean?", answer: "Our payment system has flagged something that needs verification. We may ask you to supply additional information. This step helps protect you from fraudulent use of your card. Follow the instructions we send and we will process your order once verified." },
  { id: "instalments", category: "payment" as const, question: "Can I pay in instalments or use a payment plan?", answer: "At the moment we do not offer payment plans or instalments for F1 tickets. Orders must be paid in full at the time of purchase." },
  // E-Tickets & mobile tickets
  { id: "f1-app-tickets", category: "e-tickets" as const, question: "Can I use the Official F1 Timing App to get my tickets?", answer: "No. The Official F1 Timing App cannot be used to obtain or access your tickets. Your tickets will be delivered or made available as described in your confirmation (e-ticket download, mobile ticket app, or physical delivery)." },
  { id: "what-is-eticket", category: "e-tickets" as const, question: "What is an e-ticket?", answer: "An e-ticket is an electronic version of a paper ticket. When e-tickets are used for your event, you will receive them by email or find them in your account, usually 5–7 days before the event. You can download and print them. The Official F1 Timing App has live timing and event info but does not hold your e-ticket." },
  { id: "what-is-mobile-ticket", category: "e-tickets" as const, question: "What is a mobile ticket?", answer: "A mobile ticket is a digital ticket accessed through a dedicated app. When your tickets are ready, we will email you with instructions and app details so you can access them on your phone." },
  { id: "how-obtain-tickets", category: "e-tickets" as const, question: "How will I obtain my tickets?", answer: "Delivery depends on the product and event organiser. Options may include: courier delivery (e.g. DHL), e-ticket download, mobile tickets via an app, or collection at or near the circuit. Your confirmation email will specify the method for your booking." },
  { id: "physical-instead-digital", category: "e-tickets" as const, question: "Can I have physical tickets instead of e-tickets or mobile tickets?", answer: "Unfortunately, when an event uses e-tickets or mobile tickets only, we cannot provide physical tickets instead. The delivery method is set by the organiser for that event." },
  { id: "eticket-vs-mobile", category: "e-tickets" as const, question: "What is the difference between e-tickets and mobile tickets?", answer: "E-tickets are digital tickets you download (e.g. from your account or a link we send) and can print. Mobile tickets are digital tickets that are accessed through a specific app; we will send details when they are ready." },
  { id: "when-etickets-ready", category: "e-tickets" as const, question: "When will I get my e-tickets or mobile tickets?", answer: "You typically get access 5–10 days before the event. We will email you when your e-tickets or mobile tickets are ready and how to access them." },
  { id: "know-tickets-ready", category: "e-tickets" as const, question: "How will I know when my e-tickets or mobile tickets are ready?", answer: "We will notify you by email. That email will include instructions on how to access and use your e-tickets or mobile tickets." },
  { id: "where-see-etickets", category: "e-tickets" as const, question: "Where can I see my e-tickets?", answer: "Your e-tickets will be available via the link or area we send you (e.g. in your account or a download link in the email). Use the download or view button to open or print them." },
  { id: "where-mobile-tickets", category: "e-tickets" as const, question: "Where will I find my mobile tickets?", answer: "Mobile tickets are delivered to the app specified in our email. Make sure the email address on your account is correct so you receive the instructions and can link the app to your booking." },
  { id: "transfer-ticket", category: "e-tickets" as const, question: "Can I transfer my ticket to someone else?", answer: "In many cases yes—you can share your e-ticket or mobile ticket with another person. Once it has been transferred, we may not be able to retrieve or reissue it. Transfer rules can vary by event; contact our support team to confirm for your booking." },
  { id: "print-eticket", category: "e-tickets" as const, question: "Can I print my e-tickets?", answer: "Yes. Once you have downloaded your e-tickets, you can print them and bring the printed copy to the circuit." },
  { id: "print-mobile", category: "e-tickets" as const, question: "Can I print my mobile tickets?", answer: "Unfortunately, mobile tickets are designed to be used from the app and typically cannot be printed. Please use the app at the circuit as instructed." },
  { id: "cant-see-tickets", category: "e-tickets" as const, question: "I can't see my e-tickets or mobile tickets. What can I do?", answer: "If you received the email saying your tickets are ready but you cannot view or access them, please contact our support team. We will help you resolve the issue." },
  // Shipping & pick up
  { id: "when-delivered", category: "shipping" as const, question: "When will my tickets be delivered?", answer: "Physical tickets are usually sent by courier (e.g. DHL) approximately 10 days to 3 weeks before the event. You will receive a tracking number once shipped so you can follow the delivery. E-ticket and mobile ticket availability is communicated by email (typically 5–10 days before the event)." },
  { id: "digital-instead-physical", category: "shipping" as const, question: "Can I have e-tickets or mobile tickets instead of physical tickets?", answer: "Unfortunately, when your booking is for physical tickets, we cannot switch it to e-tickets or mobile tickets. The delivery method is set per product and event." },
  { id: "change-delivery-address", category: "shipping" as const, question: "Can I provide a different delivery address?", answer: "If your tickets have not been sent yet, you may be able to update the delivery address. Contact us by email; the change will only be final once you receive written confirmation from us." },
  { id: "someone-present-delivery", category: "shipping" as const, question: "Does someone need to be present when the courier delivers?", answer: "Yes. Couriers typically deliver during daytime hours and may require a signature. Please use an address where you or someone you trust can be available to receive the package. We generally cannot deliver to temporary or short-term rental addresses (e.g. some Airbnb); provide an alternative if needed." },
  { id: "delivery-charge", category: "shipping" as const, question: "What is the delivery charge?", answer: "The delivery cost depends on your address and the delivery method. It is calculated and shown when you enter your country and delivery details on the checkout page." },
  { id: "collect-tickets", category: "shipping" as const, question: "How can I collect my tickets if my delivery method is pick-up?", answer: "For pick-up, you will receive an e-voucher by email when it is ready (usually 1–2 weeks before the event). Download it from the link we send, and bring it with your ID or passport to the collection point. The e-voucher will show the pick-up address and opening hours." },
  { id: "collect-at-circuit", category: "shipping" as const, question: "I want to collect my tickets at the circuit, but the option is not available.", answer: "Place your order as usual and then contact our support team. We can check whether your order can be changed to circuit collection and guide you through the process." },
  { id: "someone-else-collect", category: "shipping" as const, question: "Can someone else collect the tickets on my behalf?", answer: "Yes. Email our support team with the full name of the person who will collect. We will note it on the booking. That person must present the original e-voucher (or confirmation) and their own ID or passport at collection." },
  { id: "deliver-to-hotel", category: "shipping" as const, question: "Can I have my tickets delivered to my hotel or a different address?", answer: "Yes, you can use your hotel address for delivery. Ensure the hotel is aware of the delivery and can accept the package on your behalf. We generally cannot deliver to private short-term rentals (e.g. Airbnb); use an alternative address if necessary." },
  { id: "tickets-not-arrived", category: "shipping" as const, question: "What if my tickets don't arrive before I travel to the race?", answer: "Contact our support team as early as possible and tell us your travel or departure date. We will take the necessary steps to get your tickets to you in time or arrange an alternative (e.g. collection at the circuit) where we can." },
] as const;

type FaqCategoryId = (typeof FAQ_CATEGORIES)[number]["id"];

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>("general");

  return (
    <main className="mx-auto page-width space-y-10 py-10 pb-20">
      <FadeIn className="hero-panel-bg space-y-4 rounded-3xl border border-border/70 p-4 md:p-10">
        <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary">
          Help
        </Badge>
        <h1 className="font-display font-black text-2xl uppercase leading-[0.95] tracking-wide md:text-3xl md:tracking-wider">
          Frequently asked questions
        </h1>
        <p className="max-w-[65ch] text-sm text-muted-foreground md:text-base">
          Answers to common questions about booking, delivery, payments, and refunds. Can&apos;t find what you need?{" "}
          <Link href="/support" className="text-primary underline underline-offset-2 hover:no-underline">
            Contact support
          </Link>
          .
        </p>
      </FadeIn>

      <FadeIn delay={0.04}>
        <div className="w-full">
          <nav
            className="mb-6 flex flex-wrap gap-1 border-b border-border/70"
            aria-label="FAQ categories"
          >
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                aria-selected={activeCategory === cat.id}
                role="tab"
                className={cn(
                  "border-b-2 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wide transition-colors",
                  "text-muted-foreground hover:text-foreground",
                  "border-transparent -mb-px",
                  activeCategory === cat.id && "border-foreground text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </nav>
          {FAQ_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              role="tabpanel"
              aria-hidden={activeCategory !== cat.id}
              className={cn("mt-0", activeCategory !== cat.id && "hidden")}
            >
              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.filter((item) => item.category === cat.id).map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border-border/70">
                    <AccordionTrigger className="py-4 text-left font-display text-sm font-bold uppercase tracking-tight text-foreground hover:no-underline md:text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.06}>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <HelpCircle className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold uppercase tracking-tight text-foreground">Still have questions?</p>
                <p className="text-sm text-muted-foreground">We&apos;re here to help with bookings and orders.</p>
              </div>
            </div>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/support">
                <MessageSquare className="mr-2 size-4" /> Contact support
              </Link>
            </Button>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  );
}
