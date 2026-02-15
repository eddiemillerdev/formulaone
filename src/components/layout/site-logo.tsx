import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center gap-3", className)} aria-label="F1 Pass – Home">
      <Image
        src="/images/logo-light.png"
        alt="F1 Pass"
        width={138}
        height={30}
        className="h-auto w-[122px] object-contain md:w-[138px]"
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </Link>
  );
}
