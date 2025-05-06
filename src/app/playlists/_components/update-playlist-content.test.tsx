import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UpdatePlaylistContent from "./update-playlist-content";
import { updatePlaylist } from "@/app/_actions/update-playlist";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";

// Mock da action
vi.mock("@/app/_actions/update-playlist", () => ({
  updatePlaylist: vi.fn(),
}));

const renderInDialog = (ui: React.ReactElement) => {
  render(
    <Dialog open>
      <DialogContent>{ui}</DialogContent>
    </Dialog>,
  );
};

describe("<UpdatePlaylistContent />", () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza corretamente os campos e botões", () => {
    renderInDialog(
      <UpdatePlaylistContent playlistId="123" onSuccess={mockOnSuccess} />,
    );

    expect(screen.getByText("Renomear playlist")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome*:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
  });

  it("mostra erro de validação quando o nome é muito curto", async () => {
    renderInDialog(
      <UpdatePlaylistContent playlistId="123" onSuccess={mockOnSuccess} />,
    );

    const input = screen.getByLabelText("Nome*:");
    const submitButton = screen.getByRole("button", { name: "Salvar" });

    await userEvent.clear(input);
    await userEvent.type(input, "ab"); // muito curto
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("O nome da playlist é obrigatório"),
    ).toBeInTheDocument();
  });

  it("chama updatePlaylist com os dados corretos e executa onSuccess", async () => {
    const mockedUpdatePlaylist = vi.mocked(updatePlaylist);
    mockedUpdatePlaylist.mockResolvedValue();

    renderInDialog(
      <UpdatePlaylistContent playlistId="123" onSuccess={mockOnSuccess} />,
    );

    const input = screen.getByLabelText("Nome*:");
    const submitButton = screen.getByRole("button", { name: "Salvar" });

    await userEvent.clear(input);
    await userEvent.type(input, "Nova Playlist");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(updatePlaylist).toHaveBeenCalledWith({
        playlistId: "123",
        name: "Nova Playlist",
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
