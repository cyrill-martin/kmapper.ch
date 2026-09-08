# kmapper.ch

Marketing/portfolio website for kmapper GmbH — a Nuxt 4 app with content sourced from
flat YAML files (migrated off Directus CMS in August 2026). Bilingual (de/en).

## Stack
- Nuxt 4.3 (SSR), Vue 3.5, Vue Router 4
- @nuxtjs/i18n 10.2 — locale-prefixed routing (`/de/...`, `/en/...`) + UI string translations
- naive-ui for components, @vicons/ionicons5 for icons
- yaml (npm) for parsing content files server-side
- No test runner or linter configured

## Key directories
- `frontend/app/pages/` — one file per route (about, curation, home, imprint, organization,
  privacy, projects, publication). Localized paths are mapped in `nuxt.config.ts` (`i18n.pages`).
- `frontend/app/components/` — `nav/`, `header/`, `footer/` for site chrome; `ServicePage.vue`
  is shared by curation/organization/publication.
- `frontend/app/composables/`:
  - `useContent(slug)` — fetches `content/<slug>.yaml` via `/api/content/<slug>` and resolves
    every `{de, en}` node to the current locale
  - `useSeo(seoRef)` — applies useSeoMeta from a flat `{title, description, keywords, image}` ref
  - `useScreen()`, `useMobileNav()`, `useIsHome()`, `useAppState()` — layout/UI state
- `frontend/content/*.yaml` — one file per page, the actual site copy + SEO metadata. Any object
  whose keys are exactly `de`/`en` is a translatable leaf, resolved by `useContent`'s `localize()`.
- `frontend/i18n/locales/{de,en}.json` — short reusable UI strings (nav labels, service names,
  footer/contact info) via `@nuxtjs/i18n`'s own `t()`. NOT for page content — that's YAML.
- `frontend/server/api/content/[slug].get.ts` — Nitro route reading `content/<slug>.yaml` via
  `useStorage("assets:content")` (bundled via `nitro.serverAssets` in `nuxt.config.ts`, works
  identically in dev and the built `.output` server).
- `frontend/server/routes/llms.txt.ts` — generates `/llms.txt` from `content/projects.yaml`.
- `frontend/public/images/` — static assets; service/project screenshots are pre-optimized
  (resized + palette-reduced PNGs), not originals.

## Commands
- `docker compose up -d --build` — local dev (port 3000, bind-mounted, hot reload)
- `npm run dev` / `npm run build` / `npm run preview` — inside `frontend/` if not using Docker
- No lint or test command exists yet

## Deploy
SSH to the VPS, `git pull`, `docker compose -f docker-compose.prod.yml up -d --build frontend`,
`docker builder prune -f`. Env vars via `scp .env.prod <host>:/opt/kmapper.ch/.env`. Full steps
in root `README.md`. Nginx config lives in a **separate** repo ("vps servers"), not here.

## Gotchas
- `i18n.langDir` resolves relative to `<rootDir>/i18n/`, not `app/i18n/` — that's why
  `frontend/i18n/locales/` sits outside `app/`.
- vue-i18n's message compiler treats a bare `@` as the start of `@:key` linked-message syntax —
  escape literal `@` in `i18n/locales/*.json` as `{'@'}` (e.g. `mail{'@'}kmapper.ch`), or it'll
  throw "Invalid linked format" and silently drop the whole locale file.
- `docker-compose.yml` bind-mounts `frontend/` into the container with anonymous volumes for
  `node_modules`/`.nuxt` — running `npm install`/`npm run dev` on the host at the same time the
  container is (re)created can corrupt those volumes with host-absolute paths baked into the
  build. Prefer testing through the running container, not a parallel host-side dev server.
- No Directus/CMS anymore — don't reintroduce a `useDirectus`-style composable; content changes
  are YAML edits + git.
