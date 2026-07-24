# Hub-Spoke Shared Docs Profile

## Purpose

This file defines how Spoke repositories consume shared durable docs from the Hub repo `InKCre/docs`.

## Source Of Truth

- Shared durable docs are authored in this repository.
- Spoke repositories consume them through a git submodule mount at `docs/_shared/`.
- SVC framework guidance is not copied into this Hub. Each repository adopts the released CLI independently and queries its packaged corpus.

## Exported Durable Paths

- `00-meta/**`
- `10-prd/**`
- `15-alignment/**`, when admitted and present
- `20-product-tdd/**`

## Hub-Local Paths

- `tasks/**`
- `svc.json`
- `.agents/skills/svc/**`
- `AGENTS.md`
- `docs/index.md`
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
- SVC adoption state and generated navigation stay in each Spoke rather than arriving through the shared mount.

## Guardrails

- Spoke repos should reject ad hoc edits under `docs/_shared/`.
- CI should validate `.gitmodules` URL, pointer reachability, and path allowlist usage.
- Shared-doc freshness should be enforced by deterministic checks, not by memory.
