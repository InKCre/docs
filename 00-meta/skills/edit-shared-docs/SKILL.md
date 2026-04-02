---
name: edit-shared-docs
description: Safely edit InKCre shared durable docs and distribute them to unit repos. Use when updating `InKCre/docs`, splitting mixed docs between shared and local owners, bumping unit repo `docs/_shared` pointers, validating `.gitmodules` target URL/reachability, or troubleshooting detached HEAD and stale submodule states.
---

# Edit Shared Docs

## Overview

Use this skill to enforce one safe workflow for shared durable docs:

1. decide whether the target truth is actually shared
2. edit `InKCre/docs` first
3. push the source commit first
4. bump unit repo `docs/_shared` pointer second

Keep shared docs and unit-local docs separated:

- shared docs in source repo `InKCre/docs`: `{00-meta,10-prd,15-alignment,20-product-tdd}`
- canonical shared skills and SOPs in source repo `InKCre/docs`: `00-meta/skills/`
- shared docs in unit repos: `docs/_shared/{00-meta,10-prd,15-alignment,20-product-tdd}`
- unit-local docs: outside `docs/_shared` (for example `docs/40-deployment` and local `AGENTS.md`)

For full command forms, read [references/commands.md](references/commands.md).

## Discoverability Profile

- The canonical skill source lives here, in `InKCre/docs/00-meta/skills/edit-shared-docs/`.
- Unit repos may expose a thin repo-root wrapper at `.agents/skills/edit-shared-docs/` because Codex auto-loads repo-root `.agents/skills`, not `docs/_shared/00-meta/skills/**` paths.
- Treat every wrapper as discovery-only. Do not fork the workflow there.

## Workflow A: Decide Shared vs Local Ownership

Apply this before editing any durable doc that may be mixed.

1. Move a statement into `InKCre/docs` only if another unit repo or shared product memory actually needs it.
2. Reject shared promotion if the statement depends on `core-py`-local class names, method names, table names, or runtime sequencing unless those names are themselves the durable contract.
3. Reject shared promotion if the remaining local details would lose a readable home.
4. Prefer local `AGENTS.md` for implementation vocabulary, runtime hazards, and manager-level mechanics.

## Workflow B: Update Shared Docs Source Repo

Apply this when the task changes shared PRD/alignment/product-tdd/framework docs.

1. Work in `InKCre/docs`.
2. Edit files under `00-meta`, `10-prd`, `15-alignment`, `20-product-tdd`, or `00-meta/skills/edit-shared-docs`.
3. Commit and push source changes.
4. Capture the source commit hash for pointer bump reference.

## Workflow C: Bump Unit Repo Pointer

Apply this when a unit repo must consume new shared docs.

1. In the unit repo, initialize or update submodule `docs/_shared`.
2. Set `docs/_shared` to the intended source commit.
3. Run `scripts/check-submodule.sh --repo-root <unit-repo> --mode pre-commit` from the canonical shared skill root.
4. Commit only the pointer bump plus the minimal local path updates that route readers correctly.

Do not edit content inside `docs/_shared` from unit repo context.

## Workflow D: Skill Shims

Apply this when a repo needs skill discoverability without duplicating the workflow.

1. Keep the canonical workflow in `00-meta/skills/edit-shared-docs/`.
2. Expose only a thin repo-root wrapper in `.agents/skills/edit-shared-docs/SKILL.md` when a unit repo needs auto-discovery.
3. Keep the wrapper short and make it point straight back to the canonical skill.
4. Document the setup in a development setup doc such as `CONTRIBUTING.md`.

## Troubleshoot

When pointer update fails or local state looks inconsistent:

1. Confirm `.gitmodules` URL points to `InKCre/docs`.
2. Confirm target commit exists on source remote.
3. Confirm submodule worktree is clean.
4. If stale, run submodule sync/update and re-run checks.

Use `scripts/check-submodule.sh` for deterministic checks.

## Hard Rules

- Never bump a unit pointer to a source commit that is not pushed.
- Never keep ad hoc local edits under `docs/_shared`.
- Never mix submodule and subtree workflows in the same rollout.
- Keep local runtime/ops docs outside `docs/_shared`.
- Do not centralize local implementation vocabulary into the shared repo just because it currently lives in `docs/20-product-tdd/` or `docs/15-alignment/`.

## Validation

Run:

```bash
scripts/check-submodule.sh --repo-root <unit-repo> --mode pre-bump
scripts/check-submodule.sh --repo-root <unit-repo> --mode pre-commit
```

If a check fails, stop and fix before commit.
