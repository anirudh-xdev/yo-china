"use client";

import { useEffect, useRef, useState } from "react";
import { Stars } from "@/components/ui/stars";
import type { ReviewsData } from "@/lib/reviews";

function useCountUp(target: number, duration = 1200, enabled = true) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [value, setValue] = useState(
    !enabled || prefersReduced ? target : 0
  );

  useEffect(() => {
    if (!enabled || prefersReduced) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Number((target * progress).toFixed(1)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled, prefersReduced]);

  return value;
}

const DISPLAY_STARS = ["5", "4", "3"] as const;

export function ReviewSummary({ reviews }: { reviews: ReviewsData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animatedRating = useCountUp(reviews.aggregate.rating, 1200, inView);
  const total = reviews.aggregate.total;
  const dist = reviews.distribution;
  const maxCount = Math.max(
    ...DISPLAY_STARS.map((star) => dist[star])
  );

  return (
    <div ref={ref} className="review-summary" data-reveal>
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-chili/5 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center">
        <div className="text-center sm:text-left">
          <p className="font-display text-6xl font-bold text-gold drop-shadow-sm">
            {animatedRating.toFixed(1)}
          </p>
          <Stars
            rating={reviews.aggregate.rating}
            size="md"
            className="mt-2 justify-center sm:justify-start"
          />
          <p className="mt-2 text-sm text-muted">
            {total} reviews on {reviews.aggregate.source}
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Rating breakdown
          </p>
          {DISPLAY_STARS.map((star) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-3 font-medium text-charcoal">{star}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-muted shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light shadow-[0_0_12px_rgba(212,168,83,0.35)] transition-all duration-1000 ease-out"
                  style={{
                    width: inView ? `${(dist[star] / maxCount) * 100}%` : "0%",
                  }}
                />
              </div>
              <span className="w-8 text-right font-medium text-muted">
                {dist[star]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
