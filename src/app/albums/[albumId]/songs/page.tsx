import { getAlbumsAlbumIdSongs } from "@/http/api";

interface AlbumIdSongsParams {
  params: {
    albumId: string;
  };
}

const AlbumIdSongs = async ({ params }: AlbumIdSongsParams) => {
  const { albumTitle, songs } = await getAlbumsAlbumIdSongs(params.albumId);

  return (
    <div className="px-4">
      <h1 className="mb-4 text-2xl">
        Músicas do Álbum: <span className="font-bold">{albumTitle}</span>
      </h1>

      {songs.length === 0 ? (
        <p>Este álbum ainda não possui músicas.</p>
      ) : (
        <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song, index) => (
            <li
              key={index}
              className="flex items-center justify-start rounded border px-4 py-8 shadow-sm"
            >
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-muted-foreground text-sm">
                  {song.artistName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumIdSongs;
