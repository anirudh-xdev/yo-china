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

export function getReviews(): ReviewsData {
  return reviewsData as ReviewsData;
}
