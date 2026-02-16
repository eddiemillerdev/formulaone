"use client";

import { useEffect, useState } from "react";
import { Smartphone, Share, Plus, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "pwa-install-prompt-dismissed";

type Platform = "ios" | "android" | null;

function usePwaInstallPrompt() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [dismissed, setDismissed] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<
    { prompt: () => Promise<{ outcome: string }> } | null
  >(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isMobile = isIOS || isAndroid || window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) return;
    if (!isIOS && !isAndroid) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return;
    } catch {
      /* ignore */
    }

    setDismissed(false);
    setPlatform(isIOS ? "ios" : "android");
  }, []);

  useEffect(() => {
    if (platform !== "android") return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt({
        prompt: () =>
          (e as unknown as { prompt: () => Promise<{ outcome: string }> }).prompt(),
      });
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [platform]);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
  };

  return {
    show: !dismissed && platform !== null,
    platform,
    deferredPrompt,
    dismiss,
    triggerInstall,
  };
}

export function PwaInstallPrompt() {
  const { show, platform, deferredPrompt, dismiss, triggerInstall } = usePwaInstallPrompt();

  if (!show || !platform) return null;

  const appName =
    typeof process.env.NEXT_PUBLIC_APP_NAME === "string"
      ? process.env.NEXT_PUBLIC_APP_NAME
      : "F1 Pass";

  return (
    <div
      className={cn(
        "fixed left-3 right-3 z-30 md:hidden",
        "bottom-[max(72px,calc(56px+env(safe-area-inset-bottom)))]"
      )}
      role="dialog"
      aria-label="Install app"
    >
      <Card className="border-border/90 bg-card/95 shadow-lg backdrop-blur-sm">
        <CardHeader className="relative pb-2 pt-4">
          <Button
            variant="ghost"
            size="icon-xs"
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            onClick={dismiss}
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Smartphone className="size-5" />
            </div>
            <CardTitle className="text-base">
              {platform === "ios" ? "Add to Home Screen" : "Install app"}
            </CardTitle>
          </div>
          <CardDescription className="text-sm">
            Get {appName} on your home screen for quick access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4 pt-0">
          {platform === "ios" && (
            <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                  1
                </span>
                <span>
                  Tap the <Share className="inline size-3.5" aria-hidden /> Share button at the
                  bottom of Safari.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                  2
                </span>
                <span>
                  Scroll and tap &ldquo;Add to Home Screen&rdquo;{" "}
                  <Plus className="inline size-3.5" aria-hidden />.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                  3
                </span>
                <span>Tap &ldquo;Add&rdquo; in the top right.</span>
              </li>
            </ol>
          )}

          {platform === "android" && (
            <>
              <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                    1
                  </span>
                  <span>
                    Tap the menu <MoreVertical className="inline size-3.5" aria-hidden /> (three
                    dots) in the top or bottom right of Chrome.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                    2
                  </span>
                  <span>Tap &ldquo;Install app&rdquo; or &ldquo;Add to Home screen&rdquo;.</span>
                </li>
              </ol>
              {deferredPrompt && (
                <Button
                  className="w-full"
                  onClick={triggerInstall}
                  size="sm"
                >
                  Install {appName}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
