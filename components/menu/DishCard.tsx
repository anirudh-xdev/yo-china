"use client";

import { useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { registerGsapPlugins, gsap, useGSAP } from "@/lib/gsap-client";

registerGsapPlugins();

type Dish = {
  id: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  image: string;
};

export function DishCard({ dish }: { dish: Dish }) {
  const card = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = card.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) return;

          const tiltX = gsap.quickTo(el, "rotationX", {
            duration: 0.45,
            ease: "power2.out",
          });
          const tiltY = gsap.quickTo(el, "rotationY", {
            duration: 0.45,
            ease: "power2.out",
          });
          const lift = gsap.quickTo(el, "y", {
            duration: 0.45,
            ease: "power2.out",
          });

          const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const px = gsap.utils.clamp(0, 1, (e.clientX - rect.left) / rect.width);
            const py = gsap.utils.clamp(0, 1, (e.clientY - rect.top) / rect.height);
            const rotY = gsap.utils.mapRange(0, 1, 8, -8, px);
            const rotX = gsap.utils.mapRange(0, 1, -6, 6, py);
            tiltX(rotX);
            tiltY(rotY);
            lift(-6);
          };

          const onLeave = () => {
            tiltX(0);
            tiltY(0);
            lift(0);
          };

          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerleave", onLeave);

          return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: card }
  );

  return (
    <article
      ref={card}
      data-reveal
      className="dish-tilt surface-card surface-card-hover group overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 25vw"
        />
        <Badge className="absolute left-4 top-4" variant="gold">
          {dish.tag}
        </Badge>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-charcoal">
            {dish.name}
          </h3>
          <span className="shrink-0 text-sm font-semibold text-gold">
            {dish.price}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {dish.description}
        </p>
      </div>
    </article>
  );
}
