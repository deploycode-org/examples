# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A collection of deployable sample applications (`deploycode-org/examples`), one per top-level directory. Each example is **fully self-contained**: its own `package.json`, lockfile, tsconfig, and `README.md`. There is no root `package.json`, no workspace/monorepo tooling, and no shared code between examples — nothing is hoisted, so always `cd` into the example directory before running anything.

Examples:

- `vite/` — React 19 + TypeScript + Vite 8. Static SPA, builds to `dist/`.
- `nextjs/` — Next.js 16 App Router + React 19 + TypeScript, no Tailwind. Server app, builds to `.next/`.

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
```

There is no test suite and no linter configured in any example — `npm run build` is the only automated check. Treat a clean build as the verification step for changes.

## Constraints that break the build

- `vite/`: `tsc -b` runs before `vite build`, so type errors fail the build. `tsconfig.app.json` sets `strict`, `noUnusedLocals`, and `noUnusedParameters` — an unused import or parameter is a build failure, not a warning.
- Both examples pin `engines.node: "22"`.
- `vite/` TypeScript uses project references: `tsconfig.json` is a solution file that references `tsconfig.app.json` (covers `src/`) and `tsconfig.node.json` (covers `vite.config.ts` only). New config files at the example root need to be added to `tsconfig.node.json`'s `include` or they won't be type-checked.
- `nextjs/`: `next build` type-checks on its own; there is no separate `tsc` step. `next-env.d.ts` and generated route types are gitignored and regenerated on build — don't commit or hand-edit them.
- `npm audit` in `nextjs/` reports high-severity advisories in `postcss` and `sharp`, both transitive deps of `next` itself. The only offered fix is downgrading to `next@9`; leave them alone.

## Adding a new example

Create a new top-level directory mirroring the existing ones: self-contained dependencies with a committed lockfile, `engines.node: "22"` in `package.json`, a `.gitignore` covering `node_modules` and the build output, and a two-line `README.md`.
