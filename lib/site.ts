import siteData from "@/data/site.json";
import menuData from "@/data/menu.json";

export type SiteData = typeof siteData;
export type MenuData = typeof menuData;

export function getSite(): SiteData {
  return siteData;
}

export function getMenu(): MenuData {
  return menuData;
}

export function getOpenStatus(): { isOpen: boolean; label: string } {
  const now = new Date();
  const istOffset = 5.5 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + istOffset * 60000);
  const hour = ist.getHours();

  const { open, close } = siteData.hours;
  const isOpen = hour >= open && hour < close;

  if (isOpen) {
    return { isOpen: true, label: `Open until ${close > 12 ? close - 12 : close} PM` };
  }

  if (hour < open) {
    return { isOpen: false, label: "Opens soon · 11 AM" };
  }

  return { isOpen: false, label: "Closed · Opens 11 AM" };
}
