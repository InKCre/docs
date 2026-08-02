# Product Claims

## Claim: InKCre collects external information into reusable units

- claim intent: source-specific information should become reusable product memory instead of remaining transient output or a parallel source-native object store.
- evaluation dimensions: collection persists the information as blocks and relations, preserves source meaning needed for later use, and keeps source configuration separate from graph authority.
- evidence expectation: collection workflows persist a resolver-readable graph; run-oriented workflows also record collect-job lifecycle state without making that lifecycle part of the information itself.
- source rationale: `../_drivers/market-and-user-pressures.md`, `../_drivers/operational-realities.md`
- realization pointers: `../../20-product-tdd/system-state-and-authority.md`, `../../20-product-tdd/cross-unit-contracts.md`
- impact on existing claims: collection supplies information that organization and application may later act on, but the three capabilities are not mandatory lifecycle stages.

## Claim: InKCre organizes information in one reusable info-base

- claim intent: information already present in the info-base should be maintained or transformed when doing so improves later use.
- evaluation dimensions: an organization operation states the use improvement it seeks, preserves graph authority, and defines the correctness and partial-effect boundaries of its changes.
- evidence expectation: breakdown, merge, linking, or a later-discovered operation produces an observable improvement or a testable structural result on existing information; those examples are not an exhaustive taxonomy.
- source rationale: `../_drivers/business-and-service-objectives.md`, `../_drivers/hard-constraints.md`, `../_drivers/operational-realities.md`
- realization pointers: `../../20-product-tdd/system-state-and-authority.md`, `../../20-product-tdd/cross-unit-contracts.md`
- impact on existing claims: organization optimizes reusable product memory; it does not own collection-time graph construction or retrieval indexes.

## Claim: InKCre reliably collects RSS and Atom feeds

- claim intent: a configured syndication source should preserve feed-authored information as reusable graph state while avoiding avoidable duplicate updates.
- evaluation dimensions: RSS 2.0 and Atom sources use exact native identity when available, scope incremental state to its authority, keep full text separate from feed-authored content, and expose enclosure materialization as an explicit policy or command.
- evidence expectation: real RSS and Atom documents prove create, replay, update, conditional request, unidentified-item policy, partial failure, full-text enrichment, and semantic enclosure behavior through the ordinary collect-job path.
- source rationale: `../_drivers/market-and-user-pressures.md`, `../_drivers/operational-realities.md`
- realization pointers: `../../20-product-tdd/knowledge-capability-contract.md`, `../../20-product-tdd/claim-realization-matrix.md`
- impact on existing claims: feed collection realizes the general collection claim; it does not add a feed-reader UI, make enrichment primary authority, or require fuzzy content identity.

## Claim: InKCre exposes info-base information for retrieval and downstream use

- claim intent: people and downstream capabilities should be able to find and navigate useful information in the info-base.
- evaluation dimensions: feature retrieval, semantic retrieval, and graph-navigation retrieval have explicit query, result, ranking or path semantics and may depend on resolver output.
- evidence expectation: an application capability returns useful results from graph authority without taking over source or info-base ownership; indexes and embeddings remain derived support owned by that application capability.
- source rationale: `../_drivers/market-and-user-pressures.md`, `../_drivers/business-and-service-objectives.md`
- realization pointers: `../../20-product-tdd/cross-unit-contracts.md`, `../../20-product-tdd/unit-topology.md`
- impact on existing claims: application can consume collected or organized information; it does not require every result to pass through an organization stage first.

## Claim: InKCre accepts memo-like capture through familiar clients

- claim intent: a person should be able to capture thoughts, observations, and small pieces of information from a memo client while InKCre keeps the resulting information in its info-base.
- evaluation dimensions: a compatible write reports success only after its primary memo mutation is persisted, memo reads are reconstructed from resolver output, and attachments or comments remain independently reusable graph components.
- evidence expectation: at least one released memo client completes its write/read journey against an extension-owned compatible backend and the resulting blocks and relations remain usable without that client.
- source rationale: `../_drivers/market-and-user-pressures.md`, `../_drivers/operational-realities.md`
- realization pointers: `../../20-product-tdd/knowledge-capability-contract.md`, `../../20-product-tdd/claim-realization-matrix.md`
- impact on existing claims: backend compatibility and future collector ingestion are separate access modes over one memo-family graph meaning; neither creates a second memo authority.
