import { Review } from "@/types/review";
import { RatingStars } from "../rating-stars";

export function UserReview({ review }: { review: Review }) {
  if (!review) return null;

  return (
    <div className="border-2 border-blue-500 p-4 rounded-xl mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold">Você</span>
        <span className="text-sm text-gray-500">{new Date(review.createdAt || "").toLocaleDateString()}</span>
      </div>
      <RatingStars value={review.rating} readOnly size={20} />
      <p className="mt-2 text-gray-700">{review.comment}</p>
    </div>
  );
}
