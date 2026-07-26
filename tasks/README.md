# Tasks

This directory is the Hub-local, agent-owned task workspace of the shared docs repo.

Use it for:

- shared exploration before durable promotion
- cross-unit contract migration notes
- temporary reasoning for shared-doc upgrades
- Hub-local records of why a shared rule was added
- task evidence, verification, and human-agent collaboration state

Do not treat files here as exported durable truth.

Spoke repos may mount this repo at `docs/_shared/`, but they should not depend on `docs/_shared/tasks/` as an authoritative input.

Every non-trivial task packet must preserve this compact control surface:

- Objective
- Guardrails
- Verification
- Current Truth
- Next Step

Task packets may start as single files and split into directories when state, history, evidence, decisions, temporary work, or verification begin to interfere with each other. Split by collaboration pressure, not by a fixed taxonomy.

Exclude `tasks/` from ordinary durable-doc searches unless the active question targets task state or evidence.

Promote stable truth to its canonical owner during the work. A completed packet may be deleted without an archive or deletion-time promotion review.
