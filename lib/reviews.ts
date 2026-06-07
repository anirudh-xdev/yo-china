import reviewsData from "@/data/reviews.json";

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  highlights?: string[];
};

export type ReviewsData = {
  aggregate: {
    rating: number;
    total: number;
    source: string;
  };
  distribution: Record<"5" | "4" | "3" | "2" | "1", number>;
  googleMapsUrl: string;
  items: Review[];
};

export const MIN_DISPLAY_RATING = 3;

export function getReviews(): ReviewsData {
  return reviewsData as ReviewsData;
}

export function getDisplayReviews(
  data: ReviewsData = reviewsData as ReviewsData
): Review[] {
  return data.items.filter((review) => review.rating >= MIN_DISPLAY_RATING);
}
