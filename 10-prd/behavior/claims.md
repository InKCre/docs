# Product Claims

## Claim: InKCre collects external information into reusable units

- claim intent: collected data should become reusable product memory instead of remaining source-specific transient output.
- evaluation dimensions: collection creates durable units, collection execution state is trackable, and collection semantics stay separate from source type configuration.
- evidence expectation: collection workflows create blocks or relations and record collect-job lifecycle state.
- source rationale: `../_drivers/market-and-user-pressures.md`, `../_drivers/operational-realities.md`
- realization pointers: `../../20-product-tdd/system-state-and-authority.md`, `../../20-product-tdd/cross-unit-contracts.md`
- impact on existing claims: this claim is upstream of organization and retrieval claims.

## Claim: InKCre organizes information in one reusable info-base

- claim intent: collected information should be normalized into a shared memory center where units can be linked and interpreted later.
- evaluation dimensions: blocks and relations remain durable graph state, resolver and storage roles remain distinct, and the info-base can serve multiple runtimes.
- evidence expectation: persisted graph state survives beyond one collection run and supports later interpretation.
- source rationale: `../_drivers/business-and-service-objectives.md`, `../_drivers/hard-constraints.md`, `../_drivers/operational-realities.md`
- realization pointers: `../../20-product-tdd/system-state-and-authority.md`, `../../20-product-tdd/cross-unit-contracts.md`
- impact on existing claims: this claim turns collected data into reusable product memory.

## Claim: InKCre exposes organized information for retrieval and downstream use

- claim intent: sinks and downstream workflows should be able to retrieve, index, embed, and use information already organized in the info-base.
- evaluation dimensions: downstream use reads from organized memory, sink ownership stays distinct, and retrieval behavior can depend on resolver output.
- evidence expectation: sinks can consume blocks and their resolved meaning without taking over source or info-base authority.
- source rationale: `../_drivers/market-and-user-pressures.md`, `../_drivers/business-and-service-objectives.md`
- realization pointers: `../../20-product-tdd/cross-unit-contracts.md`, `../../20-product-tdd/unit-topology.md`
- impact on existing claims: this claim depends on the collection and organization claims remaining true.
