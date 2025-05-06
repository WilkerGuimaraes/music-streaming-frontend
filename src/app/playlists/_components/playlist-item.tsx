"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { SquarePenIcon, Trash2Icon } from "lucide-react";
import { deletePlaylist } from "@/app/_actions/delete-playlist";
import { useState } from "react";
import UpdatePlaylistContent from "./update-playlist-content";
import Link from "next/link";

type Playlist = {
  id: string;
  name: string;
  songCount: number;
};

type PlaylistItemProps = {
  playlist: Playlist;
  onPlaylistUpdated: () => void;
};

const PlaylistItem = ({ playlist, onPlaylistUpdated }: PlaylistItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <li
      key={playlist.id}
      className="w-[420px] space-y-4 rounded border px-4 py-6 shadow"
    >
      <div>
        <p>
          <strong>Nome:</strong> {playlist.name ?? "Sem nome"}
        </p>
        <p>
          <strong>Quantidade de músicas:</strong> {playlist.songCount}
        </p>
      </div>

      <div className="flex w-full justify-between">
        <Button
          asChild
          className="cursor-pointer bg-emerald-700 hover:bg-emerald-800"
        >
          <Link href={`playlists/${playlist.id}/songs`}>Ver músicas</Link>
        </Button>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer bg-slate-600 hover:bg-slate-700">
              <SquarePenIcon className="mr-2 size-4" />
              Atualizar playlist
            </Button>
          </DialogTrigger>

          <DialogContent>
            <UpdatePlaylistContent
              playlistId={playlist.id}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                onPlaylistUpdated();
              }}
            />
          </DialogContent>
        </Dialog>

        <Button
          variant={"ghost"}
          onClick={async () => {
            await deletePlaylist(playlist.id);
            onPlaylistUpdated();
          }}
        >
          <Trash2Icon className="text-red-500" />
        </Button>
      </div>
    </li>
  );
};

export default PlaylistItem;
