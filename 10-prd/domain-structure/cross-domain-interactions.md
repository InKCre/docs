# Cross-Domain Interactions

## Interaction Pair: Source -> Info-base

- semantic contract: sources gather data, but the info-base owns persisted reusable graph state.
- shared language: source, collect job, block, relation, info-base.

## Interaction Pair: Info-base -> Sink

- semantic contract: sinks consume info-base information for downstream use without taking over source or info-base authority.
- shared language: info-base, block, relation, sink, downstream use.

## Interaction Pair: Info-base -> Application

- semantic contract: application capabilities consume graph authority and resolver meaning; indexes, embeddings, and projections remain rebuildable support rather than competing information authority.
- shared language: info-base, block, relation, resolver, application, retrieval.

## Interaction Pair: Extension -> Product Capabilities

- semantic contract: extensions add source, resolver, storage, sink, or protocol capability without bypassing graph or deployment ownership boundaries.
- shared language: extension, source, resolver, storage, sink, protocol, lifecycle hooks.

## Interaction Pair: Client -> Shared System

- semantic contract: each client is one running node that can participate around the same shared info-base.
- shared language: client, runtime, shared system, info-base.
