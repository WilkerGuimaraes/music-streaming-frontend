import { getArtistsArtistIdSongs } from "@/http/api";

interface ArtistIdSongs {
  params: {
    artistId: string;
  };
}

const ArtistIdSongs = async ({ params }: ArtistIdSongs) => {
  const { artistName, songs } = await getArtistsArtistIdSongs(params.artistId);

  return (
    <div className="px-4">
      <h1 className="mb-4 text-2xl">
        Músicas do(a) Artista: <span className="font-bold">{artistName}</span>
      </h1>

      {songs.length === 0 ? (
        <p>Este artista ainda não possui músicas.</p>
      ) : (
        <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between rounded border p-4 shadow-sm"
            >
              <p className="font-semibold">{song.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistIdSongs;
