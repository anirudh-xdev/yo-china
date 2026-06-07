import { Stars } from "@/components/ui/stars";
import { getInitials } from "@/lib/utils";
import type { Review } from "@/lib/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="surface-card w-[320px] shrink-0 rounded-3xl p-6 sm:w-[360px]">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-sm font-semibold text-chili"
          aria-hidden
        >
          {getInitials(review.author)}
        </div>
        <div>
          <p className="font-medium text-charcoal">{review.author}</p>
          <p className="text-xs text-muted">{review.relativeTime}</p>
        </div>
      </div>
      <Stars rating={review.rating} className="mt-3" />
      <p className="mt-3 text-sm leading-relaxed text-charcoal-light line-clamp-4">
        {review.text}
      </p>
      {review.highlights && review.highlights.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.highlights.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
