import { supabase } from "@/lib/supabaseClient";
import { Review } from "@/types/review";

// Inserir review
export async function addReview(review: Omit<Review, "id" | "createdAt">) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ ...review }])
    .select("*")
    .single();

  if (error) throw error;
  return data as Review;
}

// Buscar reviews de um filme
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
