import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/types/movie";
import { XyzTransition } from '@animxyz/react';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <XyzTransition appear xyz="fade small-100% duration-6 ease-out-back">
      <Link href={`/movies/${movie.id}`}>
        <Card className="hover:shadow-xl transition-shadow h-full">
          <CardHeader>
            <div className="aspect-[2/3] w-full overflow-hidden rounded-xl">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardTitle className="mt-3 flex items-center justify-between gap-2">
              <div className="truncate">
                {movie.title} <span className="text-gray-500 font-normal">({movie.year})</span>
              </div>
              <Badge>{movie.genre.join(", ")}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-sm text-muted-foreground">{movie.description}</p>
            {movie.averageRating ? (
              <p className="mt-2 text-xs">{movie.averageRating.toFixed(1)} ⭐</p>
            ) : null}
          </CardContent>
        </Card>
      </Link>
    </XyzTransition>
  );
}
