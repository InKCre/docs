# Hub-Spoke Shared Docs Profile

## Purpose

This file defines how Spoke repositories consume shared durable docs from the Hub repo `InKCre/docs`.

## Source Of Truth

- Shared durable docs are authored in this repository.
- Spoke repositories consume them through a git submodule mount at `docs/_shared/`.

## Exported Durable Paths

- `00-meta/**`
- `10-prd/**`
- `15-alignment/**`
- `20-product-tdd/**`

## Hub-Local Paths

- `tasks/**`
- any path outside the exported allowlist above

Hub-local paths may exist in the mounted repo, but Spoke agents should not treat them as exported durable truth.

## Update Order (Mandatory)

1. Edit and push shared docs in the Hub repo first.
2. Update the Spoke shared ref second.
3. Validate freshness and path boundaries before merge.

## Spoke-Local Ownership

- Spoke runtime and deployment docs stay outside `docs/_shared/`.
- Spoke-local complexity memory stays near code in local `AGENTS.md`.
- Spoke structural memory stays in `docs/30-unit-tdd/`.

## Guardrails

- Spoke repos should reject ad hoc edits under `docs/_shared/`.
- CI should validate `.gitmodules` URL, pointer reachability, and path allowlist usage.
- Shared-doc freshness should be enforced by deterministic checks, not by memory.
