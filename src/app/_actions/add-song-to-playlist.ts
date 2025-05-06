"use server";

import { putPlaylistsPlaylistIdSongs } from "@/http/api";

interface AddSongToPlaylistProps {
  playlistId: string;
  songId: string;
}

export async function addSongToPlaylist({
  playlistId,
  songId,
}: AddSongToPlaylistProps) {
  await putPlaylistsPlaylistIdSongs(playlistId, { songId });
}
