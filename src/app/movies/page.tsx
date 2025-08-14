"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MoviesListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch(`${API_URL}/movies`);
        if (!res.ok) throw new Error("Erro ao buscar filmes");
        const data: Movie[] = await res.json();

        // Ajuste do genre caso venha como string
        const moviesFromAPI = data.map((m) => ({
          ...m,
          genre: Array.isArray(m.genre) ? m.genre : [m.genre || ""],
        }));

        setMovies(moviesFromAPI);
        setIsAdmin(true);
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
      }
    }

    loadMovies();
  }, []);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Filmes</h1>
        {isAdmin && (
          <Button asChild>
            <Link href="/admin/upload-movie">Adicionar Filme</Link>
          </Button>
        )}
      </div>

      <input
        type="text"
        placeholder="Buscar filmes..."
        className="mb-6 w-full p-3 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <MovieCard
                movie={{
                  ...movie,
                  genre: [movie.genre[0]],
                }}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-600">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}
