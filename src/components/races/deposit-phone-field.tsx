"use client";

import { PhoneInput } from "@/components/ui/phone-input";

type Props = {
  id?: string;
  value: string;
  onPhoneChange: (value: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function DepositPhoneField({
  id,
  value,
  onPhoneChange,
  disabled = false,
  placeholder = "Phone number",
}: Props) {
  return (
    <div className="deposit-phone-field w-full min-w-0">
      <PhoneInput
        international
        defaultCountry="GB"
        value={value}
        onChange={onPhoneChange}
        disabled={disabled}
        placeholder={placeholder}
        numberInputProps={{
          id,
          name: "phone",
          required: true,
          autoComplete: "tel",
          "aria-label": placeholder,
        }}
      />
    </div>
  );
}
