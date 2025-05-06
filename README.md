# Music Streaming 🎵

## 📃 Descrição

Este é um projeto full-stack onde foi desenvolvido um sistema de gerenciamento de músicas, playlists, álbuns e artistas. A proposta é simular uma plataforma de streaming musical com funcionalidades de cadastro, organização e visualização de músicas. A aplicação conta com conceitos modernos e populares no desenvolvimento web, como formulários com validação, mutações de dados, URL State, filtros dinâmicos e integração com APIs REST e banco de dados PostgreSQL.

## 🛠 Tecnologias - frontend

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## 🧰 Recursos

- **`react-hook-form`**: Biblioteca utilizada para controlar os formulários da aplicação, cuidando da coleta de dados e validação.
- **`zod`**: Utilizada em conjunto com o `react-hook-form` para definir e validar os esquemas dos dados enviados nos formulários.
- **`radix-ui`**: Biblioteca de componentes acessíveis e estilizados, utilizada para criar elementos como `dialog`, `label`, `separator` e `tooltip`.
- **`tailwindcss`**: Utilizado para estilização de toda a aplicação, com o auxílio de plugins como `tailwind-merge` e `prettier-plugin-tailwindcss` para melhor organização e consistência.
- **`lucide-react`**: Biblioteca de ícones utilizada na interface.
- **`orval`**: Ferramenta usada para gerar clients HTTP baseados em um contrato OpenAPI.
- **`clsx` / `class-variance-authority`**: Auxiliares para composição condicional de classes CSS com Tailwind.

## 🚀 Estrutura de páginas

A aplicação é organizada por rotas utilizando a App Router do Next.js.  
Exemplos de rotas e suas funcionalidades:

- `/songs`: exibe e cadastra músicas.
- `/playlists`: gerencia playlists.
- `/playlists/[playlistId]/songs`: músicas da playlist.
- `/playlists/[playlistId]/songs/not-in-playlist`: músicas que não estão na playlist.
- `/artists`: exibe os artistas.
- `/artists/[artistId]/songs`: músicas por artista.
- `/albums`: exibe os álbuns.
- `/albums/[albumId]/songs`: músicas por álbum.

## ✅ Funcionalidades

- [✔] Cadastrar uma nova música.
- [✔] Listar músicas por artista, álbum ou playlist.
- [✔] Criar playlists.
- [✔] Adicionar ou remover músicas de playlists.
- [✔] Deletar músicas ou playlists.
- [✔] Aplicar filtros diretamente na URL com o uso do URL State.

## 🌐 Integração com backend

Todos os dados da aplicação são consumidos via API REST que faz a ponte com o banco de dados PostgreSQL. A integração é feita através de clients gerados automaticamente com a ferramenta `orval`.

Para mais detalhes sobre o backend, acesse:  
🔗 [music-streaming-backend](https://github.com/WilkerGuimaraes/music-streaming-backend)

## 🖥️ Execução local

```bash
# 1. Clone o repositório
git clone https://github.com/WilkerGuimaraes/music-streaming-frontend

# 2. Instale as dependências
npm install

# 3. Execute o projeto
npm run dev
```

## 🙋‍♂️ Desenvolvedor
Este projeto foi desenvolvido por Wilker Guimarães, com o objetivo de aplicar conhecimentos em desenvolvimento full-stack e entregar uma aplicação moderna, com funcionalidades completas para gerenciamento musical.
