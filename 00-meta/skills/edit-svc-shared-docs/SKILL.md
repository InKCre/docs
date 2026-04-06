---
name: edit-svc-shared-docs
description: Safely edit InKCre shared docs in the Hub repo and bump Spoke `docs/_shared` refs without violating Hub/Spoke boundaries.
---

# Edit SVC Shared Docs

## Overview

Use this skill to enforce one safe workflow for shared durable docs in the optional multi-repo extension:

1. decide whether the target truth is actually shared
2. edit `InKCre/docs` first
3. push the Hub source commit first
4. bump the Spoke `docs/_shared` ref second

Keep shared docs and Spoke-local docs separated:

- Hub-owned shared docs in `InKCre/docs`: `00-meta`, `10-prd`, `15-alignment`, `20-product-tdd`
- canonical shared skills and SOPs in `InKCre/docs/00-meta/skills/`
- Spoke-local docs: outside `docs/_shared/` (for example `docs/30-unit-tdd/`, `docs/40-deployment/`, and local `AGENTS.md`)
- Hub-local volatile work: `InKCre/docs/tasks/`

For full command forms, read [references/commands.md](references/commands.md).

## Discoverability Profile

- The canonical skill source lives here, in `InKCre/docs/00-meta/skills/edit-svc-shared-docs/`.
- Spoke repos may expose a thin repo-root wrapper at `.agents/skills/edit-svc-shared-docs/` because Codex auto-loads repo-root `.agents/skills`, not `docs/_shared/00-meta/skills/**` paths.
- Treat every wrapper as discovery-only. Do not fork the workflow there.

## Workflow A: Decide Shared vs Local Ownership

Apply this before editing any doc that may be mixed.

1. Move a statement into `InKCre/docs` only if another unit repo or shared product memory actually needs it.
2. Reject shared promotion if the statement depends on one Spoke's local class names, method names, table names, or runtime sequencing unless those names are themselves the durable contract.
3. Reject shared promotion if the remaining local details would lose a readable home.
4. Prefer Spoke-local `AGENTS.md` and `docs/30-unit-tdd/` for implementation vocabulary, runtime hazards, and local mechanics.

## Workflow B: Update Hub Shared Docs

Apply this when the task changes shared PRD, alignment, product-tdd, framework, or topology docs.

1. Work in `InKCre/docs`.
2. Edit files under `00-meta`, `10-prd`, `15-alignment`, `20-product-tdd`, or `00-meta/skills/edit-svc-shared-docs`.
3. Commit and push Hub changes.
4. Capture the Hub commit hash for the Spoke ref bump.

## Workflow C: Bump Spoke Shared Ref

Apply this when a Spoke repo must consume new shared docs.

1. In the Spoke repo, initialize or update submodule `docs/_shared`.
2. Set `docs/_shared` to the intended Hub commit.
3. Run `scripts/check-submodule.sh --repo-root <spoke-repo> --mode pre-commit` from the canonical shared skill root.
4. Commit only the ref bump in the Spoke repo.

Do not edit content inside `docs/_shared` from Spoke repo context.

## Workflow D: Skill Wrappers

Apply this when a Spoke repo needs skill discoverability without duplicating the workflow.

1. Keep the canonical workflow in `00-meta/skills/edit-svc-shared-docs/`.
2. Expose only a thin repo-root wrapper in `.agents/skills/edit-svc-shared-docs/SKILL.md` when a Spoke repo needs auto-discovery.
3. Keep the wrapper short and make it point straight back to the canonical skill.
4. Document the setup in a development setup doc such as `CONTRIBUTING.md`.

## Troubleshoot

When ref update fails or local state looks inconsistent:

1. Confirm `.gitmodules` URL points to `InKCre/docs`.
2. Confirm target commit exists on source remote.
3. Confirm submodule worktree is clean.
4. If stale, run submodule sync/update and re-run checks.

Use `scripts/check-submodule.sh` for deterministic checks.

## Hard Rules

- Never bump a Spoke ref to a Hub commit that is not pushed.
- Never keep ad hoc local edits under `docs/_shared`.
- Never mix Hub edits, Spoke ref bumps, and Spoke-local code changes in the same commit.
- Keep Spoke runtime and deployment docs outside `docs/_shared`.
- Do not centralize Spoke-local implementation vocabulary into the Hub repo just because it appears important today.

## Validation

Run:

```bash
scripts/check-submodule.sh --repo-root <spoke-repo> --mode pre-bump
scripts/check-submodule.sh --repo-root <spoke-repo> --mode pre-commit
```

If a check fails, stop and fix before commit.
