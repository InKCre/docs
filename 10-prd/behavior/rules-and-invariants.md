# Rules And Invariants

## Info-base is the shared memory center

- rationale: reusable product memory must stay authoritative for organized information.
- violation impact: collected data becomes fragmented or source-specific.
- linked claim(s): organize information in one reusable info-base

## Multiple runtimes may operate around the same info-base

- rationale: one running node should not become the only valid participant in the system.
- violation impact: product behavior would collapse into a single-runtime assumption.
- linked claim(s): organize information in one reusable info-base

## Source, info-base, and sink remain separate responsibilities

- rationale: collection, authoritative memory, and downstream use should not blur into one uncontrolled surface.
- violation impact: ownership boundaries and future extensibility erode.
- linked claim(s): collect external information into reusable units; expose organized information for retrieval and downstream use

## Extensions add capability by registration and lifecycle hooks

- rationale: capability growth should preserve core ownership boundaries.
- violation impact: extensions could bypass durable product contracts.
- linked claim(s): collect external information into reusable units; expose organized information for retrieval and downstream use

## Resolver interpretation and storage retrieval remain distinct

- rationale: meaning and raw content access solve different product problems.
- violation impact: block semantics become harder to reason about and downstream use loses clarity.
- linked claim(s): organize information in one reusable info-base; expose organized information for retrieval and downstream use
