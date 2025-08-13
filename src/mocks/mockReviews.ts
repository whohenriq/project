// src/mocks/mockReviews.ts
import { Review } from "@/types/review";

export const mockReviews: Review[] = [
  {
    id: "1",
    movieId: "1",
    userId: "1",
    username: "Ana",
    rating: 5,
    comment: "Filme incrível, roteiro excelente!",
    createdAt: "2024-08-10T12:34:00Z",
  },
  {
    id: "2",
    movieId: "1",
    userId: "u2",
    username: "Carlos",
    rating: 4,
    comment: "Gostei bastante, mas poderia ser um pouco mais curto.",
    createdAt: "2024-08-11T09:20:00Z",
  },
  {
    id: "3",
    movieId: "2",
    userId: "3",
    username: "Mariana",
    rating: 5,
    comment: "é um clássico, efeitos e história incríveis!",
    createdAt: "2024-08-09T15:10:00Z",
  },
   {
    id: "3",
    movieId: "1",
    userId: "4",
    username: "Joao",
    rating: 5,
    comment: "Matrix é um clássico, efeitos e história incríveis!",
    createdAt: "2024-08-09T15:10:00Z",
  },
  {
    id: "4",
    movieId: "2",
    userId: "5",
    username: "Pedro",
    rating: 4,
    comment: "Muito bom, mas senti falta de algumas explicações no enredo.",
    createdAt: "2024-08-12T08:45:00Z",
  },
];
