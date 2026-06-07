import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit, Noto_Sans_Devanagari } from "next/font/google";
import { getSite } from "@/lib/site";
import { getRestaurantJsonLd } from "@/lib/jsonld";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const hindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "500"],
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL("https://yochina-modinagar.vercel.app"),
  title: {
    default: `${site.name} | Chinese Fast Food`,
    template: `%s | ${site.name}`,
  },
  description: `${site.tagline}. Kurkure momos, noodles & Chinese fast food in Modinagar. Dine-in, takeaway & delivery. ${site.rating}★ from ${site.reviewCount} Google reviews.`,
  keywords: [
    "Yo China Modinagar",
    "Chinese food Modinagar",
    "momos Modinagar",
    "kurkure momos",
    "noodles Modinagar",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.nameHindi}`,
    description: site.tagline,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yo China",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getRestaurantJsonLd(site);

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hindi.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
