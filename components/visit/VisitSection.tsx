import Link from "next/link";
import { Clock, MapPin, Phone, Rainbow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/sections/SectionReveal";
import type { SiteData } from "@/lib/site";

export function VisitSection({
  site,
  openLabel,
}: {
  site: SiteData;
  openLabel: string;
}) {
  return (
    <SectionReveal id="visit" variant="muted" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl" data-reveal>
          <p className="section-label">Find us</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal">
            Visit us
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5" data-reveal>
            <div className="surface-card rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-chili" />
                <div>
                  <h3 className="font-semibold text-charcoal">Address</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {site.address}
                  </p>
                  <Button asChild variant="ghost" size="sm" className="mt-3 px-0">
                    <Link
                      href={site.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="surface-card rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <h3 className="font-semibold text-charcoal">Hours</h3>
                  <p className="mt-1 text-sm text-muted">
                    Daily · 11 AM – 11 PM
                  </p>
                  <p className="mt-1 text-sm font-medium text-chili">
                    {openLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <h3 className="font-semibold text-charcoal">Phone</h3>
                  <Link
                    href={`tel:+91${site.phone}`}
                    className="mt-1 block text-sm text-muted hover:text-chili"
                  >
                    {site.phoneDisplay}
                  </Link>
                </div>
              </div>
            </div>

            {site.lgbtqFriendly && (
              <Badge variant="sage" className="gap-2 px-4 py-2">
                <Rainbow className="h-4 w-4" />
                LGBTQ+ friendly
              </Badge>
            )}

            <div className="flex flex-wrap gap-2">
              {site.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div
            className="surface-card overflow-hidden rounded-3xl"
            data-reveal
          >
            <iframe
              title="Yo China Modinagar on Google Maps"
              src={site.googleMapsEmbed}
              className="h-[400px] w-full lg:h-full lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
