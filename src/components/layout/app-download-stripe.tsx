import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/gb/app/official-f1-app/id835022598";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.softpauer.f1timingapp2014.basic&hl=en_GB";

export function AppDownloadStripe() {
  return (
    <div className="hidden bg-[#0d0d12] py-5 md:block">
      <div className="mx-auto flex w-[min(1220px,94vw)] flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
          Download the official F1® App
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 transition hover:opacity-100"
            aria-label="Download on the App Store"
          >
            <Image src="/images/app-store.svg" alt="" width={120} height={40} className="h-9 w-auto" />
          </Link>
          <Link
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 transition hover:opacity-100"
            aria-label="Get it on Google Play"
          >
            <Image src="/images/google-play.svg" alt="" width={135} height={40} className="h-9 w-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
