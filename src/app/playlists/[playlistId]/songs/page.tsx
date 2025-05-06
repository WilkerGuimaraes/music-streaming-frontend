import { getPlaylistsPlaylistIdSongs } from "@/http/api";

interface PlaylistSongsPageProps {
  params: {
    playlistId: string;
  };
}

const PlaylistSongsPage = async ({ params }: PlaylistSongsPageProps) => {
  const { playlistName, songs } = await getPlaylistsPlaylistIdSongs(
    params.playlistId,
  );

  return (
    <div className="px-4">
      <h1 className="mb-6 text-2xl">
        Músicas da Playlist: <span className="font-bold">{playlistName}</span>
      </h1>

      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((item) => (
          <li
            key={item.id}
            className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.song.title}</h2>
              <p className="text-sm text-gray-600">{item.song.artist.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistSongsPage;
