"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Phone, Star, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import { registerGsapPlugins, gsap, useGSAP, SplitText } from "@/lib/gsap-client";
import type { SiteData } from "@/lib/site";

registerGsapPlugins();

const Hero3D = dynamic(
  () => import("@/components/hero/Hero3D").then((m) => m.Hero3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-blush/60 via-surface to-sage/50" />
    ),
  }
);

export function Hero({
  site,
  openLabel,
  reducedMotion,
}: {
  site: SiteData;
  openLabel: string;
  reducedMotion: boolean;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || reducedMotion) return;

      const title = root.current.querySelector("[data-hero-title]");
      const subtitle = root.current.querySelector("[data-hero-subtitle]");
      const hindi = root.current.querySelector("[data-hero-hindi]");
      const body = root.current.querySelector("[data-hero-body]");
      const meta = root.current.querySelector("[data-hero-meta]");
      const ctas = root.current.querySelectorAll("[data-hero-cta]");
      const canvasWrap = root.current.querySelector("[data-hero-canvas]");
      const orbs = root.current.querySelectorAll("[data-hero-orb]");

      let split: SplitText | null = null;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.12,
      });

      try {
        if (title) {
          split = SplitText.create(title, {
            type: "words,chars",
            charsClass: "split-char",
            wordsClass: "split-word",
          });
        }

        if (split?.chars.length) {
          tl.from(split.chars, {
            y: 64,
            opacity: 0,
            rotateX: -28,
            transformOrigin: "50% 100%",
            stagger: gsap.utils.distribute({ amount: 0.5, from: "start" }),
            duration: 0.85,
          });
        } else if (title) {
          tl.from(title, { y: 32, opacity: 0, duration: 0.8 });
        }
      } catch {
        if (title) {
          tl.from(title, { y: 32, opacity: 0, duration: 0.8 });
        }
      }

      if (subtitle) {
        tl.from(subtitle, { y: 20, opacity: 0, duration: 0.65 }, "-=0.3");
      }

      const rest = [hindi, body, meta, ...ctas].filter(Boolean);
      if (rest.length) {
        tl.from(
          rest,
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 },
          "-=0.35"
        );
      }

      if (canvasWrap) {
        tl.from(
          canvasWrap,
          { scale: 0.94, opacity: 0, duration: 1, ease: "power2.out" },
          0.15
        );

        gsap.to(canvasWrap, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (orbs.length) {
        gsap.to(orbs, {
          y: gsap.utils.wrap([-14, 12, -8]),
          x: gsap.utils.wrap([6, -10, 4]),
          duration: gsap.utils.wrap([4, 5.2, 3.6]),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.35, from: "random" },
        });
      }

      return () => split?.revert();
    },
    { scope: root, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative min-h-[calc(100svh-0px)] overflow-hidden pt-24 pb-20"
    >
      <div className="gradient-mesh absolute inset-0 -z-20" aria-hidden />
      <div
        data-hero-orb
        className="hero-orb -left-16 top-24 h-72 w-72 bg-blush/80"
        aria-hidden
      />
      <div
        data-hero-orb
        className="hero-orb right-0 top-12 h-80 w-80 bg-sage/70"
        aria-hidden
      />
      <div
        data-hero-orb
        className="hero-orb bottom-0 left-1/3 h-64 w-64 bg-gold/15"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative z-10">
          <Badge variant="gold" className="mb-6" data-hero-cta>
            {openLabel}
          </Badge>

          <h1 className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-tight text-charcoal">
            <span data-hero-title className="text-gradient">
              Yo China
            </span>
            <br />
            <span data-hero-subtitle>Modinagar</span>
          </h1>

          <p
            lang="hi"
            data-hero-hindi
            className="mt-3 font-hindi text-2xl text-gold sm:text-[1.75rem]"
          >
            {site.nameHindi}
          </p>

          <p
            data-hero-body
            className="mt-5 max-w-md text-lg leading-relaxed text-muted"
          >
            Wok-fired noodles, kurkure momos &amp; the neighbourhood spot
            everyone returns to.
          </p>

          <div
            data-hero-meta
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <div className="surface-card flex items-center gap-2 rounded-full px-4 py-2.5">
              <Stars rating={site.rating} />
              <span className="text-sm font-semibold text-gold">
                {site.rating}
              </span>
              <span className="text-sm text-muted">
                ({site.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <Star className="h-4 w-4 text-gold" />
              {site.priceRange}
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" data-hero-cta>
              <Link
                href={site.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on Zomato"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Order on Zomato
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" data-hero-cta>
              <Link
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions"
              >
                <MapPin className="h-4 w-4" />
                Directions
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" data-hero-cta>
              <Link href={`tel:+91${site.phone}`} aria-label="Call restaurant">
                <Phone className="h-4 w-4" />
                Call
              </Link>
            </Button>
          </div>
        </div>

        <div
          data-hero-canvas
          className="relative mx-auto aspect-square w-full max-w-[min(100%,28rem)] lg:max-w-none"
        >
          <div className="surface-card absolute inset-0 overflow-hidden rounded-[2rem]">
            {!reducedMotion && <Hero3D />}
            {reducedMotion && (
              <div className="h-full w-full bg-gradient-to-br from-blush/50 via-surface to-sage/40" />
            )}
          </div>
          <div className="absolute -bottom-4 -left-4 surface-card rounded-2xl px-4 py-3 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-wider text-chili">
              Bestseller
            </p>
            <p className="font-display text-lg font-semibold text-charcoal">
              Kurkure Momos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
