"use client";

import { SectionReveal } from "@/components/sections/SectionReveal";
import { DishCard } from "@/components/menu/DishCard";
import type { MenuData } from "@/lib/site";

export function PopularDishes({ menu }: { menu: MenuData }) {
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
      </div>
    </SectionReveal>
  );
}
