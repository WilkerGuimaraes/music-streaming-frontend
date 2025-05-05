"use server";

import { deleteSongsSongId } from "@/http/api";

export async function deleteSong(songId: string) {
  await deleteSongsSongId(songId);
}
