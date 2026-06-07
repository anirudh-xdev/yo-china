import type { SiteData } from "@/lib/site";

export function getRestaurantJsonLd(site: SiteData) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    alternateName: site.nameHindi,
    description: site.tagline,
    image: "https://yochina-modinagar.vercel.app/og-image.png",
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
    url: "https://yochina-modinagar.vercel.app",
    sameAs: [site.googleMapsUrl, site.zomatoUrl],
  };
}
