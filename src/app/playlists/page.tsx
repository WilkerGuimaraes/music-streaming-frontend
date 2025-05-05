"use client";

import { getPlaylists } from "@/http/api";
import { Dialog, DialogContent, DialogTrigger } from "../_components/ui/dialog";
import { Button } from "../_components/ui/button";
import { PlusCircle, Trash2Icon } from "lucide-react";
import CreateNewPlaylist from "./_components/create-new-playlist";
import { useEffect, useState } from "react";
import { deletePlaylist } from "../_actions/delete-playlist";

type Playlist = {
  id: string;
  name: string;
  songCount: number;
};

const PlaylistsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  async function fetchSongs() {
    const data = await getPlaylists();
    setPlaylists(data);
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Playlists</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 size-4" />
              Nova Música
            </Button>
          </DialogTrigger>

          <DialogContent>
            <CreateNewPlaylist
              onSuccess={() => {
                setIsDialogOpen(false);
                fetchSongs();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {playlists.length === 0 ? (
        <p>Nenhuma playlist encontrada.</p>
      ) : (
        <ul className="grid gap-2 lg:grid-cols-2">
          {playlists.map((playlist, index) => (
            <li
              key={index}
              className="space-y-4 rounded border py-6 pr-24 pl-4 shadow"
            >
              <div>
                <p>
                  <strong>Nome:</strong> {playlist.name ?? "Sem nome"}
                </p>
                <p>
                  <strong>Quantidade de músicas:</strong> {playlist.songCount}
                </p>
              </div>

              <Button
                variant={"ghost"}
                onClick={async () => {
                  await deletePlaylist(playlist.id);
                  await fetchSongs();
                }}
              >
                <Trash2Icon className="text-red-500" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaylistsPage;
