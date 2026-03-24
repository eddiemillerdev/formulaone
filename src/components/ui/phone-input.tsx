"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import PhoneInputPrimitive from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import "react-phone-number-input/style.css";

type PhoneInputProps = Omit<React.ComponentProps<typeof PhoneInputPrimitive>, "onChange"> & {
  onChange?: (value: string | undefined) => void;
};

function PhoneInput({ className, onChange, value, ...props }: PhoneInputProps) {
  return (
    <PhoneInputPrimitive
      className={cn("flex w-full", className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      value={value || undefined}
      onChange={(v) => onChange?.(v)}
      {...props}
    />
  );
}

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn("h-11 rounded-e-xl rounded-s-none border-l-0 shadow-xs", className)}
      {...props}
      ref={ref}
    />
  ),
);
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: Country | undefined;
  options: CountryEntry[];
  onChange: (country: Country) => void;
};

function CountrySelect({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) {
  const scrollWrapRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedLabel = React.useMemo(
    () => countryList.find((o) => o.value === selectedCountry)?.label ?? selectedCountry ?? "",
    [countryList, selectedCountry],
  );

  const filtered = React.useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return countryList.filter((entry): entry is { label: string; value: Country } => {
      if (!entry.value) return false;
      if (!q) return true;
      const dial = `+${getCountryCallingCode(entry.value)}`;
      const hay = `${entry.label} ${entry.value} ${dial}`.toLowerCase();
      return hay.includes(q);
    });
  }, [countryList, searchValue]);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex h-11 shrink-0 gap-1 rounded-e-none rounded-s-xl border-r-0 px-3 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedLabel} />
          <ChevronsUpDown className={cn("-mr-1 size-4 opacity-50", disabled ? "hidden" : "opacity-100")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(100vw-2rem,22rem)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchValue}
            onValueChange={(next) => {
              setSearchValue(next);
              setTimeout(() => {
                const viewport = scrollWrapRef.current?.querySelector("[data-slot='scroll-area-viewport']");
                if (viewport instanceof HTMLElement) viewport.scrollTop = 0;
              }, 0);
            }}
            placeholder="Search country…"
          />
          <CommandList>
            <div ref={scrollWrapRef}>
              <ScrollArea className="h-72">
                <CommandGroup>
                  {filtered.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">No country found.</div>
                  ) : (
                    filtered.map(({ value, label }) => (
                      <CountrySelectOption
                        key={value}
                        country={value}
                        countryName={label}
                        selectedCountry={selectedCountry}
                        onChange={onChange}
                        onSelectComplete={() => setIsOpen(false)}
                      />
                    ))
                  )}
                </CommandGroup>
              </ScrollArea>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type CountrySelectOptionProps = {
  country: Country;
  countryName: string;
  selectedCountry: Country | undefined;
  onChange: (country: Country) => void;
  onSelectComplete: () => void;
};

function CountrySelectOption({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  const dial = `+${getCountryCallingCode(country)}`;

  return (
    <CommandItem className="gap-2" value={`${countryName} ${country} ${dial}`} onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="min-w-0 flex-1 truncate text-sm">{countryName}</span>
      <span className="text-sm text-muted-foreground">{dial}</span>
      <CheckIcon className={cn("ml-auto size-4 shrink-0", country === selectedCountry ? "opacity-100" : "opacity-0")} />
    </CommandItem>
  );
}

function FlagComponent({ country, countryName }: { country?: Country; countryName: string }) {
  if (!country) {
    return (
      <span className="flex h-5 w-7 items-center justify-center rounded-sm bg-muted text-[10px] text-muted-foreground">
        —
      </span>
    );
  }
  const Flag = flags[country];
  return (
    <span
      className="flex h-5 w-7 shrink-0 overflow-hidden rounded-sm bg-foreground/10 [&_svg:not([class*='size-'])]:size-full"
      title={countryName}
    >
      {Flag ? <Flag title={countryName} /> : null}
    </span>
  );
}

export { PhoneInput };
