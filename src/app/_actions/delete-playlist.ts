"use server";

import { deletePlaylistsPlaylistId } from "@/http/api";

export async function deletePlaylist(playlistId: string) {
  await deletePlaylistsPlaylistId(playlistId);
}
