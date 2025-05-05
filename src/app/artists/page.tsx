import { getArtists } from "@/http/api";
import Link from "next/link";

const ArtistsPage = async () => {
  const artists = await getArtists();

  return (
    <div className="px-4">
      <h1 className="mb-6 text-2xl font-bold">Artistas</h1>

      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <li
            key={artist.id}
            className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-4 shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{artist.name}</h2>
              <p className="text-sm text-gray-600">
                {artist.songCount} música(s) • {artist.albumCount} álbum(s)
              </p>
            </div>

            <Link
              href={`/artists/${artist.id}/songs`}
              className="mt-4 inline-block w-fit rounded bg-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Ver músicas
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsPage;
