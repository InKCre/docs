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
output, search indexes, embeddings, and app views may represent or accelerate parts of that
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

The Python, TypeScript, Rust, and macOS implementations participate as Peers around the same
info-base. `impl-py` owns migrations and the executable database lifecycle contract, but it is not a
central owner of every request path or product behavior.

The Web app demonstrates this topology: database operations use PostgREST, while runtime-owned
capabilities may use native HTTP surfaces advertised by an online Peer. The durable boundary is the
admitted protocol and capability contract, not a permanent frontend/backend hierarchy.

Peers that people interact with directly should normally support local named connections and a
current selection. Fixed service processes, including an `impl-py` server deployed for one
info-base, can use a single deployment-configured connection. This recommendation follows the
runtime's use rather than its language or repository: the CLI shipped by `impl-py` has a separate
local connection list. Switching changes the foreground target without moving information or
retargeting work already bound to an instance. The canonical
[Peer connection guidance](https://github.com/InKCre/docs/blob/main/10-prd/behavior/capabilities.md#peer-本地连接管理推荐)
owns the scope; [Manage Connections](/guide/connections) describes the user procedures.

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

A deployment shares one Extension identity, configuration, and business state. Each Peer chooses a
compatible distribution and exact version, and stores its own enablement intent. The Host reports
what actually loads and runs. A change to one Peer's selection leaves the other Peers' selections
intact.

Python wheels and browser Module Federation distributions have independent release versions. A
signed macOS app can carry its own bundled distribution. The
[extension release and installation contract](https://github.com/InKCre/docs/blob/main/20-product-tdd/extension-release-and-installation.md)
defines how these releases and Peer choices fit together. The
[Source Extension tutorial](/developer/ecosystem/source-extension) covers the Python Host path.

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
