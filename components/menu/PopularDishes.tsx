"use client";

import { SectionReveal } from "@/components/sections/SectionReveal";
import { DishCard } from "@/components/menu/DishCard";
import type { MenuData, SiteData } from "@/lib/site";
import { ArrowRight, ExternalLink} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function PopularDishes({ menu, site }: { menu: MenuData, site: SiteData }) {
  return (
    <SectionReveal id="dishes" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-xl" data-reveal>
          <p className="section-label">From the kitchen</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal sm:text-5xl">
            Our dishes
          </h2>
          <p className="mt-4 text-muted">
            Fresh plates from our wok — momos, noodles, manchurian, and more.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menu.popular.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="flex justify-center">
        <Button asChild variant="outline" size="sm" className="mt-10 md:mt-16">
            <Link href={site.googleMapsMenuUrl} target="_blank" >
              View All Dishes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>  
        </div>
      </div>
    </SectionReveal>
  );
}
