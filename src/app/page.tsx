export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <h1 className="text-center text-4xl font-bold">
        🎵 Gerenciador de Playlists
      </h1>
      <p className="text-lg text-gray-700">
        Este projeto é um sistema completo para gerenciamento de playlists
        musicais, desenvolvido com foco em performance, boas práticas e
        validação robusta de dados.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-gray-700">
        <li>
          🚀 Backend construído com <strong>Fastify</strong>, utilizando{" "}
          <strong>TypeScript</strong> e <strong>Prisma ORM</strong> para
          interagir com o banco de dados.
        </li>
        <li>
          ✅ Validação de rotas com <strong>Zod</strong> e integração com o
          plugin <code>fastify-type-provider-zod</code> para tipagem segura.
        </li>
        <li>
          🎧 Listagem de playlists com total de músicas e exibição de músicas
          dentro de cada playlist.
        </li>
        <li>
          ➕ Adição e remoção de músicas de playlists com respostas padronizadas
          e tratativas para erros (ex: música não encontrada).
        </li>
        <li>
          🧠 Separação de músicas que estão ou não dentro de uma playlist para
          facilitar o gerenciamento.
        </li>
      </ul>
      <p className="text-gray-700">
        A interface web consome a API criada e apresenta os dados de forma
        intuitiva, permitindo gerenciar playlists de forma prática e eficiente.
      </p>
    </main>
  );
}
