import { Review } from "@/types/review";
import { Movie } from "@/types/movie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function addReview(review: Omit<Review, "id" | "createdAt">) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...review,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) throw new Error("Erro ao adicionar review");
  return res.json() as Promise<Review>;
}


export async function getReviewsByMovie(movieId: number) {
  const res = await fetch(`${API_URL}/reviews?movieId=${movieId}&_sort=createdAt&_order=desc`);
  if (!res.ok) throw new Error("Erro ao buscar reviews");
  return res.json() as Promise<Review[]>;
}

export async function updateMovieRating(movieId: number) {
  const reviewsRes = await fetch(`${API_URL}/reviews?movieId=${movieId}`);
  if (!reviewsRes.ok) throw new Error("Erro ao buscar reviews para cálculo");

  const reviews = (await reviewsRes.json()) as Review[];
  const votesCount = reviews.length;
  const averageRating = votesCount > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / votesCount
    : 0;

  const movieUpdateRes = await fetch(`${API_URL}/movies/${movieId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rating: averageRating,
      votes_count: votesCount,
    }),
  });

  if (!movieUpdateRes.ok) throw new Error("Erro ao atualizar filme");

  return { votesCount, averageRating };
}


export async function getMyReviews(userId: number) {
  const res = await fetch(`${API_URL}/reviews?userId=${userId}&_sort=createdAt&_order=desc`);
  if (!res.ok) throw new Error("Erro ao buscar reviews do usuário");

  const reviews = await res.json() as Review[];

  const moviesRes = await fetch(`${API_URL}/movies`);
  if (!moviesRes.ok) throw new Error("Erro ao buscar filmes");

  const movies = await moviesRes.json() as Movie[];

  return reviews.map(r => {
    const movie = movies.find(m => m.id === r.movieId)!;
    return {
      ...movie,
      comment: r.comment,
      createdAt: r.createdAt,
      averageRating: r.rating,
    };
  });
}
