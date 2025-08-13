"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/rating-stars";
import { VideoPlayer } from "@/components/video-player";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";

import { getReviewsByMovie, addReview, updateMovieRating } from "@/services/reviewsService";
import { getMovieById } from "@/services/moviesService";
import { mockMovies } from "@/mocks/mockMovies";
import { mockReviews } from "@/mocks/mockReviews"; 
import { useParams } from "next/navigation";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params.movieId as string ;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  if (!movieId) return <p>Filme não encontrado</p>;

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovieById(movieId);
        setMovie(data || mockMovies.find(m => m.id === movieId) || null);
      } catch {
        setMovie(mockMovies.find(m => m.id === movieId) || null);
      }
    }

    async function loadReviews() {
      try {
        const data = await getReviewsByMovie(movieId);
        const allReviews = data.length ? data : mockReviews.filter(r => r.movieId === movieId);

        const myRev = allReviews.find(r => r.userId === "currentUserId") || null;
        const otherRevs = allReviews.filter(r => r.userId !== "currentUserId");

        setMyReview(myRev);
        setReviews(otherRevs);
      } catch {
        const allReviews = mockReviews.filter(r => r.movieId === movieId);
        const myRev = allReviews.find(r => r.userId === "currentUserId") || null;
        const otherRevs = allReviews.filter(r => r.userId !== "currentUserId");

        setMyReview(myRev);
        setReviews(otherRevs);
      }
    }

    loadMovie();
    loadReviews();
  }, [movieId]);

  const handleSubmit = async () => {
    if (rating === 0) return alert("Selecione uma nota!");

    try {
      const newReview = await addReview({
        movieId,
        userId: "currentUserId",
        username: "Você",
        rating,
        comment,
      });

      setMyReview(newReview);
      setReviews(reviews.filter(r => r.userId !== "currentUserId"));
      setRating(0);
      setComment("");

      await updateMovieRating(movieId);
    } catch (err: any) {
      alert("Erro ao enviar avaliação: " + err.message);
    }
  };

  if (!movie) return <p>Carregando...</p>;

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
      <div className="max-w-5xl mx-auto p-6 space-y-10">
      
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={movie.posterUrl} 
            alt={`${movie.title} Poster`} 
            className="w-52 md:w-60 rounded-xl shadow-lg object-cover" 
          />
          <div className="flex flex-col justify-start flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">
              {movie.title} <span className="text-gray-500 font-normal">({movie.year})</span>
            </h1>
            <div className="flex items-center gap-3 mt-2 md:mt-3">
              <RatingStars value={Math.round(averageRating)} readOnly size={26} />
              <span className="text-gray-700 font-semibold">{averageRating.toFixed(1)} / 5</span>
              <span className="text-gray-500">({reviews.length + (myReview ? 1 : 0)} votos)</span>
            </div>
            <div className="mt-3 text-gray-600 text-sm md:text-base">
              <span>{movie.genre.join(", ")}</span> • <span>{movie.duration}</span>
            </div>
            <p className="mt-4 text-gray-800 max-w-xl leading-relaxed text-sm md:text-base">{movie.description}</p>
          </div>
        </div>


        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-3">Trailer</h2>
          <VideoPlayer src={movie.trailerUrl || ""} className="w-full h-64 md:h-80" />
        </div>

        {/* avaliação */}
        {!isAdmin && (
        <div className="bg-gray-100 p-5 md:p-6 rounded-xl space-y-4 max-w-3xl">
          {myReview ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">Sua Avaliação</h2>
              <RatingStars value={myReview.rating} readOnly size={28} />
              <p className="mt-2 text-gray-700">{myReview.comment}</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2">Avalie este filme</h2>
              <RatingStars value={rating} onChange={setRating} size={28} />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva seu comentário..."
                className="w-full p-3 rounded-lg border resize-none text-sm md:text-base"
                rows={4}
              />
              <Button onClick={handleSubmit} className="mt-2">Enviar avaliação</Button>
            </>
          )}
        </div>
        )}

        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Avaliações dos usuários</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600 italic">Nenhuma avaliação ainda.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="border-b border-gray-300 py-3 last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{r.username || "Usuário"}</span>
                  <span className="text-sm text-gray-500">{new Date(r.createdAt || "").toLocaleDateString()}</span>
                </div>
                <RatingStars value={r.rating} readOnly size={18} />
                <p className="mt-1 text-gray-700 text-sm">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
  );
}
