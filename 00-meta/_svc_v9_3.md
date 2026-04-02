# Sustainable Vibe Coding Framework v9.3

## 0. Purpose

Sustainable Vibe Coding exists to make AI-assisted software development maintainable for a small team or a one-person company.

The framework is a selective memory system, not a document-heavy process system. Its job is to preserve truths that are expensive to rediscover and risky to lose.

Its core job is to help humans and agents answer:

- what the product must be and why
- what technical truths must remain stable across iterations
- what local complexities are dangerous enough to deserve explicit design memory
- what runtime truths matter operationally
- how to align at the correct level of granularity when natural language alone is not enough
- what should stay ephemeral in `tasks/` rather than being promoted into durable docs
- how agents should dynamically navigate ambiguity without falling into rigid waterfall processes or chaotic guesswork
- how to colocate tactical memory as close to target code as possible
- how to separate slow-moving architectural structure from fast-moving tactical hazards
- how multiple unit repos can consume one shared durable-doc source through `docs/_shared/` without erasing local ownership

Every durable document must justify its existence.

## 1. Core Principles

### 1.1 PRD is the SSoT for product what and why

PRD owns product intent: pressures, claims, workflows, scope boundaries, rules, and canonical product semantics. It does not own implementation structure.

### 1.2 Code, tests, and guardrails are the SSoT for implementation truth

Implementation truth should live in code, tests, type systems, lint rules, CI checks, and runtime assertions whenever possible.

### 1.3 TDD exists only where code alone is not enough

Technical design docs are not mandatory ceremony. They exist only where future humans or agents would otherwise struggle to recover a stable truth.

### 1.4 Tasks absorb volatility

Exploration, temporary reasoning, migrations-in-flight, and unstable choices belong in `tasks/`.

### 1.5 Docs are for expensive unknowns

Only preserve a durable truth when it is easy to get wrong, expensive to rediscover, cross-cutting, or not better enforced mechanically.

### 1.6 Do not build a second software system out of docs

Documentation is support structure, not a parallel runtime.

### 1.7 Alignment docs are coordination artifacts

`15-alignment/` exists only when human-agent drift repeatedly comes from unstable naming, ambiguous references, or mismatched granularity.

### 1.8 Use medium-native address systems

Do not force one medium's reference system onto another.

### 1.9 Pacing Layers for architecture

Separate slow-moving logical structure from fast-moving tactical hazards:

- `docs/30-unit-tdd/` owns stable logical unit architecture
- local `AGENTS.md` own tactical hazards, tripwires, and localized authority

### 1.10 Dispatcher Pattern and progressive disclosure

Root `AGENTS.md` should stay lightweight. It dispatches agents to the relevant workflow protocol, local guide, and durable truth instead of becoming a giant static constitution.

## 2. Layer Model

### 2.0 Meta Engine (`00-meta/`)

The engine layer contains framework baselines, working-mode protocols, and reusable SOPs.

### 2.1 PRD (`10-prd/`)

Preserve product what and why.

### 2.2 Product TDD (`20-product-tdd/`)

Preserve cross-unit technical truth and global topology.

### 2.3 Unit TDD (`30-unit-tdd/`)

Preserve slow-moving logical structural design inside one unit.

### 2.4 Local Context (local `AGENTS.md`)

Preserve tactical hazards, localized authority, tripwires, and file-path-adjacent change memory.

### 2.5 Deployment (`40-deployment/`)

Preserve runtime topology, operational truth, and runbooks.

### 2.6 Tasks (`tasks/`)

Hold volatile work, exploration, iteration plans, diagnostics, and migration reasoning.

### 2.7 Alignment (`15-alignment/`)

Optional coordination substrate for addressing drift.

### 2.8 Multi-Repo Shared-Docs Distribution (`docs/_shared/` in unit repos)

In a multi-repo product, shared durable docs are authored once in `InKCre/docs` and consumed by unit repos through a git submodule mount at `docs/_shared/`.

## 3. Minimal Filesystem

Minimal starting point:

