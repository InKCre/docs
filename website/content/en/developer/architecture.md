---
title: Architecture
description: A shared mental model of the InKCre info-base, peer runtimes, and ecosystem surfaces.
---

# Architecture

InKCre turns collected information into reusable product memory. Its architecture separates
collection, authoritative organization, interpretation, raw-content retrieval, and downstream use so
that no single runtime or transport becomes the whole product.

## Product flow

```text
external systems
  -> sources collect information
  -> blocks and relations enter the info-base
  -> resolvers interpret; storage retrieves raw content when needed
  -> sinks retrieve, index, and serve downstream use
```

A **source** gathers data from an external system. The **info-base** owns the persisted blocks and
relations that make information durable and reusable. A **resolver** interprets a block and its
local graph context, while **storage** retrieves raw content that is not inline in the block. A
**sink** consumes organized information for retrieval, indexing, embedding, or another downstream
workflow.

See the canonical [product glossary](https://github.com/InKCre/docs/blob/main/10-prd/glossary.md)
for the complete shared vocabulary.

## Peer runtimes, not frontend and backend tiers

`core-py`, `client-web`, and future units are peers around the same shared info-base. PostgreSQL is
authoritative for shared persisted state. `core-py` owns migrations and the executable database
lifecycle contract, but that responsibility does not make it the owner of every request path or
product behavior.

The web client demonstrates this topology today: its database client reads and writes through
PostgREST while other runtime behavior can use native HTTP surfaces. The durable boundary is the
admitted protocol, not a permanent frontend/backend hierarchy.

Read the canonical
[unit topology](https://github.com/InKCre/docs/blob/main/20-product-tdd/unit-topology.md) and
[state authority](https://github.com/InKCre/docs/blob/main/20-product-tdd/system-state-and-authority.md)
for the cross-unit contract.

## Database protocol

The `inkcre` PostgreSQL schema is the admitted, versioned relation and function surface for
authenticated peers. Native PostgreSQL and PostgREST expose the same admitted semantics through
different transports.

Direct database participation therefore does **not** mean arbitrary SQL access. A usable peer must
respect the admitted schema, explicit privileges, migration and lifecycle state, protocol revision,
and coordinated compatibility rules. Administrative schemas, provider internals, and objects without
contract admission are outside the protocol.

The canonical
[peer database runtime contract](https://github.com/InKCre/docs/blob/main/20-product-tdd/peer-database-runtime-contract.md)
defines protocol admission, principals, lifecycle, readiness, JWT claims, and portable acceptance.

## Ecosystem surfaces {#ecosystem-surfaces}

### Database peers

Database peer participation is the foundational ecosystem surface. An authenticated runtime can use
native PostgreSQL or PostgREST to operate the admitted protocol without becoming subordinate to one
central application server.

The current contract is concrete, but a complete third-party guide for identity, privileges,
compatibility, and worked examples is still deferred.

### Extensions

An Extension is an installable capability that adds source, resolver, or sink behavior without
forking core ownership boundaries. Installation, client-scoped enablement, and current runtime
activity are separate states:

- **installed**: the deployment has the package and persisted installation record;
- **enabled**: a particular client is permitted to run it;
- **running**: the current runtime has started it and applied its side effects.

The lifecycle and ownership model exists, but a stable third-party package format and SDK guide are
not yet public contracts.

### APIs

PostgREST and native HTTP implementations expose real integration surfaces. Their existence does not
by itself create a versioned public API promise. Endpoint reference, authentication examples, and
compatibility policy will be documented when a supported external contract is ready.

## Boundaries worth preserving

- Sources may propose graph data; the info-base owns persisted graph insertion.
- Source, info-base, and sink responsibilities remain distinct.
- Resolver interpretation and storage retrieval remain distinct.
- Embeddings are sink-owned even when ingestion triggers their generation.
- Extension `installed`, `enabled`, and `running` states must not collapse into one flag.

These boundaries are maintained in the canonical
[product rules](https://github.com/InKCre/docs/blob/main/10-prd/behavior/rules-and-invariants.md)
and
[cross-unit contracts](https://github.com/InKCre/docs/blob/main/20-product-tdd/cross-unit-contracts.md).
