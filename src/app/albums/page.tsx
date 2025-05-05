import { getAlbums } from "@/http/api";
import Link from "next/link";

const AlbumsPage = async () => {
  const albums = await getAlbums();

  return (
    <div className="px-4">
      <h1 className="mb-4 text-2xl font-bold">Álbuns</h1>
      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <li key={album.id} className="rounded border p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{album.title}</h2>
            <p className="text-gray-700">Artista: {album.artistName}</p>
            <p className="text-gray-600">
              Quantidade de músicas: {album.songCount}
            </p>

            <Link
              href={`/albums/${album.id}/songs`}
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

export default AlbumsPage;
