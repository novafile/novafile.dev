# novafile.dev

The website for **NOVA**, the _Notation for Objects, Values & Agents_. The specification
lives in [novafile/spec](https://github.com/novafile/spec); the reference implementation in
[novafile/nova](https://github.com/novafile/nova).

## Stack

- Node 22, [Corepack](https://nodejs.org/api/corepack.html) and Yarn 4 (`nodeLinker: node-modules`)
- [SvelteKit](https://svelte.dev/docs/kit) with `@sveltejs/adapter-static`: every page is prerendered
- [Vite](https://vite.dev), configured in `vite.config.ts` (SvelteKit options live there too)
- [Storybook](https://storybook.js.org) for the component library
- [Shiki](https://shiki.style) with the NOVA TextMate grammars, run at build time

## Getting started

```sh
corepack enable
yarn install
yarn dev            # http://localhost:5173
yarn storybook      # http://localhost:6006
```

| Script                                    | Does                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| `yarn tokens`                             | Generates CSS variables and a typed token list from `tokens/tokens.json` |
| `yarn dev`                                | Development server                                                       |
| `yarn build`                              | Static site in `build/`                                                  |
| `yarn preview`                            | Serves the built site                                                    |
| `yarn check`                              | Svelte and TypeScript checks                                             |
| `yarn storybook` / `yarn build-storybook` | Component library                                                        |
| `yarn lint` / `yarn format`               | Prettier                                                                 |

## Structure

```
tokens/tokens.json             design tokens (W3C format), the source of every color and size
src/lib/styles/                generated tokens.css and global base styles
src/lib/components/atoms/      logo, icon, button, tag, status pill, section band
src/lib/components/molecules/  code block, copy command, theme toggle, cards, section header
src/lib/components/organisms/  header, footer, representation switcher, comparison table, …
src/lib/components/templates/  site shell and the comparison page layout
src/lib/content/               page copy and code samples
src/lib/highlight/             Shiki setup, token-colored theme, NOVA grammars
src/routes/                    pages: / and /vs/yaml/
```

Imports inside the app use the `#lib/*` subpath import (`package.json` `imports`), which
replaces `$lib` in SvelteKit 3.

### Design tokens

Edit `tokens/tokens.json`, then run `yarn tokens`. Colors that change in dark mode carry the
dark value in `$extensions["dev.novafile.modes"].dark`. The generated files are committed, and
CI fails when they are out of date. Components use only `var(--nv-*)` values.

### Content rules

- Claims about NOVA link to the section of the specification they come from.
- Proposals that are not normative yet are labelled "Proposed".
- No benchmark or token-savings numbers that the specification does not make.

## Deployment

The site deploys to GitHub Pages from `main` through `.github/workflows/ci.yml`. Deployment is
off until the repository variable `DEPLOY_PAGES` is set to `true` and Pages uses
"GitHub Actions" as its source; GitHub Pages on a private repository needs a paid plan.
