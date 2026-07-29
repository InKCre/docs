---
title: Developer Guide
description: Orientation for contributors and ecosystem developers working with InKCre.
---

# Developer Guide

InKCre is a multi-repository system organized around a shared info-base. This guide provides the
common mental model and routes you to the repository that owns the details.

> [!IMPORTANT] InKCre is under active development. The contributor path is usable today, while
> third-party database, Extension, and API contracts are still being documented and may change.

## Choose a path

### Contribute to InKCre

Start with [Architecture](/developer/architecture) to understand the shared vocabulary and topology.
Then use [Contributing](/developer/contributing) to locate the owner of the product, cross-unit,
runtime, client, UI, or website change you want to make.

Exact setup commands, runtime versions, tests, and pull-request requirements stay in the repository
that enforces them.

### Build on InKCre

The foundational ecosystem path is participation as an authenticated peer of the shared info-base.
Native PostgreSQL and PostgREST are transports over the same admitted, versioned database protocol.
Extensions and APIs provide additional integration shapes.

This is not yet a promise of a stable public SDK, unrestricted database access, or a complete API
compatibility policy. The [Architecture guide](/developer/architecture#ecosystem-surfaces) explains
what is real now and where its canonical contracts live.

## Primary repositories

| Repository                                                  | Current role                                                              | Development entry                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`InKCre/docs`](https://github.com/InKCre/docs)             | Shared product and cross-unit documentation Hub; source of this website   | [Repository README](https://github.com/InKCre/docs#readme)                        |
| [`InKCre/core-py`](https://github.com/InKCre/core-py)       | Python core runtime, migrations, and database lifecycle authority         | [Contributing guide](https://github.com/InKCre/core-py/blob/main/CONTRIBUTING.md) |
| [`InKCre/client-web`](https://github.com/InKCre/client-web) | Web client, browser-extension workspace, and shared client infrastructure | [Repository README](https://github.com/InKCre/client-web#readme)                  |
| [`InKCre/ui`](https://github.com/InKCre/ui)                 | Design system, tokens, and shared web UI packages                         | [Repository README](https://github.com/InKCre/ui#readme)                          |

The [InKCre GitHub organization](https://github.com/InKCre) contains prototypes and historical
repositories as well. They are not all equivalent contributor entry points.

## Canonical foundations

- [Product requirements](https://github.com/InKCre/docs/blob/main/10-prd/index.md) own the shared
  product purpose, behavior, and vocabulary.
- [Cross-unit technical design](https://github.com/InKCre/docs/tree/main/20-product-tdd) owns
  durable topology, authority, and interoperability contracts.
- Each implementation repository owns its runtime mechanics and executable checks.

Continue to [Architecture](/developer/architecture), or route a concrete change through
[Contributing](/developer/contributing).
