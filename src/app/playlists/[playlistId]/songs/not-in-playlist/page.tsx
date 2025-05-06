"use client";

import { addSongToPlaylist } from "@/app/_actions/add-song-to-playlist";
import { Button } from "@/app/_components/ui/button";
import { getPlaylistsPlaylistIdSongsNotInPlaylist } from "@/http/api";
import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

interface NotInPlaylistPageProps {
  params: Promise<{
    playlistId: string;
  }>;
}

interface Song {
  id: string;
  title: string;
  artistName: string;
}

const NotInPlaylistPage = ({ params }: NotInPlaylistPageProps) => {
  const { playlistId } = use(params);

  const [songs, setSongs] = useState<Song[]>([]);

  const fetchSongs = useCallback(async () => {
    const songs = await getPlaylistsPlaylistIdSongsNotInPlaylist(playlistId);
    setSongs(songs);
  }, [playlistId]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <div className="px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Adicionar Músicas à Playlist</h1>

        <Button asChild>
          <Link href={`/playlists/${playlistId}/songs`}>
            Voltar para Playlist
          </Link>
        </Button>
      </div>

      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => (
          <li
            key={song.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{song.title}</h2>
              <p className="text-sm text-gray-600">{song.artistName}</p>
            </div>

            <Button
              onClick={async () => {
                await addSongToPlaylist({ playlistId, songId: song.id });
                fetchSongs();
              }}
              className="cursor-pointer bg-emerald-700 hover:bg-emerald-600"
            >
              <PlusIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotInPlaylistPage;
