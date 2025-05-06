import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateNewPlaylist from "./create-new-playlist";
import { vi } from "vitest";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";

// Mock da action
const mockedCreatePlaylist = vi.fn();

vi.mock("@/app/_actions/create-playlist", () => ({
  createPlaylist: (name: string) => mockedCreatePlaylist(name),
}));

// Função auxiliar para envolver o componente no Dialog
const renderInDialog = (ui: React.ReactNode) => {
  render(
    <Dialog open>
      <DialogContent>{ui}</DialogContent>
    </Dialog>,
  );
};

describe("<CreateNewPlaylist />", () => {
  beforeEach(() => {
    mockedCreatePlaylist.mockReset();
  });

  it("renderiza corretamente os campos do formulário", () => {
    renderInDialog(<CreateNewPlaylist />);

    expect(screen.getByLabelText(/Nome da playlist/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
  });

  it("exibe mensagem de erro se o campo estiver vazio", async () => {
    renderInDialog(<CreateNewPlaylist />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /salvar/i }));

    expect(
      await screen.findByText(/O nome da playlist é obrigatório/i),
    ).toBeInTheDocument();
  });

  it("chama createPlaylist com o nome correto e executa onSuccess", async () => {
    const onSuccess = vi.fn();
    renderInDialog(<CreateNewPlaylist onSuccess={onSuccess} />);

    const user = userEvent.setup();
    const input = screen.getByLabelText(/Nome da playlist/i);

    await user.type(input, "Minha Playlist");
    await user.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(mockedCreatePlaylist).toHaveBeenCalledWith("Minha Playlist");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
