import parsePhoneNumberFromString from "libphonenumber-js/min";

/** Parse E.164 from react-phone-number-input into API fields (national digits only in phone_number). */
export function splitPhoneForDepositApi(e164: string): {
  phone_country_code: string;
  phone_number: string;
  isValid: boolean;
} {
  const s = (e164 ?? "").trim();
  if (!s) {
    return { phone_country_code: "", phone_number: "", isValid: false };
  }
  const parsed = parsePhoneNumberFromString(s);
  if (!parsed) {
    return { phone_country_code: "", phone_number: "", isValid: false };
  }
  return {
    phone_country_code: `+${parsed.countryCallingCode}`,
    phone_number: parsed.nationalNumber,
    isValid: parsed.isValid(),
  };
}
