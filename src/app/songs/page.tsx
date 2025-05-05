import { getSongs } from "@/http/api";

const SongsPage = async () => {
  const songs = await getSongs();

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">Músicas</h1>
        <h1>Nova música</h1>
      </div>

      {songs.length === 0 ? (
        <p>Nenhuma música encontrada.</p>
      ) : (
        <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song) => (
            <li key={song.id} className="rounded border p-4 shadow-sm">
              <p className="font-semibold">{song.title}</p>
              <p className="text-sm text-gray-600">{song.artist.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongsPage;
