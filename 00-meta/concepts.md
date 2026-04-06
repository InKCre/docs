# Concept Dictionary

## Unit

- owned by layer: `00-meta/`
- one-line definition: a logical technical boundary and ownership surface; it is not the same thing as a folder.
- why it exists: to keep technical ownership stable even when files move.
- common confusion with: directories or deployment nodes.
- authoritative examples: `core-py` as one unit repo; `docs/30-unit-tdd/` as unit-local structure memory.
- when an agent should load this concept: when deciding whether a truth is cross-unit or unit-local.

## PRD

- owned by layer: `10-prd/`
- one-line definition: the durable owner of product intent and observable behavior.
- why it exists: product truth must stay separate from implementation details.
- common confusion with: TDD docs or runtime runbooks.
- authoritative examples: product claims, workflows, scope, and glossary.
- when an agent should load this concept: when a request changes product behavior, scope, or policy.

## Product TDD

- owned by layer: `20-product-tdd/`
- one-line definition: the durable owner of cross-unit technical contracts and system topology.
- why it exists: some truths matter across repos or units and are expensive to rediscover from one codebase alone.
- common confusion with: PRD or Unit TDD.
- authoritative examples: shared contracts, state authority, cross-unit topology.
- when an agent should load this concept: when another unit must rely on the same technical truth.

## Unit TDD

- owned by layer: `30-unit-tdd/`
- one-line definition: the durable owner of one unit's internal logic architecture and stable internal contracts.
- why it exists: slow-moving unit structure should survive directory refactors without leaking into local tactical notes.
- common confusion with: local `AGENTS.md` or Product TDD.
- authoritative examples: internal pipeline boundaries, stable authority paths inside one repo.
- when an agent should load this concept: when a change is structural inside one repo but does not create a cross-unit contract.

## Intent

- owned by layer: `00-meta/`
- one-line definition: an input type where the business wants new behavior, policy, scope, or strategy.
- why it exists: ownership must route to PRD before implementation starts.
- common confusion with: Constraint work that keeps behavior unchanged.
- authoritative examples: new workflow, changed product promise, scope expansion.
- when an agent should load this concept: at task entry before choosing a working mode.

## Constraint

- owned by layer: `00-meta/`
- one-line definition: an input type where behavior stays the same, but technical or environment boundaries change.
- why it exists: technical truth should be updated without rewriting product promises.
- common confusion with: Intent work disguised as implementation detail.
- authoritative examples: multi-repo topology adoption, dependency boundary changes, contract hardening.
- when an agent should load this concept: when the user asks for upgrade, migration, or technical alignment.

## Reality

- owned by layer: `00-meta/`
- one-line definition: an input type where observed runtime behavior diverges from expectation.
- why it exists: bug work must stay evidence-first.
- common confusion with: Constraint work inferred from symptoms without evidence.
- authoritative examples: outages, anomalies, data corruption, unexplained failures.
- when an agent should load this concept: when symptoms, logs, or failed tests are the primary signal.

## Artifact

- owned by layer: `00-meta/`
- one-line definition: an input type where the requested output is a bounded intermediate deliverable.
- why it exists: one-off work should stay tactical unless reuse is proven.
- common confusion with: durable architecture or product changes.
- authoritative examples: migration helper script, analysis report, one-off data transform.
- when an agent should load this concept: when the requested deliverable is a disposable artifact rather than a durable truth.

## Mode

- owned by layer: `00-meta/`
- one-line definition: the current working posture for a slice of work, independent from durable ownership.
- why it exists: the same task may need different mind-patterns as evidence changes.
- common confusion with: routing or ownership.
- authoritative examples: Explore, Solidify, Execute, Diagnose.
- when an agent should load this concept: when deciding how to work after ownership is known.

## Hub

- owned by layer: `00-meta/`
- one-line definition: the shared repo where slow-moving cross-unit truth is authored once in a multi-repo topology.
- why it exists: one authoritative upstream source reduces duplicated durable docs across Spoke repos.
- common confusion with: a deployment hub or a monorepo root.
- authoritative examples: `InKCre/docs` for shared `00-meta/`, `10-prd/`, and `20-product-tdd/`.
- when an agent should load this concept: when the active repo mounts `docs/_shared/` or when a shared truth must be edited source-first.

## Spoke

- owned by layer: `00-meta/`
- one-line definition: a repo that owns local code and local operations while consuming shared Hub truth through a nearby mount.
- why it exists: local implementation work should stay close to code without duplicating shared truth.
- common confusion with: a unit inside one monorepo.
- authoritative examples: `core-py` consuming shared docs via `docs/_shared/`.
- when an agent should load this concept: when deciding whether a truth belongs in shared docs or in local repo docs.

## Shared Mount

- owned by layer: `00-meta/`
- one-line definition: a read-mostly path such as `docs/_shared/` that gives a Spoke nearby access to Hub truth.
- why it exists: agents need local read access to shared truth without copying files.
- common confusion with: a writable local docs folder.
- authoritative examples: `docs/_shared/00-meta/_svc_v9_6.md` inside a Spoke repo.
- when an agent should load this concept: when a task touches shared truth or updates a shared ref.
