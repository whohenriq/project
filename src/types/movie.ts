export interface MediaFile {
    file: File;
    /** Caminho único para salvar no bucket do Supabase */
    path: string;
    /** URL pública gerada pelo Supabase após upload */
    publicUrl?: string;
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    genre: string[];
    year?: number;
    duration?: string;
    posterUrl: string;
    trailerUrl?: string;
    averageRating?: number;
    reviewsCount?: number;
}

export interface UploadMovieData {
    title: string;
    year: number;
    genre: string;
    description: string;
    duration: string; 
    posterFile: File;
    trailerFile: File;
}
