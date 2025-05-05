"use server";

import { postPlaylists } from "@/http/api";

export async function createPlaylist(name: string) {
  await postPlaylists({ name });
}
