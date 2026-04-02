# Sustainable Vibe Coding Framework v9.2

## 0. Purpose

Sustainable Vibe Coding exists to make AI-assisted software development maintainable for a small team or a one-person company.

The framework is not a document-heavy process system. It is a selective memory system for preserving truths that are expensive to rediscover and risky to lose.

Its core job is to help humans and agents answer:

* what the product must be and why  
* what technical truths must remain stable across iterations  
* what local complexities are dangerous enough to deserve explicit design memory  
* what runtime truths matter operationally  
* how to align at the correct level of granularity when natural language alone is not enough  
* what should stay ephemeral in tasks rather than being promoted into durable docs  
* [v9.1] how agents should dynamically navigate ambiguity without falling into rigid waterfall processes or chaotic guesswork  
* [v9.2] how to colocate complexity-dissolving memory as close to the target code as possible to ensure agents automatically consume it  
* [v9.2-MR] how multiple unit repos can consume one shared durable-doc source via `docs/_shared` + git submodule without erasing local ownership

The framework should remain as small as possible. Every durable document must justify its existence.

## 1. Core principles

### 1.1 PRD is the SSoT for product what and why

The PRD owns product intent: pressures, user-visible claims, workflows, rules and product invariants, scope, and canonical product semantics. The PRD does not own implementation structure.

### 1.2 Code, tests, and guardrails are the SSoT for implementation truth

Implementation truth should live in code, tests, type systems, lint rules, CI checks, and runtime assertions. Do not use prose docs where an executable guardrail can do the job better.

### 1.3 TDD exists only where code alone is not enough

Technical design docs are not mandatory layers of ceremony. They exist only when the system contains truths that code and tests cannot cheaply preserve or communicate.

### 1.4 Tasks absorb volatility

Tasks are where exploration, iteration, temporary reasoning, and unstable decisions live. Durable docs should contain only truths that have survived enough change to deserve preservation.

### 1.5 Docs are for expensive unknowns

A durable doc should exist only when it helps future humans or agents answer questions that are: easy to get wrong, expensive to rediscover, cross-cutting, or not better enforced mechanically.

### 1.6 Do not build a second software system out of docs

Documentation is support structure, not a parallel runtime.

### 1.7 Alignment docs are coordination artifacts, not a new truth layer

When human-agent drift repeatedly comes from ambiguous references, unstable naming, or mismatched granularity, a small alignment pack may be justified. It does not replace PRD or code.

### 1.8 Use medium-native address systems

Different project types need different reference systems (e.g., frontend vs. backend). Do not force one medium's map onto another.

### 1.9 [v9.2] Spatial Locality of Memory

Truths that govern a specific boundary of code (like local invariants, change-hazards, or targeted alignment maps) should live physically next to that code, not in a centralized documentation silo. When the code is deleted, its memory should naturally die with it.

## 2. Layer model

V9.2 replaces centralized Unit TDD with Local Context, ensuring agents always find the constraints they need.

2.1 PRD layer (10-prd/): preserve product what and why.

2.2 Product TDD layer (20-product-tdd/): preserve cross-unit technical truth that outlives individual tasks.

2.3 Local Context layer (Local AGENTS.md): [Replaces 30-unit-tdd] preserve the complexity-dissolving design memory of hard local units, located directly inside the relevant source code directories.

2.4 Deployment layer (40-deployment/): preserve runtime and operational truths.

2.5 Task layer (tasks/): hold volatile work, exploration (Mode A), iteration plans, and temporary reasoning.

2.6 Alignment substrate (15-alignment/): optional, pressure-driven layer to reduce coordination drift when natural-language reference fails.

2.7 [v9.2-MR] Shared-doc distribution layer (`docs/_shared/` in unit repos): mount one shared docs repository through git submodule for cross-unit durable docs only.

## 3. Minimal filesystem

The default starting point should be minimal:

/  
├─ AGENTS.md                 <-- Global workflow (Mode A/B/C) & routing  
├─ docs/  
│  └─ 10-prd/  
└─ tasks/

Expanded form when justified by real pressure and complexity:

