# Sustainable Vibe Coding Framework v9.8

> Version: v9.8
> Last edit on: 2026-06-07T17:01+08:00

Sustainable Vibe Coding exists to make AI-assisted software development maintainable for a small team or a one-person company.

The framework is not a document-heavy process system. It is a selective memory system for preserving truths that are expensive to rediscover and risky to lose.

The framework stays intentionally small:

- Root AGENTS classifies the perturbation before acting.
- PRD remains the single source of truth for product intent and observable behavior.
- Code and tests remain the single source of implementation truth.
- TDD-style docs exist only where code and tests are not enough.
- Tasks provide agent-owned, task-local workspaces for volatile work, while non-trivial work still carries minimal guardrails.
- Concepts load progressively: cheat sheet first, full dictionary only on demand.
- Mode Dispatch is reusable SOP overlays rather than the only dispatcher.
- Implementation taste grounds non-trivial code design and implementation in SSoT, trust boundaries, semantic naming, and complexity ROI.
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
- how to keep agent workspaces readable and inspectable during human-agent collaboration
- how to apply implementation taste without turning creative engineering into waterfall design
- how to keep volatile task material out of ordinary source and durable-doc search

## Core Principles

- Typed input taxonomy comes first: before changing docs or code, classify the perturbation as Intent, Constraint, Reality, or Artifact so blast radius and durable owner are explicit.
- Mode Dispatch is a mind-pattern layer: Explore, Solidify, Execute, and Diagnose are still valid SOPs, but they are not a one-task-one-mode pipeline.
- Creative engineering is non-linear: design formation, verification preparation, implementation shape, execution, and diagnosis can reshape each other.
- Verification is not only a post-Execute gate: prepare the proof shape once a design claim is stable enough, and let it constrain execution.
- PRD is the SSoT for product what and why: PRD is pressure-driven and follows one-way derivation from drivers to behavior to derived domain structure.
- Code, tests, and guardrails are the SSoT for implementation truth: implementation truth should live in code, tests, type systems, lint rules, CI checks, and runtime assertions.
- Implementation taste guides non-trivial code design and implementation: preserve SSoT, respect trust and provenance, name durable semantics directly, and spend complexity only for clear return.
- TDD exists only where code alone is not enough: technical design docs are not mandatory ceremony.
- Tasks absorb volatility through agent-owned workspaces with MVT anchors: every non-trivial task carries Objective & Hypothesis, Guardrails Touched, and Verification.
- Progressive ontology beats full-context dumping: keep only a cheat sheet in root AGENTS and load `concepts.md` only when classification or boundary language becomes ambiguous.
- Alignment docs are coordination artifacts, not a new truth layer: Alignment Substrate is admitted only when coordination repeatedly drifts.
- Human intent may stay fuzzy, but boundary-crossing execution must compile into a low-entropy coordination grammar before durable truth is mutated.
- Topology extensions load progressively: keep mono-repo as default; load extension protocols only when the repo shape requires them.
- Multi-repo is optional: add Hub/Spoke rules only when one product spans repos; do not push `docs/_shared` workflows onto mono-repo by default.

## Front-Door Execution Loop

1. Classify the incoming perturbation as Intent, Constraint, Reality, or Artifact.
2. Identify the owning layer and blast radius before choosing how to work.
3. For non-trivial work, open or update an agent-owned task packet with the three MVT anchors.
4. Keep the packet current when discussion, exploration, implementation friction, or verification changes the working state.
5. Select the current mode overlay: Explore, Solidify, Execute, or Diagnose.
6. Load only the anchors needed for this route, mode, and active topology, including Implementation Taste for non-trivial code work.
7. Search source and durable docs with volatile workspaces excluded by default.
8. Make changes only inside the owning layer for that truth.
9. Promote new knowledge only when it passes the promotion test.

## Task Packet Contract

Task packets are bounded workspaces, not merely task files.

Every non-trivial packet should remain:

- agent-owned: the agent may create, update, split, and reorganize it inside the task boundary
- task-local: temporary reasoning, evidence, and scratch artifacts stay inside the bounded workspace
- human-inspectable: current state and next steps remain readable and steerable by the human
- recoverable: a resumed agent can restore state from a compact control surface
- non-durable: packet content is not source truth until it passes the promotion test
- search-isolated: ordinary source and durable-doc search excludes volatile packet content

The compact control surface includes MVT anchors, current understanding, confirmed constraints, active mode or transition, and next step.

A packet may start as a single file. Split it into `tasks/<task-id>/packet.md` plus adjacent notes or work files only when collaboration pressure makes state, history, evidence, decisions, temporary work, or verification interfere with each other.

## Source Search Default

For ordinary source and durable-doc search, exclude:

- `tasks/` and task-local scratch surfaces
- temporary directories
- generated output such as `build/`, `dist/`, and coverage reports
- dependency folders
- virtual environments and tool caches

Search those surfaces only when the active question targets them, when recovering the active packet, or when reviewing task evidence.

## Alignment Escalation And Impact Handshake

Most tasks need only MVT. Expand into Alignment Substrate when references, object boundaries, operations, state/context, evidence, or blast radius are too ambiguous for safe mutation.

Before mutating durable truth after that escalation, or whenever the blast radius is not obviously local, restate:

