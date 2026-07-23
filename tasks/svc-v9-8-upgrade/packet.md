# SVC v9.8 Shared Projection Upgrade

## MVT Core

- Objective & Hypothesis: upgrade the InKCre shared SVC projection from v9.6 to v9.8 so every Spoke can consume one authoritative framework baseline.
- Guardrails Touched: preserve shared-doc source ownership; do not invent product truth; do not create Alignment Substrate artifacts without repeated coordination pressure.
- Verification: the Hub exposes the v9.8 baseline, Implementation Taste, task workspace/search rules, and Impact Handshake semantics from upstream SVC commit `b87c3a6`, with all internal paths resolving.

## Current State

- Current Understanding: the Hub worktree contains a validated v9.8 source projection, and the user has authorized its isolated commit and push before any Spoke ref bump.
- User-Confirmed Constraints: `core-py` must align to SVC v9.8; product PRD and Product TDD are out of scope; Hub, shared-ref, and Spoke-local commits stay isolated.
- Active Mode or Transition Note: Constraint; Execute after source and migration evidence were verified.
- Next Step: publish the isolated Hub source commit, then return to `core-py` for the shared-ref bump.

## Exploration Scaffold

- Perturbation: a Spoke requested SVC v9.8 alignment.
- Input Type: Constraint.
- Governing Anchors: upstream SVC commit `b87c3a6`, `00-meta/multi-repo.md`, and `00-meta/skills/edit-svc-shared-docs/`.
- Impact Hypothesis: Spokes will gain agent-owned task workspaces, search isolation, Implementation Taste, Alignment Substrate escalation, and Impact Handshake behavior without product or runtime changes.
- Temporary Assumptions: the version-independent shared-doc skill and existing Hub/Spoke topology remain valid under v9.8.
- Negotiation Triggers: pause if the upgrade would require product claims, cross-unit contracts, or non-optional Alignment Substrate artifacts.
- Promotion Candidates: none beyond the upstream v9.8 framework projection.

## Execution Notes

- key findings:
  - upstream SVC v9.8 is represented by commit `b87c3a6`.
  - the version-independent multi-repo extension and shared-doc skill remain valid.
  - no product or cross-unit contract change is required.
- decisions made:
  - hard-cut the current framework baseline from `_svc_v9_6.md` to `_svc_v9_8.md`.
  - add Implementation Taste as a separate progressively loaded shared meta document.
  - update Constraint, Execute, concepts, and Hub task guidance only where v9.8 changes their active behavior.
  - preserve historical v9.6 task notes and leave `15-alignment/` empty until real coordination pressure appears.
- final outcome: Hub source diff and path checks pass; this isolated change publishes the v9.8 shared projection for Spoke consumption.

## Verification Evidence

Upstream semantic mapping from SVC commit `b87c3a6`:

- v9.7 Alignment Substrate and Impact Handshake:
  - `00-meta/_svc_v9_8.md`
  - `00-meta/concepts.md`
  - `00-meta/mode-c-execute.md`
- v9.8 task workspace and progressive split:
  - `00-meta/_svc_v9_8.md`
  - `tasks/README.md`
- v9.8 search isolation:
  - `00-meta/_svc_v9_8.md`
  - `tasks/README.md`
- v9.8 Implementation Taste and mode hooks:
  - `00-meta/implementation-taste.md`
  - `00-meta/mode-a-explore.md`
  - `00-meta/mode-b-solidify.md`
  - `00-meta/mode-c-execute.md`
  - `00-meta/mode-d-diagnose.md`

Reproducible checks:

```bash
git -C /Volumes/WorkSSD/Development/InKCre/docs diff --check

git -C /Volumes/WorkSSD/Development/svc show \
  b87c3a6:src/sections/implementation-taste.md

rg -n \
  'Alignment Substrate|Impact Handshake|agent-owned|search-isolated|Implementation Taste' \
  /Volumes/WorkSSD/Development/InKCre/docs/00-meta \
  /Volumes/WorkSSD/Development/InKCre/docs/tasks
```

Result: required v9.7/v9.8 semantics and projected paths are present; no whitespace errors were found.
