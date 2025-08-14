export interface MediaFile {
  url: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string[];
  year?: number;
  duration?: string;
  poster: string;
  trailer?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface UploadMovieData {
  title: string;
  year: number;
  genre: string[];
  description: string;
  duration: string;
  poster: string;     
  trailer?: string;    
}
