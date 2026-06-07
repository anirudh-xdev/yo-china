import type { SiteData } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export function getRestaurantJsonLd(site: SiteData) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${absoluteUrl("/")}#restaurant`,
    name: site.name,
    alternateName: site.nameHindi,
    description: site.tagline,
    image: [
      absoluteUrl("/og-image.png"),
      absoluteUrl(site.heroImage.src),
      absoluteUrl("/icons/icon-512.png"),
    ],
    logo: absoluteUrl("/icons/icon-512.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lower Bazar, near Modi Mandir, opp. Modi Bhawan",
      addressLocality: "Modinagar",
      addressRegion: "Uttar Pradesh",
      postalCode: "201204",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.googleMapsUrl,
    telephone: `+91${site.phone}`,
    priceRange: site.priceRange,
    servesCuisine: site.cuisine,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating,
      reviewCount: site.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "23:00",
    },
    url: absoluteUrl("/"),
    menu: site.googleMapsMenuUrl ?? site.googleMapsUrl,
    acceptsReservations: false,
    sameAs: [site.googleMapsUrl, site.zomatoUrl, site.whatsappUrl],
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.zomatoUrl,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: [
        "http://purl.org/goodrelations/v1#DeliveryModePickUp",
        "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      ],
    },
  };
}

export function getWebSiteJsonLd(site: SiteData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: site.name,
    alternateName: site.nameHindi,
    description: site.tagline,
    url: absoluteUrl("/"),
    inLanguage: "en-IN",
    publisher: {
      "@id": `${absoluteUrl("/")}#restaurant`,
    },
  };
}
