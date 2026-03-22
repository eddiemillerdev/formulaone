"use client";

/**
 * Package picker using the shadcn/Radix pattern from the docs:
 * DropdownMenuTrigger + asChild + Button (https://ui.shadcn.com/docs/components/button)
 * DropdownMenu (https://ui.shadcn.com/docs/components/dropdown-menu)
 */
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TicketPackage } from "@/lib/api/events";
import { formatMoney } from "@/lib/api/events";
import { cn } from "@/lib/utils";

type PackageBookingPickerProps = {
  tickets: TicketPackage[];
  currencyCode?: string;
  value: string | null;
  onChange: (packageId: string | null) => void;
};

function packageSoldOut(ticket: TicketPackage): boolean {
  return ticket.isSoldOut || (!ticket.isUnlimited && (ticket.quantityRemaining ?? 0) <= 0);
}

export function PackageBookingPicker({
  tickets,
  currencyCode,
  value,
  onChange,
}: PackageBookingPickerProps) {
  const selected = tickets.find((t) => t.id === value) ?? null;

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "min-h-12 w-full max-w-full justify-between gap-2 rounded-xl border bg-background px-3 py-2 text-left font-normal shadow-xs",
            "hover:bg-background data-[state=open]:ring-2 data-[state=open]:ring-ring/40",
          )}
        >
          <span className="min-w-0 flex-1 overflow-hidden text-left leading-tight">
            {selected ? (
              <>
                <span className="line-clamp-2 block break-words text-sm font-medium text-foreground">
                  {selected.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {formatMoney(selected.price, currencyCode)}
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Choose package</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        sideOffset={6}
        className={cn(
          "max-h-[min(60vh,28rem)] w-[min(420px,calc(100vw-2rem))] overflow-y-auto p-2",
          "data-[side=bottom]:slide-in-from-top-2",
        )}
      >
        <DropdownMenuLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Packages
        </DropdownMenuLabel>
        <p className="px-2 pb-2 text-sm text-muted-foreground">Select one to continue</p>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value ?? ""}
          onValueChange={(id) => {
            if (id) onChange(id);
          }}
        >
          {tickets.map((ticket) => {
            const soldOut = packageSoldOut(ticket);
            return (
              <DropdownMenuRadioItem
                key={ticket.id}
                value={ticket.id}
                disabled={soldOut}
                className={cn(
                  "!cursor-pointer items-start whitespace-normal py-2.5 pl-8 pr-2",
                  soldOut && "opacity-50",
                )}
              >
                <span className="flex min-w-0 flex-col gap-0.5 text-left">
                  <span className="text-sm font-semibold leading-snug">{ticket.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatMoney(ticket.price, currencyCode)}
                    {soldOut ? " · Sold out" : ""}
                  </span>
                </span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
