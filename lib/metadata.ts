import type { Metadata } from "next";
import { getSite } from "@/lib/site";
import { absoluteUrl, SITE_URL } from "@/lib/site-url";

export function getSiteMetadata(): Metadata {
  const site = getSite();
  const title = `${site.name} | Chinese Fast Food, Momos & Noodles`;
  const description = `Order kurkure momos, hakka noodles & Chinese fast food at ${site.name}, Lower Bazar Modinagar. ${site.rating}★ from ${site.reviewCount}+ Google reviews. Dine-in, takeaway & delivery. Call ${site.phoneDisplay}.`;

  const keywords = [
    "Yo China Modinagar",
    "Yo China restaurant Modinagar",
    "Chinese food Modinagar",
    "momos Modinagar",
    "kurkure momos Modinagar",
    "noodles Modinagar",
    "hakka noodles Modinagar",
    "Chinese restaurant near Modi Mandir",
    "fast food Lower Bazar Modinagar",
    "best momos Modinagar",
    "Yo China menu",
    "Chinese takeaway Modinagar",
    "Yo China Zomato",
    "restaurant Modinagar Uttar Pradesh",
  ];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description,
    keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    publisher: site.name,
    category: "food",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: SITE_URL,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: absoluteUrl("/og-image.png"),
          width: 1200,
          height: 630,
          alt: `${site.name} — kurkure momos and Chinese fast food in Modinagar`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.png")],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Yo China",
    },
    formatDetection: {
      telephone: true,
      email: false,
      address: true,
    },
    manifest: "/manifest.webmanifest",
    other: {
      "geo.region": "IN-UP",
      "geo.placename": "Modinagar",
      "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
      ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
    },
  };
}
