import { supabase } from "@/lib/supabaseClient";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";


export async function addReview(review: Omit<Review, "id" | "createdAt">) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ ...review }])
    .select("*")
    .single();

  if (error) throw error;
  return data as Review;
}

export async function getReviewsByMovie(movieId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("movie_id", movieId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Review[];
}

// Atualizar rating médio e contagem do filme
export async function updateMovieRating(movieId: string) {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("movie_id", movieId);

  if (error) throw error;

  const votesCount = reviews?.length || 0;
  const averageRating =
    votesCount > 0
      ? reviews!.reduce((acc, r) => acc + r.rating, 0) / votesCount
      : 0;

  const { error: updateError } = await supabase
    .from("movies")
    .update({ votes_count: votesCount, average_rating: averageRating })
    .eq("id", movieId);

  if (updateError) throw updateError;

  return { votesCount, averageRating };
}

export async function getMyReviews(userId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      rating,
      comment,
      created_at,
      movie:movies (
        id,
        title,
        description,
        genre,
        poster_url,
        trailer_url
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((r: any) => ({
    id: r.movie.id,
    title: r.movie.title,
    description: r.movie.description,
    genre: Array.isArray(r.movie.genre) ? r.movie.genre : [r.movie.genre || ""],
    posterUrl: r.movie.poster_url,
    trailerUrl: r.movie.trailer_url,
    averageRating: r.rating,
    comment: r.comment,
    createdAt: r.created_at,
  })) as (Movie & { comment: string; createdAt: string })[];
}