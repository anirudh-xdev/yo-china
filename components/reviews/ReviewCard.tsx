import { Quote } from "lucide-react";
import { Stars } from "@/components/ui/stars";
import { getInitials } from "@/lib/utils";
import type { Review } from "@/lib/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card group relative w-[320px] shrink-0 sm:w-[360px]">
      <Quote
        className="absolute right-5 top-5 h-8 w-8 text-gold/20 transition-colors duration-500 group-hover:text-gold/35"
        aria-hidden
      />
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blush to-gold/20 text-sm font-semibold text-chili shadow-inner"
          aria-hidden
        >
          {getInitials(review.author)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-charcoal">{review.author}</p>
          <p className="text-xs text-muted">{review.relativeTime}</p>
        </div>
      </div>
      <Stars rating={review.rating} className="mt-4" />
      <p className="mt-3 text-sm leading-relaxed text-charcoal-light line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      {review.highlights && review.highlights.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {review.highlights.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-surface-muted/80 px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
