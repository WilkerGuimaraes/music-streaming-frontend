"use client";

import { getSongs } from "@/http/api";
import { Button } from "../_components/ui/button";
import { PlusCircle, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateNewSong } from "./_components/create-new-song";
import { Dialog, DialogContent, DialogTrigger } from "../_components/ui/dialog";
import { deleteSong } from "../_actions/delete-song";

type Song = {
  id: string;
  title: string;
  artist: {
    id: string;
    name: string;
  };
  albumName?: string;
};

export default function SongsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);

  async function fetchSongs() {
    const data = await getSongs();
    setSongs(data);
  }

  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <div className="px-4">
      <div className="mb-2 flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Músicas</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 size-4" />
              Nova Música
            </Button>
          </DialogTrigger>

          <DialogContent>
            <CreateNewSong
              onSuccess={() => {
                setIsDialogOpen(false);
                fetchSongs();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {songs.length === 0 ? (
        <p>Nenhuma música encontrada.</p>
      ) : (
        <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between rounded border p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-600">{song.artist.name}</p>
              </div>
              <Button
                variant={"ghost"}
                onClick={async () => {
                  await deleteSong(song.id);
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
}
