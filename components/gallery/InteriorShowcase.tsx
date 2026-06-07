"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { registerGsapPlugins, gsap, useGSAP } from "@/lib/gsap-client";
import type { MenuData } from "@/lib/site";

registerGsapPlugins();

type GalleryImage = MenuData["interiorGallery"][number];

function GalleryTile({
  photo,
  priority = false,
  className = "",
}: {
  photo: GalleryImage;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      data-gallery-item
      className={`surface-card group relative overflow-hidden rounded-2xl sm:rounded-3xl ${className}`}
    >
      <Image
        src={photo.image}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
    </figure>
  );
}

export function InteriorShowcase({ menu }: { menu: MenuData }) {
  const wrap = useRef<HTMLDivElement>(null);
  const featured = menu.interiorGallery.find((photo) => photo.featured);
  const collage = menu.interiorGallery.filter((photo) => !photo.featured);

  useGSAP(
    () => {
      if (!wrap.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          wrap.current!.querySelectorAll("[data-gallery-item]"),
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top 82%",
              once: true,
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
            Neon signs, mural walls, fairy lights, and cosy corners — see what
            makes Yo China Modinagar feel like home.
          </p>
        </div>

        <div ref={wrap} className="space-y-4 sm:space-y-5">
          {featured && (
            <figure
              data-gallery-item
              className="surface-card group relative aspect-[16/9] overflow-hidden rounded-3xl"
            >
              <Image
                src={featured.image}
                alt={featured.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  Yo China Modinagar
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Dine in · Takeaway · Delivery
                </p>
              </figcaption>
            </figure>
          )}

          <div className="columns-2 gap-4 sm:columns-3 sm:gap-5">
            {collage.map((photo) => (
              <div key={photo.id} className="mb-4 break-inside-avoid sm:mb-5">
                <GalleryTile photo={photo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
