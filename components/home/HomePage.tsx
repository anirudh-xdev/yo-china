"use client";

import { useSyncExternalStore } from "react";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { Header } from "@/components/nav/Header";
import { Hero } from "@/components/hero/Hero";
import { PopularDishes } from "@/components/menu/PopularDishes";
import { ParallaxBand } from "@/components/sections/ParallaxBand";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { InteriorShowcase } from "@/components/gallery/InteriorShowcase";
import { VisitSection } from "@/components/visit/VisitSection";
import { Footer } from "@/components/footer/Footer";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { FaqSection } from "@/components/faq/FaqSection";
import type { SiteData, MenuData } from "@/lib/site";
import type { ReviewsData } from "@/lib/reviews";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion() {
  return false;
}

export function HomePage({
  site,
  menu,
  reviews,
  openLabel,
}: {
  site: SiteData;
  menu: MenuData;
  reviews: ReviewsData;
  openLabel: string;
}) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );

  return (
    <GsapProvider>
      <Header site={site} />
      <main className="overflow-x-hidden">
        <Hero site={site} openLabel={openLabel} reducedMotion={reducedMotion} />
        <PopularDishes menu={menu} />
        <ParallaxBand />
        <ReviewsSection reviews={reviews} />
        <InteriorShowcase menu={menu} />
        <FaqSection />
        <VisitSection site={site} openLabel={openLabel} />
      </main>
      <Footer site={site} />
      <InstallPrompt />
    </GsapProvider>
  );
}
