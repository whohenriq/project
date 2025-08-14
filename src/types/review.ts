export interface Review {
  id: number;
  movieId: number;
  userId?: number;
  username?: string;
  rating: number;
  comment: string;
  createdAt?: string;
}
