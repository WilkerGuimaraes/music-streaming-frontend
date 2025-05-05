"use server";

import { patchPlaylistsPlaylistId } from "@/http/api";

interface UpdatePlaylistParams {
  playlistId: string;
  name: string;
}

export async function updatePlaylist({
  playlistId,
  name,
}: UpdatePlaylistParams) {
  await patchPlaylistsPlaylistId(playlistId, { name });
}
