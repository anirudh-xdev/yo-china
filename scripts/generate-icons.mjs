import sharp from "sharp";

function makeIcon(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#faf7f2"/>
  <circle cx="256" cy="220" r="90" fill="#c9a227" opacity="0.25"/>
  <circle cx="256" cy="220" r="70" fill="#f5d78e"/>
  <text x="256" y="400" text-anchor="middle" fill="#1c1917" font-family="Georgia, serif" font-size="72" font-weight="bold">YC</text>
</svg>`;
  return Buffer.from(svg);
}

function makeOg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#faf7f2"/>
  <circle cx="180" cy="120" r="280" fill="#fce8e4"/>
  <circle cx="1020" cy="520" r="220" fill="#e8f0e6"/>
  <text x="80" y="280" fill="#1c1917" font-family="Georgia, serif" font-size="96" font-weight="bold">Yo China</text>
  <text x="80" y="360" fill="#b91c3c" font-family="sans-serif" font-size="48">Modinagar</text>
  <text x="80" y="430" fill="#78716c" font-family="sans-serif" font-size="28">Kurkure Momos - Special Noodles - 4.0 stars</text>
</svg>`;
  return Buffer.from(svg);
}

await sharp(makeIcon(192)).png().toFile("public/icons/icon-192.png");
await sharp(makeIcon(512)).png().toFile("public/icons/icon-512.png");
await sharp(makeIcon(512)).png().toFile("public/icons/icon-maskable-512.png");
await sharp(makeOg()).resize(1200, 630).png().toFile("public/og-image.png");
console.log("Generated light-theme PWA icons and OG image");