/  
├─ AGENTS.md                 <-- Global workflow & routing  
├─ docs/  
│  ├─ 10-prd/  
│  ├─ 15-alignment/  
│  ├─ 20-product-tdd/  
│  └─ 40-deployment/  
├─ tasks/  
└─ src/  
   └─ hard-matching-module/  
	      ├─ AGENTS.md           <-- Local constraints (Local Context / Invariants)  
	      ├─ matching.ts  
	      └─ matching.test.ts

Multi-repo profile (shared durable docs + local unit docs):

/  
├─ AGENTS.md  
├─ .agents/
│  └─ skills/
│     └─ edit-shared-docs/   <-- thin repo-root discovery wrapper if runtime only auto-loads repo-root skills
├─ docs/  
│  ├─ _shared/                <-- git submodule to shared docs repo (e.g., InKCre/docs)  
│  │  ├─ 00-meta/  
│  │  │  └─ _svc_v9_2.md  
│  │  ├─ 10-prd/  
│  │  ├─ 15-alignment/  
│  │  ├─ 20-product-tdd/  
│  │  └─ .agents/skills/      <-- canonical shared agent skills
│  └─ 40-deployment/          <-- unit-local runtime/ops docs  
├─ tasks/  
└─ src/.../AGENTS.md          <-- unit-local complexity memory

Rules for the multi-repo profile:

* Cross-unit durable docs belong to the shared docs repo and are consumed through `docs/_shared/`.  
* Unit-local runtime/ops docs stay outside `docs/_shared/` (typically `docs/40-deployment/`).  
* Local complexity memory stays near code in local AGENTS.md files.  
* If canonical shared skills live under `docs/_shared/.agents/skills/`, unit repos may expose thin repo-root wrappers under `.agents/skills/` when the runtime only auto-loads repo-root skills.  
* Do not directly edit shared docs from a unit repo worktree. Edit in the shared docs repo, push, then update the submodule pointer in the unit repo.

## 4. AGENTS.md & The Execution Protocol

AGENTS.md is the operating guide for human-agent collaboration. It acts as an entry-point state machine, not a static constitution.

### 4.1 The Global vs. Local Hierarchy [v9.2]

There are now two types of AGENTS.md files:

1. Root /AGENTS.md: Owns the global state machine (Mode A/B/C), global Pre-Execution Restatement protocol, and tells the agent *how* to navigate.  
2. Local src/.../AGENTS.md: Owns specific local invariants, localized change-hazards, and component-specific alignment maps.

### 4.2 The "Closest to Target" Consumption Logic [v9.2]

The Root AGENTS.md MUST instruct the agent with this exact retrieval logic:

*"Before executing changes in a specific directory, recursively check that directory and its parent directories for a local AGENTS.md. If found, its constraints override or append to global constraints for that specific scope."*

### 4.3 The Pre-Execution Restatement Rule

At minimum, for reference-sensitive or logic-altering changes, the agent must restate the following before writing code:

* target (path or anchor)  
* state/context  
* operation  
* scope (what is included, what is excluded)  
* invariants (what must not break)  
* likely affected files  
* uncertainty

### 4.4 The Dynamic Execution Protocol [v9.1]

Agents must assess the volatility/ambiguity of the human's request and select an operating mode:

#### Mode A: Exploration (High Volatility)

* Trigger: Vague idea, fuzzy requirement, or open-ended problem.  
* Agent Action: 1. DO NOT modify PRD, TDD, or production code.  
  2. Confine all work to tasks/ (e.g., tasks/explore-feature-x.md).  
  3. Engage in Q&A, brainstorm, and deduce first-principle requirements.

#### Mode B: Solidification (Transitioning from Chaos to Order)

* Trigger: Mode A concludes, or human provides clear but unrecorded rules.  
* Agent Action:  
  1. Categorize new truths (PRD for product, TDD for cross-unit).  
  2. Execute Pre-Execution Restatement Rule.  
  3. Await confirmation, then update durable docs before coding.

#### Mode C: Execution (Low Volatility)

