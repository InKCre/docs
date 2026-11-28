---
title: Developer Guide
description: Orientation for contributors and ecosystem developers working with InKCre.
---

# Developer Guide

InKCre is a multi-repository system organized around a shared info-base. This guide provides the
common mental model and routes you to the repository that owns the details.

> [!IMPORTANT] InKCre is under active development. The contributor path is usable today, while
> ecosystem interfaces remain version-sensitive. Check the Host compatibility of an Extension rather
> than assuming a stable, standalone SDK.

## Choose a path

### Contribute to InKCre

Start with [Architecture](/developer/architecture) to understand the shared vocabulary and topology.
Then use [Contributing](/developer/contributing) to locate the owner of the product, cross-unit,
runtime, app, UI, or website change you want to make.

Exact setup commands, runtime versions, tests, and pull-request requirements stay in the repository
that enforces them.

### Build on InKCre

The foundational ecosystem path is participation as an authenticated peer of the shared info-base.
Native PostgreSQL and PostgREST are transports over the same admitted, versioned database protocol.
Extensions and APIs provide additional integration shapes.

Start with [Ecosystem Developers](/developer/ecosystem/) to choose an integration path. To collect
from a new service, follow [Build a Source Extension](/developer/ecosystem/source-extension):
develop your own Python package and test it on a matching Core Host without contributing to Core.

This is not a promise of unrestricted database access or a complete API compatibility policy. The
[Architecture guide](/developer/architecture) explains the wider model and canonical contracts.

## Find the owning repository

The [contribution guide's repository map](/developer/contributing#choose-the-change-owner) links
each type of change to its owner.

## Canonical foundations

- [Product requirements](https://github.com/InKCre/docs/blob/main/10-prd/index.md) own the shared
  product purpose, behavior, and vocabulary.
- [Cross-unit technical design](https://github.com/InKCre/docs/tree/main/20-product-tdd) owns
  durable topology, authority, and interoperability contracts.
- Each implementation repository owns its runtime mechanics and executable checks.

Continue to [Architecture](/developer/architecture), or route a concrete change through
[Contributing](/developer/contributing).
