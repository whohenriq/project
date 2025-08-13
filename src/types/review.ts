export interface Review {
  id: string;
  movieId: string;
  userId?: string;
  username?: string; // só pra exibir
  rating: number;
  comment: string;
  createdAt?: string;
}
