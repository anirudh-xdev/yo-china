"use client";

import { useRef } from "react";
import Link from "next/link";
import { ExternalLink, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { ReviewSummary } from "@/components/reviews/ReviewSummary";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { registerGsapPlugins, gsap, useGSAP } from "@/lib/gsap-client";
import type { ReviewsData } from "@/lib/reviews";

registerGsapPlugins();

function ReviewsMarquee({ reviews }: { reviews: ReviewsData["items"] }) {
  const track = useRef<HTMLDivElement>(null);
  const doubled = [...reviews, ...reviews];

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) return;

          const width = el.scrollWidth / 2;
          const tween = gsap.to(el, {
            x: -width,
            duration: gsap.utils.mapRange(300, 800, 28, 50, width),
            ease: "none",
            repeat: -1,
          });

          const pause = () => tween.pause();
          const play = () => tween.play();
          el.parentElement?.addEventListener("pointerenter", pause);
          el.parentElement?.addEventListener("pointerleave", play);

          return () => {
            el.parentElement?.removeEventListener("pointerenter", pause);
            el.parentElement?.removeEventListener("pointerleave", play);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: track }
  );

  return (
    <div ref={track} className="flex w-max gap-5">
      {doubled.map((review, i) => (
        <ReviewCard key={`${review.id}-${i}`} review={review} />
      ))}
    </div>
  );
}

export function ReviewsSection({ reviews }: { reviews: ReviewsData }) {
  return (
    <SectionReveal id="reviews" variant="blush" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl" data-reveal>
          <p className="section-label">What people say</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal sm:text-5xl">
            Google reviews
          </h2>
          <p className="mt-4 text-muted">
            Real feedback from our guests — curated from Google Maps.
          </p>
        </div>

        <ReviewSummary reviews={reviews} />

        <div className="mt-10 flex flex-wrap gap-3" data-reveal>
          <Button asChild>
            <Link
              href={reviews.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read all on Google
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href={reviews.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PenLine className="h-4 w-4" />
              Write a review
            </Link>
          </Button>
        </div>

        <div className="relative mt-12 overflow-hidden" data-reveal>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-blush/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-blush/40 to-transparent" />
          <ReviewsMarquee reviews={reviews.items} />
        </div>
      </div>
    </SectionReveal>
  );
}
