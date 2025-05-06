"use client";

import { deleteSongFromPlaylist } from "@/app/_actions/delete-song-from-playlist";
import { Button } from "@/app/_components/ui/button";
import { getPlaylistsPlaylistIdSongs } from "@/http/api";
import { PlusCircle, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";

interface PlaylistSongsPageProps {
  params: Promise<{
    playlistId: string;
  }>;
}

interface Song {
  id: string;
  song: {
    title: string;
    artist: {
      name: string;
    };
  };
}

const PlaylistSongsPage = ({ params }: PlaylistSongsPageProps) => {
  const { playlistId } = use(params);

  const [songs, setSongs] = useState<Song[]>([]);
  const [playlistName, setPlaylistName] = useState("");

  const fetchPlaylistsSongs = useCallback(async () => {
    const { playlistName, songs } =
      await getPlaylistsPlaylistIdSongs(playlistId);
    setSongs(songs);
    setPlaylistName(playlistName);
  }, [playlistId]);

  useEffect(() => {
    fetchPlaylistsSongs();
  }, [fetchPlaylistsSongs]);

  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="mb-2 flex justify-between">
        <h1 className="mb-6 text-2xl">
          Músicas da Playlist:{" "}
          <span className="flex-1 font-bold">{playlistName}</span>
        </h1>

        <Button asChild>
          <Link href={`/playlists/${playlistId}/songs/not-in-playlist`}>
            <PlusCircle />
            Adicionar músicas
          </Link>
        </Button>
      </div>

      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.song.title}</h2>
              <p className="text-sm text-gray-600">{item.song.artist.name}</p>
            </div>

            <Button
              variant={"ghost"}
              onClick={async () => {
                await deleteSongFromPlaylist({
                  playlistId: playlistId,
                  songId: item.id,
                });
                fetchPlaylistsSongs();
              }}
            >
              <Trash2Icon className="text-red-500" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistSongsPage;
