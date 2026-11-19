# Pokédex — Catálogo de Pokémon

Projeto da disciplina de Tecnologia para Frontend Avançado.

Aplicação web para consultar Pokémon, visualizar suas características e pesquisar por nome ou número.

## Integrantes

Demetrios Alejandro Tavares Barbosa


## Páginas

- **Home:** lista de Pokémon com busca por nome ou número
- **Detalhes:** imagem, tipos, habilidades e atributos
- **Favoritos:** Pokémon marcados como favoritos pelo usuário

## Tecnologias

- React + TypeScript + Vite
- MUI (biblioteca de componentes)
- React Router
- Axios
- PokéAPI

## Já incluído no scaffold

- Vite + React + TypeScript
- MUI, tema claro/escuro e layout
- React Router com as rotas principais
- Contextos de tema e favoritos
- Tipos TypeScript da API
- Instância Axios configurada
- Componentes de carregamento, erro e estado vazio
- Páginas e arquivos TODO para o desenvolvimento do grupo

## Estrutura de pastas

```
src/
├── components/   # Componentes reutilizáveis
├── context/      # Contextos de tema e favoritos
├── pages/        # Home, Detalhes, Favoritos e 404
├── services/     # Chamadas à API
└── types/        # Tipos TypeScript
```

## Executar

```
npm install
npm run dev
```

## Build

```
npm run build
```

API: https://pokeapi.co/docs/v2
