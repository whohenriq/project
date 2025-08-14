"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { uploadMovie } from "@/services/moviesService";
import { UploadMovieData } from "@/types/movie";
import { FileInput } from "@/components/ui/file-input";
import { Textarea } from "@/components/ui/text-area";

const genresList = [
  "Ação",
  "Aventura",
  "Comedia",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
];

export default function UploadMoviePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<UploadMovieData & { genre: string[] }>();

  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [trailerPreview, setTrailerPreview] = useState<string | null>(null);

  const handlePosterSelect = (file: File) => {
    setValue("posterFile", file);
    setPosterPreview(URL.createObjectURL(file));
  };

  const handleTrailerSelect = (file: File) => {
    setValue("trailerFile", file);
    setTrailerPreview(URL.createObjectURL(file));
  };

  async function onSubmit(data: UploadMovieData & { genre: string[] }) {
    try {
      await uploadMovie({
        ...data,
        genre: data.genre.join(", "),
      });
      alert("Filme salvo com sucesso!");
      reset();
      setPosterPreview(null);
      setTrailerPreview(null);
      router.push("/movies");
    } catch (error) {
      alert("Erro ao salvar filme: " + (error as Error).message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Filme</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Título</label>
          <Input {...register("title", { required: "Título obrigatório" })} />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Ano</label>
          <Input
            type="number"
            {...register("year", {
              required: "Ano obrigatório",
              min: { value: 1900, message: "Ano inválido" },
              max: { value: new Date().getFullYear(), message: "Ano inválido" },
              valueAsNumber: true,
            })}
          />
          {errors.year && <p className="text-red-600">{errors.year.message}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Gêneros</label>
          <select
            {...register("genre", { required: "Selecione ao menos um gênero" })}
            multiple
            className="w-full border rounded-md p-2 h-28"
          >
            {genresList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-600">{errors.genre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-semibold mb-1">Duração</label>
          <Input
            {...register("duration", { required: "Duração obrigatória" })}
            type="text"
            placeholder="Ex: 2h 15m"
          />
          {errors.duration && (
            <p className="text-red-600">{errors.duration.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-semibold mb-1">Descrição</label>
          <Textarea
            {...register("description", { required: "Descrição obrigatória" })}
            rows={5}
          />
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}
        </div>

        <FileInput
          label="Poster (imagem)"
          accept="image/*"
          onFileSelect={handlePosterSelect}
        />
        {posterPreview && (
          <img
            src={posterPreview}
            alt="Preview do poster"
            className="mt-2 w-48 rounded-lg"
          />
        )}

        <FileInput
          label="Trailer (vídeo)"
          accept="video/*"
          onFileSelect={handleTrailerSelect}
        />

        {trailerPreview && (
          <video
            src={trailerPreview}
            controls
            className="mt-2 w-full max-w-lg rounded-lg"
          />
        )}

        <Button type="submit" className="mt-4 px-6 py-3">
          Salvar Filme
        </Button>
      </form>
    </div>
  );
}
