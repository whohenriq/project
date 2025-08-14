import { UploadMovieData, Movie } from "@/types/movie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(`${API_URL}/movies`);
  if (!res.ok) throw new Error("Erro ao buscar filmes");
  return res.json();
}

export async function getMovieById(id: number) {
  const res = await fetch(`${API_URL}/movies/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar filme");
  return res.json() as Promise<Movie>;
}

export async function uploadMovie(data: UploadMovieData) {
  const newMovie: Movie = {
    id: Date.now(), 
    title: data.title,
    year: data.year,
    genre: data.genre, 
    description: data.description,
    duration: data.duration,
    poster: data.poster,
    trailer: data.trailer,
    rating: 0,
    reviewsCount: 0,
  };

  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie),
  });

  if (!res.ok) throw new Error("Erro ao criar filme");
  return res.json(); 
}
