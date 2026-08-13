# Unit Topology

## Purpose

Define cross-unit technical boundaries and ownership so changes do not leak responsibilities.

## Current Baseline

- This file is initialized as a scaffold.
- Add stable cross-unit boundaries only after they are confirmed by at least one real integration change.

## Database Peer Topology

- `core-py`, `client-web`, and future units are peer nodes; frontend/backend hierarchy is not
  part of the durable topology.
- Native PostgreSQL and PostgREST are transports over one admitted database protocol, not
  separate semantic authorities.
- Every authenticated peer may operate the complete admitted protocol surface. Different
  transports and deployments still use distinct login principals and secret custody.
- Migration authority, runtime capability, HTTP authentication, and anonymous access remain
  separate trust boundaries.
- Peer equality does not imply identical execution ability. A business facade may execute
  locally on a capable Peer or delegate one exact synchronous capability to another live
  Peer without turning the deployment into a fixed frontend/backend hierarchy.

## Knowledge Capability Topology

- The [Knowledge Capability Contract](knowledge-capability-contract.md) owns the shared
  collection, organization, application, graph, resolver, storage, and extension-protocol
  boundaries.
- A unit may implement more than one capability, but that does not merge their authority:
  collection proposes source-derived graph changes, info-base owns persisted graph state,
  resolver interprets hydrated content and relations, storage owns byte access mechanics, and
  application owns derived retrieval support.
- Extension lifecycle and extension-owned protocol authentication are runtime capability
  boundaries, not a terminal-user or graph-ownership boundary.
- Semantic retrieval and synchronous capability delegation use the shared
  [Semantic Retrieval And Peer Capability Contract](semantic-retrieval-and-peer-capabilities.md).
- Lexical feature retrieval，multimodal AI content transport，faithful media materialization，
  Organization media interpretation and List-host navigation use the shared
  [Feature Retrieval And Media Interpretation Contract](feature-retrieval-and-media-interpretation.md).
