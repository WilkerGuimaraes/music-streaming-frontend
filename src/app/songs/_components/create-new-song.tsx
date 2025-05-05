"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Loader2 } from "lucide-react";

import { createSong } from "@/app/_actions/create-song";

const createSongSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  artistName: z.string().min(1, "O nome do artista é obrigatório."),
  albumTitle: z.string().optional(),
});

type CreateSongFormData = z.infer<typeof createSongSchema>;

type CreateNewSongProps = {
  onSuccess?: () => void;
};

export function CreateNewSong({ onSuccess }: CreateNewSongProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateSongFormData>({
      resolver: zodResolver(createSongSchema),
    });

  async function handleCreateSong(data: CreateSongFormData) {
    try {
      await createSong(data);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar música", error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Nova música</DialogTitle>
        <DialogDescription>
          Insira os dados para criar uma nova música
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateSong)} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-3 text-right">
          <Label htmlFor="title">Nome da música*:</Label>
          <Input className="col-span-3" id="title" {...register("title")} />

          {formState.errors.title && (
            <span className="col-span-3 text-sm text-red-500">
              {formState.errors.title.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-3 text-right">
          <Label htmlFor="artistName">Nome do artista:</Label>
          <Input
            className="col-span-3"
            id="artistName"
            {...register("artistName")}
          />

          {formState.errors.artistName && (
            <span className="col-span-3 text-sm text-red-500">
              {formState.errors.artistName.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-3 text-right">
          <Label htmlFor="albumName">Nome do álbum:</Label>
          <Input
            className="col-span-3"
            id="albumTitle"
            {...register("albumTitle")}
          />

          {formState.errors.albumTitle && (
            <span className="col-span-3 text-sm text-red-500">
              {formState.errors.albumTitle.message}
            </span>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              disabled={formState.isSubmitting}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
