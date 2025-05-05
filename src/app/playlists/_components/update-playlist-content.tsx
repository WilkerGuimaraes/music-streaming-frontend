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
import { updatePlaylist } from "@/app/_actions/update-playlist";

const updatePlaylistSchema = z.object({
  name: z.string().min(3, "O nome da playlist é obrigatório"),
});

type UpdatePlaylistSchema = z.infer<typeof updatePlaylistSchema>;

type UpdatePlaylistContentProps = {
  playlistId: string;
  onSuccess?: () => void;
};

const UpdatePlaylistContent = ({
  playlistId,
  onSuccess,
}: UpdatePlaylistContentProps) => {
  const { register, handleSubmit, formState, reset } =
    useForm<UpdatePlaylistSchema>({
      resolver: zodResolver(updatePlaylistSchema),
    });

  async function handleUpdatePlaylist(data: UpdatePlaylistSchema) {
    try {
      await updatePlaylist({
        playlistId,
        name: data.name,
      });
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar música", error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Renomear playlist</DialogTitle>
        <DialogDescription>Insira o novo nome da playlist</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdatePlaylist)} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-3 text-right">
          <Label htmlFor="name">Nome*:</Label>
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

export default UpdatePlaylistContent;
