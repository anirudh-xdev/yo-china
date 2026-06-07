import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const iconSvg = readFileSync(join(root, "public/icons/icon.svg"));

async function renderIcon(size, { maskable = false } = {}) {
  if (!maskable) {
    return sharp(iconSvg).resize(size, size).png().toBuffer();
  }

  const inner = Math.round(size * 0.72);
  const inset = Math.round((size - inner) / 2);
  const icon = await sharp(iconSvg).resize(inner, inner).png().toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 250, g: 247, b: 242, alpha: 1 },
    },
  })
    .composite([{ input: icon, left: inset, top: inset }])
    .png()
    .toBuffer();
}

function ogOverlaySvg() {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1c1917" stop-opacity="0.82"/>
      <stop offset="55%" stop-color="#1c1917" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#1c1917" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="760" height="630" fill="url(#fade)"/>
  <text x="72" y="250" fill="#faf7f2" font-family="Georgia, serif" font-size="88" font-weight="700">Yo China</text>
  <text x="72" y="330" fill="#d4a853" font-family="Arial, sans-serif" font-size="46" font-weight="600">Modinagar</text>
  <text x="72" y="400" fill="#faf7f2" font-family="Arial, sans-serif" font-size="28" opacity="0.92">Kurkure Momos · Special Noodles · Dine-in &amp; Delivery</text>
  <text x="72" y="450" fill="#f5d78e" font-family="Arial, sans-serif" font-size="24" font-weight="600">4.0★ on Google · Lower Bazar, Modinagar</text>
</svg>`);
}

async function writePng(buffer, relativePath) {
  const path = join(root, relativePath);
  await sharp(buffer).toFile(path);
  console.log(`  ✓ ${relativePath}`);
}

async function main() {
  console.log("Generating Yo China favicons & social images…");

  const sizes = [
    ["public/icons/favicon-16x16.png", 16],
    ["public/icons/favicon-32x32.png", 32],
    ["public/icons/apple-touch-icon.png", 180],
    ["public/icons/icon-192.png", 192],
    ["public/icons/icon-512.png", 512],
  ];

  for (const [path, size] of sizes) {
    await writePng(await renderIcon(size), path);
  }

  await writePng(await renderIcon(512, { maskable: true }), "public/icons/icon-maskable-512.png");

  const favicon16 = await renderIcon(16);
  const favicon32 = await renderIcon(32);

  try {
    const { default: toIco } = await import("to-ico");
    writeFileSync(join(root, "public/favicon.ico"), await toIco([favicon16, favicon32]));
    console.log("  ✓ public/favicon.ico");
  } catch {
    await writePng(favicon32, "public/favicon.ico.png");
    console.log("  ✓ public/favicon.ico.png (install to-ico for .ico)");
  }

  const heroPath = join(root, "public/images/hero/kurkure.jpg");
  await sharp(heroPath)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([{ input: ogOverlaySvg(), top: 0, left: 0 }])
    .png()
    .toFile(join(root, "public/og-image.png"));
  console.log("  ✓ public/og-image.png");

  const appIcons = [
    ["app/favicon.ico", join(root, "public/favicon.ico")],
    ["app/icon.svg", join(root, "public/icons/icon.svg")],
    ["app/apple-icon.png", join(root, "public/icons/apple-touch-icon.png")],
  ];

  for (const [label, source] of appIcons) {
    writeFileSync(join(root, label), readFileSync(source));
    console.log(`  ✓ ${label}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
