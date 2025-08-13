"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value = 0,
  onChange,
  size = 24,
  readOnly = false,
}: {
  value?: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1" aria-label="rating">
      {stars.map((s) => {
        const active = (hover ?? value) >= s;
        return (
          <button
            key={s}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(s)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange?.(s)}
            className={cn("transition-transform", active ? "scale-110" : "opacity-50")}
            aria-label={`${s} estrelas`}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}