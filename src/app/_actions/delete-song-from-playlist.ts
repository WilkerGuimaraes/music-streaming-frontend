"use server";

import { deletePlaylistsPlaylistIdSongsSongId } from "@/http/api";

interface DeleteSongFromPlaylistProps {
  playlistId: string;
  songId: string;
}

export async function deleteSongFromPlaylist({
  playlistId,
  songId,
}: DeleteSongFromPlaylistProps) {
  await deletePlaylistsPlaylistIdSongsSongId(playlistId, songId);
}
