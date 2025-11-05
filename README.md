# Matriz Educação

> Página dinâmica para a Matriz Educação.

## Requisitos

- **Node.js**: `LTS` recomendado — [nodejs.org](https://nodejs.org/)
- **NPM** (vem com o Node) — [npmjs.com](https://www.npmjs.com/)
- **Gulp CLI** (global): `npm i -g gulp-cli` — [gulpjs.com](https://gulpjs.com/)

## Instalação

```bash
npm install
```

## Desenvolvimento

Inicie o servidor de desenvolvimento (BrowserSync + watch):

```bash
gulp
# ou
npm start
```

## Build

Gera a pasta `dist/` com arquivos minificados:

```bash
npm run build
```

Gera apenas os assets principais (CSS/JS), sem servidor:

```bash
npm run generate
```

## Deploy

Após gerar o build, todo o conteúdo publicável estará em `dist/`.

- **Servidor estático (Apache/Nginx)**:

  - Faça upload de todo o conteúdo de `dist/` para o diretório público do seu servidor.

- **PHP (formulários / send.php)**:
  - Garanta que o servidor seja compatível com PHP.

### Notas

- A pasta `dist/maps/` não é necessária em produção.
- A task de imagens usa TinyPNG para compressão. A chave está definida no `gulpfile.js`. Se não desejar usar, ajuste a chave ou desabilite a task `images` no build.
- Estrutura de origem: `source/` (SASS, JS, Nunjucks e páginas) → saída em `dist/`.