```text
/
├─ AGENTS.md
├─ docs/
│  ├─ 00-meta/
│  │  ├─ _svc_v9_3.md
│  │  ├─ mode-a-explore.md
│  │  ├─ mode-b-solidify.md
│  │  ├─ mode-c-execute.md
│  │  └─ mode-d-diagnose.md
│  └─ 10-prd/
└─ tasks/
```

Expanded single-repo form when justified:

```text
/
├─ AGENTS.md
├─ docs/
│  ├─ 00-meta/
│  ├─ 10-prd/
│  ├─ 15-alignment/
│  ├─ 20-product-tdd/
│  ├─ 30-unit-tdd/
│  └─ 40-deployment/
├─ tasks/
└─ src/**/AGENTS.md
```

Multi-repo profile:

```text
/
├─ AGENTS.md
├─ .agents/
│  └─ skills/
│     └─ edit-shared-docs/
├─ docs/
│  ├─ _shared/
│  │  ├─ 00-meta/
│  │  │  ├─ _svc_v9_3.md
│  │  │  ├─ mode-a-explore.md
│  │  │  ├─ mode-b-solidify.md
│  │  │  ├─ mode-c-execute.md
│  │  │  └─ mode-d-diagnose.md
│  │  ├─ 10-prd/
│  │  ├─ 15-alignment/
│  │  ├─ 20-product-tdd/
│  │  └─ .agents/skills/
│  └─ 40-deployment/
├─ tasks/
└─ src/**/AGENTS.md
```

Rules for the multi-repo profile:

- shared PRD, shared alignment, shared product-tdd, and shared framework/meta docs belong in `InKCre/docs`
- unit-local runtime and deployment docs stay outside `docs/_shared/`
- tactical unit memory stays in local `AGENTS.md`
- unit repos may expose thin repo-root skill wrappers under `.agents/skills/` when the runtime only auto-loads repo-root skills
- do not edit shared docs inside a unit repo worktree; edit `InKCre/docs`, push, then bump the submodule pointer

## 4. AGENTS.md and the Meta Engine

### 4.1 Root AGENTS.md is a dispatcher

Root `AGENTS.md` should:

- tell agents how to choose a working mode
- tell agents how to load the closest relevant local guide
- point agents to the relevant durable layers
- avoid becoming the only place where all rules live

### 4.2 Dynamic execution protocol

Agents should select one mode based on ambiguity and risk:

- Mode A: Exploration
- Mode B: Solidification
- Mode C: Execution
- Mode D: Diagnosis

The concrete protocols live in `00-meta/mode-*.md`.

### 4.3 Closest-to-target consumption logic

Before executing changes in a specific directory, recursively check that directory and its parent directories for a local `AGENTS.md`. If found, its tactical constraints override or append to broader constraints for that scope.

### 4.4 Pre-execution restatement rule

Before reference-sensitive or logic-altering work, restate:

- target path or anchor
- current state or context
- requested operation
- scope, including explicit exclusions
- invariants that must not break
- likely affected files
- uncertainty

### 4.5 Shared-doc submodule rule

If a unit repo mounts shared docs at `docs/_shared/`:

- treat `docs/_shared/00-meta/_svc_v9_3.md` as the shared framework baseline
- treat `docs/_shared/00-meta/mode-*.md` as shared workflow baselines when no stronger local override exists
- treat `docs/_shared/10-prd/`, `docs/_shared/15-alignment/`, and `docs/_shared/20-product-tdd/` as shared read targets
- keep canonical shared skills under `docs/_shared/.agents/skills/`
- use thin repo-root wrappers under `.agents/skills/` only for discoverability, not as a forked workflow source
- author shared-doc changes in the source repo first, then bump the unit repo submodule pointer

Reading `docs/_shared/00-meta/_svc_v9_3.md` alone is not sufficient for execution. Root `AGENTS.md`, local `AGENTS.md`, tasks, code, and tests still matter.

## 5. Agent Skills and SOPs

Only promote a reusable workflow into `00-meta/` when:

1. it is meaningfully distinct from existing modes or SOPs
2. it carries strict operational constraints or repeat failure patterns
3. agents repeatedly need the same procedure and drift without it

Write SOPs in a read-do shape:

