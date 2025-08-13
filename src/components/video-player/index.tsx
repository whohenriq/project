"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}
export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="space-y-2">
      <video ref={ref} src={src} poster={poster} controls className="w-full rounded-xl" />
      <div className="flex gap-2">
        <Button onClick={toggle}>{playing ? "Pausar" : "Reproduzir"}</Button>
      </div>
    </div>
  );
}