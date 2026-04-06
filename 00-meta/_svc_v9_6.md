# Sustainable Vibe Coding Framework v9.6

> Version: v9.6
> Last edit on: 2026-04-06T11:46+08:00

Sustainable Vibe Coding exists to make AI-assisted software development maintainable for a small team or a one-person company.

The framework is not a document-heavy process system. It is a selective memory system for preserving truths that are expensive to rediscover and risky to lose.

The framework stays intentionally small:

- Root AGENTS classifies the perturbation before acting.
- PRD remains the single source of truth for product intent and observable behavior.
- Code and tests remain the single source of implementation truth.
- TDD-style docs exist only where code and tests are not enough.
- Tasks absorb volatility, but non-trivial work still carries minimal guardrails.
- Concepts load progressively: cheat sheet first, full dictionary only on demand.
- Mode Dispatch is reusable SOP overlays rather than the only dispatcher.
- Topology extensions are pressure-driven: keep mono-repo as default; load multi-repo only when one product outgrows one repo.

Its core job is to help humans and agents answer:

- what the product must be and why
- what technical truths must remain stable across iterations
- what local complexities are dangerous enough to deserve explicit design memory
- what runtime truths matter operationally
- how to align at the correct level of granularity when natural language alone is not enough
- what should stay ephemeral in tasks rather than being promoted into durable docs
- how to extend mono-repo only when topology pressure requires it
- how to classify incoming work before choosing a document owner or mutation path
- how to explore ambiguous work without drifting away from core guardrails
- how to keep core ontology available without bloating the context window
- how to switch mind-patterns during a task without confusing durable ownership

## Core Principles

- Typed input taxonomy comes first: before changing docs or code, classify the perturbation as Intent, Constraint, Reality, or Artifact so blast radius and durable owner are explicit.
- Mode Dispatch is a mind-pattern layer: Explore, Solidify, Execute, and Diagnose are still valid SOPs, but they are not a one-task-one-mode pipeline.
- PRD is the SSoT for product what and why: PRD is pressure-driven and follows one-way derivation from drivers to behavior to derived domain structure.
- Code, tests, and guardrails are the SSoT for implementation truth: implementation truth should live in code, tests, type systems, lint rules, CI checks, and runtime assertions.
- TDD exists only where code alone is not enough: technical design docs are not mandatory ceremony.
- Tasks absorb volatility with MVT anchors: every non-trivial task carries Objective & Hypothesis, Guardrails Touched, and Verification.
- Progressive ontology beats full-context dumping: keep only a cheat sheet in root AGENTS and load `concepts.md` only when classification or boundary language becomes ambiguous.
- Alignment docs are coordination artifacts, not a new truth layer.
- Topology extensions load progressively: keep mono-repo as default; load extension protocols only when the repo shape requires them.
- Multi-repo is optional: add Hub/Spoke rules only when one product spans repos; do not push `docs/_shared` workflows onto mono-repo by default.

## Front-Door Execution Loop

1. Classify the incoming perturbation as Intent, Constraint, Reality, or Artifact.
2. Identify the owning layer and blast radius before choosing how to work.
3. For non-trivial work, open a task packet with the three MVT anchors.
4. Select the current mode overlay: Explore, Solidify, Execute, or Diagnose.
5. Load only the anchors needed for this route, mode, and active topology.
6. Make changes only inside the owning layer for that truth.
7. Promote new knowledge only when it passes the promotion test.

## Layer Model

1. Meta Engine Layer (`00-meta/`): typed dispatcher protocols, mode SOPs, on-demand concepts, and minimal route-specific scaffolds
2. PRD Layer (`10-prd/`): product what, why, observable behavior, and business glossary
3. Alignment Substrate (`15-alignment/`): optional pressure-driven coordination support
4. Product TDD Layer (`20-product-tdd/`): cross-unit technical truth and global topology
5. Unit TDD Layer (`30-unit-tdd/`): logical structural design independent of src folder movement
6. Local Context Layer (local `AGENTS.md`): tactical hazards and recurrence tripwires tied to exact code areas
7. Deployment Layer (`40-deployment/`): runtime and operations truths
8. Task Layer (`tasks/`): volatile work, diagnosis, artifacts, and temporary reasoning

