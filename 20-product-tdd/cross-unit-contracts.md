# Cross-Unit Contracts

## Purpose

Record durable data and behavior contracts that span more than one unit repository.

## Current Baseline

- This file is initialized as a scaffold.
- Add only contracts that cannot be safely inferred from one unit's code alone.

## Peer Database Runtime Contract

- All units that directly operate shared persisted state consume the canonical
  [Peer Database Runtime Contract](peer-database-runtime-contract.md).
- The contract owns database protocol admission, peer principals, lifecycle semantics,
  readiness, JWT claims, and portable acceptance. Unit repositories own only their
  implementation and provider-specific deployment mechanics.

## Extension State Contract

- `installed`, `enabled`, and `running` are different states and must not be collapsed into one concept.
- `installed` means the deployment has the extension package and its persisted installation record.
- `enabled` means a specific client is allowed to run that extension.
- `running` means the current runtime has actually started that extension and applied its runtime side effects.
- Starting or stopping an extension is not a pure flag flip; it changes runtime capabilities and API surface for that client.

## Info-Base Ownership Contract

- Collection, organization, application, graph authority, resolver/storage composition,
  extension protocol authentication, and the Memos reference integration are owned by the
  [Knowledge Capability Contract](knowledge-capability-contract.md).
- Sources and extensions may propose graph data, but info-base owns persisted graph insertion.
- Embedding generation may be triggered during ingestion, but embeddings remain derived
  application support rather than source-owned or info-base-owned authority.
- Generic one-shot Jobs and Crons, Source graph anchors and writable-Storage selection, the
  Mail reference graph/materialization integration, and info-base navigation/solved-content
  boundaries are owned by the same Knowledge Capability Contract.

## Semantic Retrieval And Peer Capability Contract

- Semantic projection, profile-scoped derived records, explicit maintenance, ranked result
  semantics, focal-block rumination, exact capability discovery, and synchronous Peer
  delegation are owned by the
  [Semantic Retrieval And Peer Capability Contract](semantic-retrieval-and-peer-capabilities.md).
- Peer discovery and invocation remain separate. The generic Peer layer sees exact capability
  identities and opaque protocol payloads; each business capability keeps its typed request,
  result, and local execution semantics.

## Feature Retrieval And Media Interpretation Contract

- Block-local lexical projection，derived-record maintenance，explainable ranked results，
  multimodal AI content parts，faithful Resolver text materialization，system-driven media
  interpretation and List-host navigation are owned by the
  [Feature Retrieval And Media Interpretation Contract](feature-retrieval-and-media-interpretation.md).
- Resolver materialization and Organization may add graph facts，but the lexical retrieval
  owner alone maintains lexical records。Exact synchronous retrieval uses the generic Peer
  protocol without giving PeerManager the query or result meaning。

## Graph Navigation Retrieval Contract

- Endpoint-closed graph read models，bounded Block/Relation neighborhoods，shortest-path
  outcomes，random focal selection and presentation separation are owned by the
  [Graph Navigation Retrieval Contract](graph-navigation-retrieval.md).
- Peer implementations may query shared graph authority directly. InfoBase views realize
  navigation and presentation without becoming the owner of retrieval semantics.
