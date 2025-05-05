"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlaylist } from "@/app/_actions/create-playlist";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/app/_components/ui/label";

const createNewPlaylistSchema = z.object({
  name: z.string().min(3, { message: "O nome da playlist é obrigatório." }),
});

type CreateNewPlaylistSchema = z.infer<typeof createNewPlaylistSchema>;

type CreateNewPlaylistProps = {
  onSuccess?: () => void;
};

const CreateNewPlaylist = ({ onSuccess }: CreateNewPlaylistProps) => {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateNewPlaylistSchema>({
      resolver: zodResolver(createNewPlaylistSchema),
    });

  async function handleCreatePlaylist({ name }: CreateNewPlaylistSchema) {
    try {
      await createPlaylist(name);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar música", error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Nova playlist</DialogTitle>
        <DialogDescription>
          Dê um nome para sua nova playlist.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreatePlaylist)} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-3 text-right">
          <Label htmlFor="name">Nome da playlist*:</Label>
          <Input className="col-span-3" id="name" {...register("name")} />

          {formState.errors.name && (
            <span className="col-span-3 text-sm text-red-500">
              {formState.errors.name.message}
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
};

export default CreateNewPlaylist;
