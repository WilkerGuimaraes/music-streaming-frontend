"use client";

import { getPlaylists } from "@/http/api";
import { Dialog, DialogContent, DialogTrigger } from "../_components/ui/dialog";
import { Button } from "../_components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateNewPlaylist from "./_components/create-new-playlist";
import { useEffect, useState } from "react";
import PlaylistItem from "./_components/playlist-item";

type Playlist = {
  id: string;
  name: string;
  songCount: number;
};

const PlaylistsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  async function fetchPlaylists() {
    const data = await getPlaylists();
    setPlaylists(data);
  }

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Playlists</h1>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 size-4" />
              Nova Playlist
            </Button>
          </DialogTrigger>

          <DialogContent>
            <CreateNewPlaylist
              onSuccess={() => {
                setIsCreateDialogOpen(false);
                fetchPlaylists();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {playlists.length === 0 ? (
        <p>Nenhuma playlist encontrada.</p>
      ) : (
        <ul className="grid gap-2 lg:grid-cols-2">
          {playlists.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              onPlaylistUpdated={fetchPlaylists}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaylistsPage;