1. define triggers
2. state constraints, including what is forbidden
3. give linear read-do steps
4. define pause points
5. state exit criteria

## 6. Alignment Pack

Use `15-alignment/` only when coordination drift is real. It may own shared addressing formats, controlled vocabularies, and surface maps. It does not own product why, business rules, or runtime topology.

## 7. PRD

`10-prd/` owns product pressures, claims, workflows, rules, scope boundaries, and canonical domain terms.

## 8. Product TDD

`20-product-tdd/` owns cross-unit technical truth such as:

- unit topology
- system state and authority
- cross-unit contracts
- claim realization mapping

## 9. Unit TDD vs Local Context

### 9.1 Unit TDD (`30-unit-tdd/`) is structure

Use it for slow-moving logical unit architecture:

- cross-submodule constraints
- internal architectural boundaries
- stable technology choices that survive file moves
- naming conventions for durable internal structure

### 9.2 Local `AGENTS.md` is stuff

Use local `AGENTS.md` for:

- tactical hazards
- non-obvious authority and write paths
- ordering, timing, and failure semantics
- localized tripwires that are tightly coupled to a code boundary

Do not stuff slow-moving unit architecture into local guides if it naturally spans the whole unit and survives directory refactors.

## 10. Deployment Docs

`40-deployment/` owns runtime and operational truth, mitigation paths, and runbooks.

## 11. Tasks

`tasks/` is the entropy buffer. Exploration, diagnostics, temporary migration plans, and unstable reasoning should stay there until they prove durable.

## 12. Promotion Rules

Promote a truth into durable docs only if:

- it is stable across tasks
- rediscovering it is expensive
- it cannot be cheaply enforced mechanically
- it has a clear durable owner

Durable destination rules:

- product what/why -> PRD
- cross-unit technical truth -> Product TDD
- unit-local logical structure -> Unit TDD
- tactical localized hazards -> local `AGENTS.md`
- runtime/ops truth -> deployment docs
- ambiguous targeting aids -> alignment docs
- reusable workflows and SOPs -> `00-meta/`

## 13. Anti-Patterns

Avoid:

- using docs to compensate for missing tests or guardrails
- creating doc families before real pain exists
- documenting facts that are already obvious in code
- turning root `AGENTS.md` into constitutional law
- creating overlapping mode protocols
- bypassing `tasks/` when the request is still vague
- re-centralizing tactical local notes into shared or unit-level docs after they already have a natural local home

## 14. Reading Strategy

Typical read path:

1. root `AGENTS.md`
2. relevant mode protocol from `00-meta/` or `docs/_shared/00-meta/`
3. closest local `AGENTS.md`
4. `docs/30-unit-tdd/` if unit-level logical structure exists
5. relevant alignment docs
6. relevant PRD
7. relevant Product TDD
8. task docs
9. code, tests, and CI

In multi-repo units, read `docs/_shared/00-meta/_svc_v9_3.md` as the shared baseline when it is present.

## 15. Migration Guidance

### 15.1 v9.2 to v9.3

1. add or externalize `00-meta/` working-mode protocols
2. keep local `AGENTS.md` focused on tactical hazards
3. restore `30-unit-tdd/` only for slow-moving logical structure
4. add Mode D for strict read-only diagnosis

### 15.2 Multi-repo profile

1. author shared framework/meta docs in `InKCre/docs/00-meta/`
2. expose them to unit repos through `docs/_shared/00-meta/`
3. keep canonical shared skills in `InKCre/docs/.agents/skills/`
4. use thin repo-root wrappers in unit repos only for runtime discoverability
5. push shared-doc source changes before bumping unit repo submodule pointers

## 16. Summary

Sustainable Vibe Coding v9.3 keeps the system small and selective:

- PRD owns product what and why
- Product TDD owns cross-unit technical truth
- Unit TDD owns slow-moving logical unit architecture
- local `AGENTS.md` own tactical hazards near code
- deployment docs own runtime and ops truth
- tasks absorb volatility
- `00-meta/` holds reusable workflows and mode protocols
- multi-repo products may consume shared durable docs through `docs/_shared/` without erasing local ownership
