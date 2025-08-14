import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/types/movie";
import { XyzTransition } from '@animxyz/react';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <XyzTransition appear xyz="fade small-100% duration-6 ease-out-back">
      <Link href={`/movies/${movie.id}`} className="block">
        <Card className="hover:shadow-xl transition-shadow h-full cursor-pointer">
          <CardHeader className="flex flex-col gap-2">
            <div className="aspect-[2/3] w-full overflow-hidden rounded-xl">
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardTitle className="truncate">
              {movie.title} <span className="text-gray-500 font-normal">({movie.year})</span>
            </CardTitle>
            {movie.genre.length > 0 && (
              <Badge className="text-xs sm:text-sm truncate max-w-full mt-1">
                {movie.genre.join(", ")}
              </Badge>
            )}
          </CardHeader>

          <CardContent>
            <p className="line-clamp-3 text-sm text-muted-foreground">{movie.description}</p>
            {movie.rating ? (
              <p className="mt-2 text-xs">{movie.rating.toFixed(1)} ⭐</p>
            ) : null}
          </CardContent>
        </Card>
      </Link>
    </XyzTransition>
  );
}
