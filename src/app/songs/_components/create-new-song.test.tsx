import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { CreateNewSong } from "./create-new-song";
import userEvent from "@testing-library/user-event";

// Mock da ação do backend
vi.mock("@/app/_actions/create-song", () => ({
  createSong: vi.fn().mockResolvedValue(undefined),
}));

// Função auxiliar para envolver o componente no Dialog
const renderInDialog = (ui: React.ReactNode) => {
  render(
    <Dialog open>
      <DialogContent>{ui}</DialogContent>
    </Dialog>,
  );
};

describe("<CreateNewSong />", () => {
  it("renderiza o formulário corretamente", () => {
    renderInDialog(<CreateNewSong />);
    expect(screen.getByLabelText(/Nome da música/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do artista/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do álbum/i)).toBeInTheDocument();
  });

  it("exibe erro se os campos obrigatórios não forem preenchidos", async () => {
    renderInDialog(<CreateNewSong />);
    fireEvent.submit(screen.getByRole("button", { name: /salvar/i }));

    await screen.findByText(/O título é obrigatório/);
    await screen.findByText(/O nome do artista é obrigatório/);
  });

  it("envia o formulário com dados válidos", async () => {
    const onSuccess = vi.fn();

    renderInDialog(<CreateNewSong onSuccess={onSuccess} />);

    await userEvent.type(screen.getByLabelText(/Nome da música/i), "Imagine");
    await userEvent.type(
      screen.getByLabelText(/Nome do artista/i),
      "John Lennon",
    );
    await userEvent.type(screen.getByLabelText(/Nome do álbum/i), "Imagine");

    fireEvent.submit(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
