"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function getInitialDismissed() {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("pwa-install-dismissed"));
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(getInitialDismissed);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [dismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "1");
  };

  if (!visible || dismissed || !deferredPrompt) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
      role="dialog"
      aria-label="Install app"
    >
      <div className="surface-card flex items-center gap-4 rounded-2xl p-4 shadow-xl">
        <div className="flex-1">
          <p className="font-semibold text-charcoal">Install Yo China</p>
          <p className="text-xs text-muted">
            Add to home screen for quick ordering
          </p>
        </div>
        <Button size="sm" onClick={handleInstall} aria-label="Install app">
          <Download className="h-4 w-4" />
          Install
        </Button>
        <button
          onClick={handleDismiss}
          className="rounded-full p-2 text-muted hover:bg-surface-muted hover:text-charcoal"
          aria-label="Dismiss install prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
