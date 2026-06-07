import Link from "next/link";
import type { SiteData } from "@/lib/site";

export function Footer({ site }: { site: SiteData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-charcoal">
            Yo China
          </p>
          <p lang="hi" className="mt-1 font-hindi text-sm text-gold">
            {site.nameHindi}
          </p>
          <p className="mt-2 text-sm text-muted">
            © {year} Yo China Modinagar
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-muted">
          <Link href="#dishes" className="transition hover:text-chili">
            Dishes
          </Link>
          <Link
            href={site.googleMapsMenuUrl ?? site.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-chili"
          >
            Menu
          </Link>
          <Link href="#gallery" className="transition hover:text-chili">
            Interior
          </Link>
          <Link href="#reviews" className="transition hover:text-chili">
            Reviews
          </Link>
          <Link href="#visit" className="transition hover:text-chili">
            Visit
          </Link>
          <Link
            href={site.zomatoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-chili"
          >
            Zomato
          </Link>
          <Link
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-chili"
          >
            WhatsApp
          </Link>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-muted/80">
        Install from your browser for quick access · PWA ready
      </p>
    </footer>
  );
}
