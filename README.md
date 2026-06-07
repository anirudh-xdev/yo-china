# Yo China Modinagar

Elegant, modern PWA website for **Yo China Modinagar** (यो चाइना मोदीनगर) — Chinese fast food in Modinagar, UP.

## Features

- 3D-animated hero (React Three Fiber) with reduced-motion fallback
- GSAP scroll reveals and Framer Motion micro-interactions
- Google reviews carousel (curated from `data/reviews.json`)
- PWA installable with offline fallback
- JSON-LD Restaurant schema for local SEO

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Updating reviews

Google does not offer a free API for custom review UIs. Update reviews manually:

1. Open your [Google Maps listing](https://www.google.com/maps/search/?api=1&query=Yo+China+Modinagar+Lower+Bazar+Modinagar)
2. Copy new review text, author, rating, and date
3. Add an entry to `data/reviews.json` under `items`
4. Update `aggregate.total` and `distribution` if counts change

## Updating business info

Edit `data/site.json` for address, phone, hours, Zomato URL, and Google Maps links.

## PWA testing

1. Run `npm run build && npm start` (service worker is disabled in dev)
2. Open Chrome DevTools → Application → Manifest
3. Use "Install" or the in-app install prompt

Regenerate icons after logo changes:

```bash
node scripts/generate-icons.mjs
```

## Deploy

Deploy to [Vercel](https://vercel.com) — no environment variables required for v1.

Update `metadataBase` in `app/layout.tsx` and URLs in `app/sitemap.ts` / `lib/jsonld.ts` with your production domain.

## Replace placeholder assets

- `public/images/dishes/*.svg` — swap with real food photos
- `components/gallery/Gallery.tsx` — replace gradient placeholders
- `public/og-image.png` — regenerate after branding update
