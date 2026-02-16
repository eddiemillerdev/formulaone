import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "F1 Pass";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center gap-3", className)} aria-label={`${APP_NAME} – Home`}>
      <Image
        src="/images/logo-light.png"
        alt={APP_NAME}
        width={172}
        height={38}
        className="h-auto w-[148px] object-contain md:w-[172px]"
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </Link>
  );
}
