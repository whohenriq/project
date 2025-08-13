import { supabase } from "@/lib/supabaseClient";
import { UploadMovieData, Movie } from "@/types/movie";

export async function getMovieById(id: string) {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Movie;
}

export async function uploadMovie(data: UploadMovieData) {
  // upload poster
  const posterPath = `posters/${Date.now()}_${data.posterFile.name}`;
  const { error: posterError } = await supabase.storage
    .from("movie-posters")
    .upload(posterPath, data.posterFile, { cacheControl: "3600", upsert: false });
  if (posterError) throw posterError;

  // upload trailer
  const trailerPath = `trailers/${Date.now()}_${data.trailerFile.name}`;
  const { error: trailerError } = await supabase.storage
    .from("movie-trailers")
    .upload(trailerPath, data.trailerFile, { cacheControl: "3600", upsert: false });
  if (trailerError) throw trailerError;

  // public URLs
  const { data: posterPublicUrlData } = supabase.storage
    .from("movie-posters")
    .getPublicUrl(posterPath);
  const { data: trailerPublicUrlData } = supabase.storage
    .from("movie-trailers")
    .getPublicUrl(trailerPath);

  // insert
  const { error: insertError } = await supabase.from("movies").insert({
    title: data.title,
    year: data.year,
    genre: data.genre,
    description: data.description,
    poster_url: posterPublicUrlData.publicUrl,
    trailer_url: trailerPublicUrlData.publicUrl,
  });
  if (insertError) throw insertError;

  return true;
}
