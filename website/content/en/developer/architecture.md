---
title: Architecture
description:
  A shared mental model of the InKCre info-base, knowledge capabilities, and peer runtimes.
---

# Architecture

InKCre is built around one reusable **info-base**. Collection brings information into it;
Organization may improve information already there; Application retrieves, navigates, or uses it.
These are independent actions over shared graph authority, not mandatory stages in a pipeline.

## Knowledge capabilities

```text
source-native input -> Collection -----------+
                                                |
                                                v
                                       Blocks + Relations
                                                |
                     Organization -------------+------------- Application
                     improve later use                       obtain useful results
```

- **Collection** maps source-native information into durable Blocks and Relations. Correct source
  mapping may create a graph; that does not make every collected relationship an Organization
  result.
- **Organization** acts on information already in the info-base when splitting, merging, linking,
  interpreting, or another change can improve later use. It may honestly make no change.
- **Application** finds, navigates, compares, or otherwise uses existing information. Lexical
  indexes, embeddings, and projections support these queries but do not become graph authority or
  Organization output.

A **Resolver** derives use-facing meaning from a Block, its hydrated content, and the direct context
required by its contract. **Storage** owns actual bytes and opaque pointers. Neither silently gains
Collection or Organization authority.

See the canonical [product glossary](https://github.com/InKCre/docs/blob/main/10-prd/glossary.md)
and
[knowledge capability contract](https://github.com/InKCre/docs/blob/main/20-product-tdd/knowledge-capability-contract.md)
for the shared semantics.

## Info-base authority

Persisted Blocks and Relations are the shared information authority. Source-native objects, resolver
output, search indexes, embeddings, and client views may represent or accelerate parts of that
information, but none creates a parallel authoritative store merely because its native shape is
convenient.

PostgreSQL owns shared persisted state. The admitted `inkcre` schema exposes versioned relations and
functions to authenticated Peers through native PostgreSQL or PostgREST. Direct database
participation means using that protocol—not arbitrary SQL access to internal schemas or provider
objects.

The canonical
[peer database runtime contract](https://github.com/InKCre/docs/blob/main/20-product-tdd/peer-database-runtime-contract.md)
defines principals, protocol admission, lifecycle, readiness, and JWT claims.

## Peer runtimes, not frontend and backend tiers

`core-py`, `client-web`, and compatible future runtimes participate as Peers around the same
info-base. `core-py` owns migrations and the executable database lifecycle contract, but it is not a
central owner of every request path or product behavior.

Client-web demonstrates this topology: database operations use PostgREST, while runtime-owned
capabilities may use native HTTP surfaces advertised by an online Peer. The durable boundary is the
admitted protocol and capability contract, not a permanent frontend/backend hierarchy.

Read the canonical
[unit topology](https://github.com/InKCre/docs/blob/main/20-product-tdd/unit-topology.md) and
[state authority](https://github.com/InKCre/docs/blob/main/20-product-tdd/system-state-and-authority.md)
for the cross-unit contract.

## Ecosystem surfaces {#ecosystem-surfaces}

### Database Peers

An authenticated runtime can participate through native PostgreSQL or PostgREST while respecting the
admitted schema, privileges, protocol revision, and compatibility rules. Administrative schemas and
provider internals remain outside that surface.

### Extensions

An Extension packages one or more capabilities for a compatible Host. A deployment installs one
exact version; each Peer records whether it should enable that Extension. For normal operation,
**online Peer + enabled intent** means the Host is expected to run it best-effort. There is no
second durable `running` flag for users to maintain. Runtime errors and capability observations can
still show that expected activation failed.

Core supports Python wheels with explicit Host compatibility. A release may also contain a browser
distribution for client-web setup or rendering. The
[Source Extension tutorial](/developer/ecosystem/source-extension) covers the current Core Host SDK
`0.3.x` path; those programming interfaces still import Core modules and are not a standalone,
permanently stable Source SDK.

### Native HTTP and sinks

An Extension may expose its own HTTP protocol through its Host, and a Sink may make admitted
capabilities available to another tool. These are integration surfaces, not ownership shortcuts:
retrieval remains Application, Organization remains explicit, and transport does not redefine graph
authority.

## Boundaries worth preserving

- Collection, Organization, and Application remain independent actions rather than information
  states or a mandatory pipeline.
- Source-authored facts remain distinguishable from Organization-authored meaning.
- Blocks and Relations remain authoritative; indexes, embeddings, projections, and caches are
  derived support.
- Resolver meaning and Storage byte access remain distinct.
- Delivery owner, Host, Peer enablement, and capability owner do not collapse merely because one
  first-party repository currently implements several of them.

These boundaries are maintained in the canonical
[product rules](https://github.com/InKCre/docs/blob/main/10-prd/behavior/rules-and-invariants.md)
and
[cross-unit contracts](https://github.com/InKCre/docs/blob/main/20-product-tdd/cross-unit-contracts.md).
