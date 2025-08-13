"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MovieCard } from "@/components/movie-card";
import { Movie } from "@/types/movie";
import { getMyReviews } from "@/services/reviewsService";

export default function MyReviewsPage() {
  const [myMovies, setMyMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");

    // useEffect(() => {
    // async function loadMyReviews() {
    //     try {
    //     const myReviews = await getMyReviews(user.id);
    //     setMyMovies(myReviews);
    //     } catch (err) {
    //     console.error(err);
    //     }
    // }
    // loadMyReviews();
    // }, [user]);


  const filteredMovies = myMovies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Meus Reviews</h1>

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
            <p className="text-gray-600">Nenhum review encontrado.</p>
          )}
        </div>
      </div>
  );
}
