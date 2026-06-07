"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { registerGsapPlugins, gsap, useGSAP } from "@/lib/gsap-client";
import type { MenuData } from "@/lib/site";

registerGsapPlugins();

export function InteriorShowcase({ menu }: { menu: MenuData }) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrap.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          wrap.current,
          { scale: 1.04, autoAlpha: 0.9 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top 90%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: wrap }
  );

  return (
    <SectionReveal id="gallery" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-xl" data-reveal>
          <p className="section-label text-gold">The space</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal sm:text-5xl">
            Step inside
          </h2>
          <p className="mt-4 text-muted">
            A cosy spot in Lower Bazar — simple, welcoming, and full of flavour.
          </p>
        </div>

        <div
          ref={wrap}
          data-reveal
          className="surface-card relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[21/9]"
        >
          <Image
            src={menu.interior.image}
            alt={menu.interior.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Yo China Modinagar
            </p>
            <p className="mt-1 text-sm text-white/80">
              Dine in · Takeaway · Delivery
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
