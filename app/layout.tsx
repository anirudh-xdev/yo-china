import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Fraunces, Outfit, Noto_Sans_Devanagari } from "next/font/google";
import { getSite } from "@/lib/site";
import { getRestaurantJsonLd, getWebSiteJsonLd } from "@/lib/jsonld";
import { getSiteMetadata } from "@/lib/metadata";
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

export const metadata = getSiteMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#faf7f2" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();
  const restaurantJsonLd = getRestaurantJsonLd(site);
  const webSiteJsonLd = getWebSiteJsonLd(site);

  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${hindi.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([restaurantJsonLd, webSiteJsonLd]),
          }}
        />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
