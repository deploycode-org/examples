# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A collection of deployable sample applications (`deploycode-org/examples`), one per top-level directory. Each example is **fully self-contained**: its own dependency manifest with pinned versions (`package.json` + lockfile, or `requirements.txt`), its own config, and a `README.md`. There is no root manifest, no workspace/monorepo tooling, and no shared code between examples — nothing is hoisted, so always `cd` into the example directory before running anything.

Examples:

- `vite/` — React 19 + TypeScript + Vite 8. Static SPA, builds to `dist/`.
- `nextjs/` — Next.js 16 App Router + React 19 + TypeScript, no Tailwind. Server app, builds to `.next/`.
- `django/` — Django 5.2 LTS served by gunicorn. One page and `/health`, no apps, SQLite. The settings package is `config/`.
- `fastapi/` — FastAPI served by uvicorn. One page, `/health` and the generated `/docs`.
- `fixed-port/` — a Node.js server on `node:http`, no dependencies, that **always listens on 8080 and ignores `PORT`**. It exists to check that the platform notices an app listening elsewhere than its domain routes to. `BIND_ADDRESS=127.0.0.1` in the service variables makes it listen on localhost only, the other case to notice. Do not "fix" it to read `PORT`.
- `dockerfile/` — a Node.js server on `node:http` built from its own `Dockerfile`, the way Railway builds a service that has one at the root of its path. It **exposes and always listens on 8080, ignoring `PORT`** — a check that the platform takes the port from `EXPOSE`. `ARG BUILD_MESSAGE` writes the build argument into `build-message.txt` and `ENV BUILT_WITH=Dockerfile` marks the image, so the page tells a Dockerfile build (and whether build-time variables arrived) from a Railpack one. Keep the file named exactly `Dockerfile`.

The Python examples are written for Railpack's own start commands: `python manage.py migrate && gunicorn --bind 0.0.0.0:${PORT:-8000} config.wsgi:application` (found through `WSGI_APPLICATION` in `config/settings.py`) and `uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}` (needs `main.py` and `uvicorn` in the requirements). Both pages print the port they listen on, which makes them a check that the platform passes `PORT`.

Each example's `README.md` is intentionally a two-line description, not documentation — deployment settings live in the hosting platform, not in the repo. Keep new READMEs in the same form.

## Commands (run from inside the example directory, e.g. `vite/`)

```bash
# vite/
npm run dev       # dev server with HMR
npm run build     # tsc -b (project references) then vite build -> dist/
npm run preview   # serve dist/ on port 3000, host: true (container-friendly)

# nextjs/
npm run dev       # next dev (Turbopack)
npm run build     # next build -> .next/ (type-checks as part of the build)
npm start         # next start, serves the production build on port 3000

# fixed-port/
npm start         # node server.js, always on port 8080

# dockerfile/
docker build -t dockerfile-example --build-arg BUILD_MESSAGE=hello .
docker run --rm -p 8080:8080 dockerfile-example   # the page shows the build message

# django/ (Python from .python-version)
python -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python manage.py check      # the closest thing to a build
.venv/bin/python manage.py runserver  # dev server on port 8000

# fastapi/
python -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn main:app --reload   # dev server on port 8000
```

There is no test suite and no linter configured in any example — `npm run build` (Node) and starting the app with the Railpack command above (Python) are the only checks. Treat a clean build and a page answering on the given `PORT` as the verification step for changes.

## Constraints that break the build

- `vite/`: `tsc -b` runs before `vite build`, so type errors fail the build. `tsconfig.app.json` sets `strict`, `noUnusedLocals`, and `noUnusedParameters` — an unused import or parameter is a build failure, not a warning.
- `dockerfile/`: the `Dockerfile` copies only `package.json` and `server.js`; a new file the server needs must be added to its `COPY`. The base image `node:22-alpine` matches `engines.node`.
- The Node examples pin `engines.node: "22"`; the Python examples pin `3.13` in `.python-version`, Railpack's default.
- `requirements.txt` in the Python examples is the full pinned set (`uv pip compile --python-version 3.13`), not a list of top-level packages. Keep `gunicorn` (Django) and `uvicorn` (FastAPI) in it: Railpack picks its start command from them.
- `vite/` TypeScript uses project references: `tsconfig.json` is a solution file that references `tsconfig.app.json` (covers `src/`) and `tsconfig.node.json` (covers `vite.config.ts` only). New config files at the example root need to be added to `tsconfig.node.json`'s `include` or they won't be type-checked.
- `nextjs/`: `next build` type-checks on its own; there is no separate `tsc` step. `next-env.d.ts` and generated route types are gitignored and regenerated on build — don't commit or hand-edit them.
- `npm audit` in `nextjs/` reports high-severity advisories in `postcss` and `sharp`, both transitive deps of `next` itself. The only offered fix is downgrading to `next@9`; leave them alone.

## Adding a new example

Create a new top-level directory mirroring the existing ones: self-contained dependencies with a committed lockfile or pinned requirements, the runtime version pinned (`engines.node: "22"` or `.python-version`), a `.gitignore` covering dependencies and the build output, and a two-line `README.md`.
