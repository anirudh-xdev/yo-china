import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <p className="section-label">You&apos;re offline</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-charcoal">
        Yo China
      </h1>
      <p className="mt-4 max-w-sm text-muted">
        Reconnect to browse the menu and order on Zomato.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Try again</Link>
      </Button>
    </div>
  );
}