* Trigger: Highly specific task, clear bug fix, or target is locked.  
* Agent Action:  
  1. Consult Local AGENTS.md (if any exist near the target code).  
  2. Execute Pre-Execution Restatement Rule.  
  3. Await confirmation, write tests, and write code directly.

### 4.5 Shared-Docs Submodule Rule [v9.2-MR]

If the repo uses `docs/_shared/` as a submodule mount:

* Treat `docs/_shared/00-meta/_svc_v9_2.md` as the shared framework baseline.  
* Treat `docs/_shared/10-prd/`, `docs/_shared/15-alignment/`, and `docs/_shared/20-product-tdd/` as shared read targets.  
* Canonical shared skills may live under `docs/_shared/.agents/skills/`; if the runtime only auto-loads repo-root `.agents/skills/`, use a thin repo-root wrapper rather than a second submodule mount.  
* Shared-doc changes must be authored in the source docs repo first, then consumed by submodule pointer update in the unit repo.  
* Unit repos should not carry ad hoc local edits inside `docs/_shared/`.

## 5. Alignment pack

### 5.1 Role of the alignment pack

Exists only when collaboration repeatedly fails because the human and the agent do not share the same reference system at the right granularity. It is a coordination artifact set.

### 5.2 Admission rule

Create 15-alignment/ only when humans and agents repeatedly drift on references, visual regions lack stable names, or state ambiguity causes wrong changes.

### 5.3 What it owns

Shared addressing formats, surface maps, controlled operation vocabulary, change request templates.

It does not own product why, business rules, or runtime topology.

### 5.4 Stable anchor rule

When a surface is edited frequently and ordinary language is insufficient, add stable anchors in code (e.g., data-region, data-element). These are coordination handles, not product truth.

## 6. PRD

### 6.1 Role of PRD

The SSoT for product truth. It answers why this feature exists, claims it makes, user-visible behavior that must remain true, scope boundaries, and canonical product terms.

### 6.2 PRD contents

* product-pressures.md  
* product-claims.md  
* workflows.md  
* rules-and-invariants.md  
* scope-and-open-questions.md  
* glossary.md (Domain terms only, not UI aliases).

## 7. Product TDD

### 7.1 Role of Product TDD

The durable technical design layer for truths that span multiple units or repos.

### 7.2 Product TDD contents

* unit-topology.md: technical boundaries.  
* system-state-and-authority.md: authoritative state vs derived state.  
* cross-unit-contracts.md: data and behavior contracts.  
* claim-realization-matrix.md: how units participate in product claims.

## 8. Local Context (Replacing Unit TDD) [v9.2]

### 8.1 Role of Local Context

The concept of a centralized 30-unit-tdd/ directory is abolished. Local complexity is documented where it hurts. This ensures the memory is highly cohesive with the code and consumed automatically by agents via spatial locality.

### 8.2 When to create a Local AGENTS.md

Create src/<module>/AGENTS.md only if at least one is true:

* The unit has non-obvious authority or state ownership.  
* Concurrency, ordering, or timing matters.  
* Failure semantics are subtle.  
* Agents repeatedly drift or regress this unit.

### 8.3 Local AGENTS.md contents

It should be extremely brief, containing only:

* Invariants: truths that must never be violated here.  
* Authority: legal write paths and state ownership for this directory.  
* Hazards: known fragile seams, misleading abstractions, and forbidden shortcuts.  
* Local Alignment: UI object maps or targeted terminology specific to this folder.

## 9. Deployment docs

Exists only when runtime and operational truth becomes non-trivial (e.g., complex topologies, risky runtime configurations, migration rationale). Keep it tightly operational.

## 10. Tasks

### 10.1 Role of tasks

Tasks are the entropy buffer of the system. The tasks/ directory is explicitly the battleground for Mode A (Exploration). It is the only safe space for an agent to hallucinate, propose temporary decisions, and map out uncertainties.

### 10.2 Principle

Do not try to make task docs permanent.

## 11. Promotion rules

Every candidate truth should pass this test before being promoted into durable docs.

### 11.1 Promotion test

