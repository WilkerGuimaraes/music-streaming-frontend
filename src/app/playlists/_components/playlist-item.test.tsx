import { render, screen, waitFor } from "@testing-library/react";
import PlaylistItem from "./playlist-item";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Mocks
const mockedDeletePlaylist = vi.fn();

vi.mock("@/app/_actions/delete-playlist", () => ({
  deletePlaylist: (id: string) => mockedDeletePlaylist(id),
}));

// Mock do componente filho usado no modal
vi.mock("./update-playlist-content", () => ({
  default: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess}>Salvar alterações</button>
  ),
}));

describe("<PlaylistItem />", () => {
  const playlist = {
    id: "playlist-1",
    name: "Rock Clássico",
    songCount: 10,
  };

  const onPlaylistUpdated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza informações da playlist", () => {
    render(
      <PlaylistItem
        playlist={playlist}
        onPlaylistUpdated={onPlaylistUpdated}
      />,
    );

    expect(screen.getByText(/Rock Clássico/)).toBeInTheDocument();
    expect(
      screen.getByText(/Quantidade de músicas:/i).parentElement,
    ).toHaveTextContent("10");
  });

  it('possui link para "Ver músicas"', () => {
    render(
      <PlaylistItem
        playlist={playlist}
        onPlaylistUpdated={onPlaylistUpdated}
      />,
    );

    const link = screen.getByRole("link", { name: /ver músicas/i });
    expect(link).toHaveAttribute("href", "playlists/playlist-1/songs");
  });

  it("abre o modal ao clicar em 'Atualizar playlist' e chama onPlaylistUpdated após salvar", async () => {
    render(
      <PlaylistItem
        playlist={playlist}
        onPlaylistUpdated={onPlaylistUpdated}
      />,
    );

    const updateButton = screen.getByRole("button", {
      name: /atualizar playlist/i,
    });

    await userEvent.click(updateButton);

    const salvarButton = screen.getByText(/salvar alterações/i);
    await userEvent.click(salvarButton);

    expect(onPlaylistUpdated).toHaveBeenCalledTimes(1);
  });

  it("chama deletePlaylist e onPlaylistUpdated ao clicar em deletar", async () => {
    render(
      <PlaylistItem
        playlist={playlist}
        onPlaylistUpdated={onPlaylistUpdated}
      />,
    );

    const deleteButton = screen.getByRole("button", {
      name: "",
    });

    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedDeletePlaylist).toHaveBeenCalledWith("playlist-1");
      expect(onPlaylistUpdated).toHaveBeenCalled();
    });
  });
});
