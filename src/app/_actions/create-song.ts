"use server";

import { postSongs } from "@/http/api";

interface CreateSongParams {
  title: string;
  artistName: string;
  albumTitle?: string;
}

export async function createSong(params: CreateSongParams) {
  await postSongs(params);
}