Promote only if: it is stable across tasks, rediscovering it is expensive, it cannot be mechanically enforced, and it has a clear durable owner.

### 11.2 Durable destination rules

* Product what/why → PRD  
* Cross-unit technical truth → Product TDD  
* Hard-unit local complexity → Local AGENTS.md near the code  
* Runtime/ops truth → Deployment  
* Ambiguous targeting → Alignment pack

## 12. Anti-patterns

### 12.1 Using docs to compensate for missing tests

If correctness can be guarded mechanically, prefer that.

### 12.2 Creating doc families before real pain exists

Start minimal.

### 12.3 Documenting known-knowns

Do not store facts that are easy to read directly from code.

### 12.4 Turning Root AGENTS.md into constitutional law

Keep it an entry-point router, not a massive static rulebook.

### 12.5 Bypassing the Task Layer [v9.1]

Agents updating the PRD based on a vague prompt without first opening a temporary space in tasks/ (Mode A) to deduce actual requirements.

### 12.6 Orphaned Unit Docs [v9.2]

Creating central docs/30-unit-tdd/ files that humans and agents forget to read or delete. High-risk local memory must live in a Local AGENTS.md alongside the code.

## 13. Reading strategy for agents and humans

There is no universal mandatory read order. Typical path:

1. Root AGENTS.md (Assess Mode A/B/C).  
2. If present, read `docs/_shared/00-meta/_svc_v9_2.md` for shared framework profile.  
3. Local AGENTS.md (If target directory is known).  
4. Relevant alignment docs (Prefer shared first, then local if explicitly local).  
5. Relevant PRD (Prefer shared PRD for product rules).  
6. Relevant Product TDD (Prefer shared cross-unit contracts).  
7. Task docs (For current execution details).  
8. Code, tests, CI.

Note:

Reading `docs/_shared/00-meta/_svc_v9_2.md` alone is not sufficient for execution. It is a framework baseline, not a replacement for root/local AGENTS.md and task context.

## 14. Migration guidance

### 14.1 V8 to V9

Establish the strict boundaries between PRD (product) and TDD (technical). Add the alignment pack only if naming/targeting drift is recurrent.

### 14.2 V9 to V9.1

Update Root AGENTS.md to include the Dynamic Execution Protocol (Mode A/B/C). Enforce the "Task-First" rule for exploratory prompts.

### 14.3 V9.1 to V9.2

1. Add the "Closest to Target" consumption logic to Root AGENTS.md.  
2. Move any existing complex component documentation from docs/30-unit-tdd/<module>/ directly into src/<module>/AGENTS.md.  
3. Delete the docs/30-unit-tdd/ folder completely.

### 14.4 V9.2 to V9.2-MR (Multiple Unit Repos With Shared Docs)

1. Create a dedicated shared docs repo (e.g., `InKCre/docs`) containing `00-meta/`, `10-prd/`, `15-alignment/`, `20-product-tdd/`.  
2. Mount that repo in each unit as `docs/_shared/` via git submodule.  
3. Keep unit-local docs outside `docs/_shared/` (such as `docs/40-deployment/`) and keep local complexity memory in local AGENTS.md near code.  
4. Enforce update order: shared docs commit pushed first, then unit repo submodule pointer update.  
5. Add SOP/Skill/CI checks to prevent direct local edits under `docs/_shared/`.

## 15. Summary

V9.2 completes the evolution: Sustainable Vibe Coding is a selective, spatially-aware memory system, not a document empire.

* keep PRD as the SSoT for product what and why  
* keep implementation truth in code and tests  
* use Product TDD for cross-unit technical truth  
* [v9.2] colocate local complexity memory (Local AGENTS.md) directly next to the code it protects  
* [v9.2-MR] in multi-repo setups, consume shared durable docs through `docs/_shared/` submodule and keep local ownership outside that mount  
* let tasks absorb volatility  
* [v9.1] use the Dynamic Execution Protocol to force agents to buffer ambiguity in tasks/ before committing to durable docs  
* promote only what future humans and agents would otherwise struggle to recover
