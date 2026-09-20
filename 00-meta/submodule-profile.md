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

## Choosing A Durable Owner

Choose the owner from the meaning of a claim, not from the file where it was first written or the component currently
consuming it.

- Hub PRD owns product intent and vocabulary shared across units; Hub Product TDD owns stable cross-unit topology and
  interoperability.
- A Spoke Unit TDD owns that Spoke's expensive internal contract. A nearby `AGENTS.md` owns only repeated hazards for its
  physical subtree.
- The component that defines a capability owns its contract. A consumer may describe how it selects or combines the
  capability, but must link to the owner instead of maintaining a second definition.
- Importance, first-party delivery, or use by several consumers does not by itself promote a local implementation fact into
  Hub truth. Conversely, putting a claim in the Hub does not make it cross-unit.
- Current normative behavior, historical observation, implementation example, and active-task proposal are different kinds
  of statements. Only the normative owner may define the contract; examples and task packets must be labelled and cannot
  become competing authority.

When a claim is misplaced, move its definition to the semantic owner, leave only the consumer-specific consequence and a
reference at the old location, then verify that one definition remains.

## Guardrails

- Spoke repos should reject ad hoc edits under `docs/_shared/`.
- CI should validate `.gitmodules` URL, pointer reachability, and path allowlist usage.
- Shared-doc freshness should be enforced by deterministic checks, not by memory.