- Address and Object
- State Diff (`From -> To`)
- Operation and expected side effects
- Blast Radius Forecast
- Invariants Check
- Verification
- remaining uncertainty

If evidence or ownership is still unclear, return to Explore or Diagnose instead of handshaking a guess.

## Implementation Taste Contract

Load `00-meta/implementation-taste.md` for non-trivial code design or implementation changes that shape structure, boundaries, data, state, authority, durable naming, abstraction, or complexity budget.

Do not load it for mechanical edits whose owner, surface, and verification are already obvious.

## Layer Model

1. Meta Engine Layer (`00-meta/`): typed dispatcher protocols, mode SOPs, Implementation Taste, on-demand concepts, and minimal route-specific scaffolds
2. PRD Layer (`10-prd/`): product what, why, observable behavior, and business glossary
3. Alignment Substrate (`15-alignment/`): optional pressure-driven coordination grammar
4. Product TDD Layer (`20-product-tdd/`): cross-unit technical truth and global topology
5. Unit TDD Layer (`30-unit-tdd/`): logical structural design independent of src folder movement
6. Local Context Layer (local `AGENTS.md`): tactical hazards and recurrence tripwires tied to exact code areas
7. Deployment Layer (`40-deployment/`): runtime and operations truths
8. Task Layer (`tasks/`): agent-owned, task-local workspaces for volatile work, diagnosis, artifacts, evidence, and temporary reasoning

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
|   |   |-- concepts.md
|   |   `-- implementation-taste.md
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
|   |   |   |-- _svc_v9_8.md
|   |   |   |-- multi-repo.md
|   |   |   |-- input-*.md
|   |   |   |-- mode-*.md
|   |   |   |-- concepts.md
|   |   |   |-- implementation-taste.md
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
- open or update an agent-owned task packet for non-trivial work and keep its control surface current
- load route docs, mode SOPs, and topology extensions progressively
- load Implementation Taste for non-trivial code work
- exclude volatile workspaces and generated surfaces from ordinary source and durable-doc search
- point to the nearest local `AGENTS.md` before code changes
- avoid becoming a giant static constitution

Reading `docs/_shared/00-meta/_svc_v9_8.md` alone is not sufficient for execution. Root `AGENTS.md`, local `AGENTS.md`, tasks, code, and tests still matter.

## Section Index

- framework baseline: `00-meta/_svc_v9_8.md`
- topology extension: `00-meta/multi-repo.md`
- route docs: `00-meta/input-intent.md`, `00-meta/input-constraint.md`, `00-meta/input-reality.md`, `00-meta/input-artifact.md`
- mode SOPs: `00-meta/mode-a-explore.md`, `00-meta/mode-b-solidify.md`, `00-meta/mode-c-execute.md`, `00-meta/mode-d-diagnose.md`
- concept dictionary: `00-meta/concepts.md`
- implementation taste: `00-meta/implementation-taste.md`
- shared-doc mutation skill: `00-meta/skills/edit-svc-shared-docs/`
- PRD package: `10-prd/index.md`
- Product TDD package: `20-product-tdd/`

## Anti-patterns

Avoid:

- routing work by ambiguity alone instead of typed input classification
- treating modes as durable owners
- assuming one task equals one mode
- treating creative engineering as a rigid design-to-code-to-verification pipeline
- treating task packets as private scratchpads or append-only logs
- letting volatile task packets, generated output, dependencies, or caches pollute ordinary search
- loading the full ontology by default
- mixing framework ontology with business language
- applying abstractions, patterns, generality, or optimization without proving their complexity return
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

### v9.6 -> v9.7

1. Rename Alignment Pack to Alignment Substrate so it is treated as a reusable coordination grammar rather than a static document bundle.
2. Model alignment with object, address, operation, invariants, state/context, evidence, and protocol.
3. Prefer calculable maps from stable code anchors over hand-maintained static maps.
4. Express requested mutations as declarative `From -> To` state diffs.
5. Bind operation verbs to verification contracts and use an Impact Handshake before non-local durable mutations.

### v9.7 -> v9.8

1. Treat task packets as agent-owned, task-local workspaces that remain readable, inspectable, and steerable by the human.
2. Preserve a compact control surface with MVT anchors, current understanding, and next step.
3. Split packets by collaboration pressure when state, history, evidence, decisions, temporary work, or verification begin to interfere.
4. Exclude volatile workspaces, generated output, dependencies, caches, and virtual environments from ordinary source and durable-doc search.
5. Add `00-meta/implementation-taste.md` for language- and tech-stack-neutral implementation judgment.
6. Load Implementation Taste for non-trivial changes that shape structure, boundaries, data, authority, durable naming, abstraction, or complexity budget.
7. Preserve SSoT, classify cross-boundary value provenance, name durable semantics directly, and spend complexity only for clear return.

## Summary

Sustainable Vibe Coding v9.8 keeps the system small and selective:

- typed input decides ownership
- mode decides working posture
- creative engineering remains non-linear
- PRD owns product truth
- Product TDD owns cross-unit technical truth
- Unit TDD owns slow-moving unit structure
- local `AGENTS.md` own tactical hazards near code
- tasks are agent-owned workspaces with compact, human-inspectable control surfaces
- Implementation Taste guides non-trivial implementation judgment
- volatile work stays isolated from ordinary source and durable-doc search
- multi-repo loads only when real topology pressure exists
