"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TicketCategory } from "@/lib/api/events";
import type { AddOnSelection } from "@/lib/api/orders";

type BookingState = {
  eventId: string | null;
  ticketId: string | null;
  ticketCategory: TicketCategory | null;
  quantity: number;
  selectedAddOns: AddOnSelection[];
  setSelection: (input: {
    eventId: string;
    ticketId: string;
    ticketCategory: TicketCategory;
  }) => void;
  setQuantity: (value: number) => void;
  setSelectedAddOns: (value: AddOnSelection[]) => void;
  clearBooking: () => void;
};

const INITIAL_STATE = {
  eventId: null,
  ticketId: null,
  ticketCategory: null,
  quantity: 2,
  selectedAddOns: [],
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setSelection: ({ eventId, ticketId, ticketCategory }) =>
        set({ eventId, ticketId, ticketCategory, selectedAddOns: [] }),
      setQuantity: (value) =>
        set({ quantity: Math.max(1, Math.min(20, Number(value) || 1)) }),
      setSelectedAddOns: (value) => set({ selectedAddOns: value }),
      clearBooking: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "f1-pass-booking",
      partialize: (state) => ({
        eventId: state.eventId,
        ticketId: state.ticketId,
        ticketCategory: state.ticketCategory,
        quantity: state.quantity,
        selectedAddOns: state.selectedAddOns,
      }),
    },
  ),
);
