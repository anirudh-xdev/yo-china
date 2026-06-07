import { HomePage } from "@/components/home/HomePage";
import { getSite, getMenu, getOpenStatus } from "@/lib/site";
import { getReviews } from "@/lib/reviews";

export default function Page() {
  const site = getSite();
  const menu = getMenu();
  const reviews = getReviews();
  const { label: openLabel } = getOpenStatus();

  return (
    <HomePage
      site={site}
      menu={menu}
      reviews={reviews}
      openLabel={openLabel}
    />
  );
}
