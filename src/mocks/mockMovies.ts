import { Movie } from "@/types/movie";

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    duration: "2h 28min",
    genre: ["Action", "Sci-Fi", "Thriller"],
    description:
      "Dom Cobb é um ladrão hábil, o melhor no perigoso campo da extração...",
    posterUrl: "/images/poster-inception.jpg",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    averageRating: 4.3
  },
  {
    id: "2",
    title: "The Matrix",
    year: 1999,
    duration: "2h 16min",
    genre: ["Action", "Sci-Fi"],
    description: "Um hacker descobre a verdade sobre a realidade...",
    posterUrl: "/images/poster-matrix.jpg",
    trailerUrl: "https://www.w3schools.com/html/movie.mp4",
    averageRating: 4.7
  },
];
