import siteData from "@/data/site.json";

function normalizeSiteUrl(url?: string): string | undefined {
  const trimmed = url?.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/\/$/, "");
}

function getDefaultSiteUrl(): string {
  const fromEnv = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv) return fromEnv;

  const vercelHost = normalizeSiteUrl(process.env.VERCEL_URL);
  if (vercelHost) return `https://${vercelHost}`;

  return siteData.siteUrl.replace(/\/$/, "");
}

export const SITE_URL = getDefaultSiteUrl();

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
