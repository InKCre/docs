# Shared Docs Submodule Profile

## Purpose

This file defines how unit repositories consume shared durable docs from `InKCre/docs`.

## Source Of Truth

- Shared durable docs are authored in this repository.
- Unit repositories consume them through a git submodule mount at `docs/_shared/`.

## Exported Paths

- `docs/00-meta/**`
- `docs/10-prd/**`
- `docs/15-alignment/**`
- `docs/20-product-tdd/**`

## Non-Exported Paths

- Any path outside the exported allowlist above.

## Update Order (Mandatory)

1. Edit and merge shared docs in `InKCre/docs`.
2. Push shared repo commit first.
3. Update submodule pointer in unit repo.
4. Validate and merge unit repo pointer bump.

## Unit-Local Ownership

- Unit-local runtime and deployment docs stay in unit repo local paths, not in `docs/_shared/`.
- Unit-local complexity memory stays near code in local `AGENTS.md`.

## Guardrails

- Unit repos should reject ad hoc edits under `docs/_shared/`.
- CI should validate `.gitmodules` URL, pointer reachability, and path allowlist usage.