> Product truth and implementation truth remain separate by design.
> Input type decides ownership; mode decides the current working posture.
> Mono-repo stays the default startup shape; topology extensions such as multi-repo load only when real pressure demands them.

## Minimal Filesystem

Minimal default shape:

```text
/
|-- AGENTS.md
|-- docs/
|   |-- 00-meta/
|   |   |-- input-intent.md
|   |   |-- input-constraint.md
|   |   |-- input-reality.md
|   |   |-- input-artifact.md
|   |   |-- mode-a-explore.md
|   |   |-- mode-b-solidify.md
|   |   |-- mode-c-execute.md
|   |   |-- mode-d-diagnose.md
|   |   `-- concepts.md
|   `-- 10-prd/
|       |-- index.md
|       `-- glossary.md
`-- tasks/
```

When the multi-repo extension is active, Spoke repos read shared Hub truth through `docs/_shared/`:

```text
Spoke repo
|-- AGENTS.md
|-- .agents/
|   `-- skills/
|       `-- edit-svc-shared-docs/
|-- docs/
|   |-- _shared/
|   |   |-- 00-meta/
|   |   |   |-- _svc_v9_6.md
|   |   |   |-- multi-repo.md
|   |   |   |-- input-*.md
|   |   |   |-- mode-*.md
|   |   |   |-- concepts.md
|   |   |   `-- skills/edit-svc-shared-docs/
|   |   |-- 10-prd/
|   |   `-- 20-product-tdd/
|   |-- 30-unit-tdd/
|   `-- 40-deployment/
`-- tasks/
```

## Root AGENTS Contract

Root `AGENTS.md` should stay lightweight. It should:

- classify the incoming perturbation first
- load route docs, mode SOPs, and topology extensions progressively
- point to the nearest local `AGENTS.md` before code changes
- avoid becoming a giant static constitution

Reading `docs/_shared/00-meta/_svc_v9_6.md` alone is not sufficient for execution. Root `AGENTS.md`, local `AGENTS.md`, tasks, code, and tests still matter.

## Section Index

- framework baseline: `00-meta/_svc_v9_6.md`
- topology extension: `00-meta/multi-repo.md`
- route docs: `00-meta/input-intent.md`, `00-meta/input-constraint.md`, `00-meta/input-reality.md`, `00-meta/input-artifact.md`
- mode SOPs: `00-meta/mode-a-explore.md`, `00-meta/mode-b-solidify.md`, `00-meta/mode-c-execute.md`, `00-meta/mode-d-diagnose.md`
- concept dictionary: `00-meta/concepts.md`
- shared-doc mutation skill: `00-meta/skills/edit-svc-shared-docs/`
- PRD package: `10-prd/index.md`
- Product TDD package: `20-product-tdd/`

## Anti-patterns

Avoid:

- routing work by ambiguity alone instead of typed input classification
- treating modes as durable owners
- assuming one task equals one mode
- loading the full ontology by default
- mixing framework ontology with business language
- loading topology extensions by default in mono-repo work
- using docs to compensate for missing tests
- bypassing the task layer when the work is still vague

## Migration Guidance

### v9.3 -> v9.4

1. Restructure PRD from flat files to one-way derivation folders: `_drivers/`, `behavior/`, and `domain-structure/`.
2. Replace flat product summaries with claim-centered PRD files.
3. Move business vocabulary ownership out of alignment docs and into `10-prd/glossary.md`.

### v9.4 -> v9.5

1. Replace mode-only front-door dispatch in root `AGENTS.md` with typed input classification.
2. Keep Mode Dispatch as reusable SOPs, but decouple it from ownership.
3. Add `input-*.md`, `concepts.md`, and MVT task anchors.

### v9.5 -> v9.6

1. Keep mono-repo as the default posture.
2. Move Hub/Spoke and shared-mount rules into the optional multi-repo extension.
3. Use a dedicated shared-doc skill such as `edit-svc-shared-docs` when the extension is active.

## Summary

Sustainable Vibe Coding v9.6 keeps the system small and selective:

- typed input decides ownership
- mode decides working posture
- PRD owns product truth
- Product TDD owns cross-unit technical truth
- Unit TDD owns slow-moving unit structure
- local `AGENTS.md` own tactical hazards near code
- tasks absorb volatility with lightweight anchors
- multi-repo loads only when real topology pressure exists
