# Developer Guide Proposal

## Audience Contract

The Developer Guide has two first-class, durable audiences:

1. developers who understand, operate, or contribute to InKCre itself;
2. third-party developers who participate as database peers, extend InKCre, or integrate through
   its APIs.

The ecosystem audience is not optional. Its primary integration model is direct participation in
the admitted shared database protocol, using native PostgreSQL or PostgREST as transports over the
same semantics. Extension and API surfaces are additional ways to participate. However, the MVP
cannot claim mature SDKs, stable public APIs, or complete ecosystem guidance that do not yet exist.
It should expose both paths honestly while delivering more depth for the contributor path that has
current evidence.

The guide should eventually let a reader answer:

1. What are the main parts of InKCre?
2. Which repository owns the change I want to make?
3. Which concepts and contracts are shared across repositories?
4. Where are the exact setup, check, and contribution instructions?
5. How can a third-party peer use the database protocol, Extensions, or APIs, and what
   compatibility can it rely on?
6. Where should a changed fact be owned?

## MVP Maturity Contract

| Developer path | MVP result | Not yet promised |
| --- | --- | --- |
| Contribute to InKCre | Repository map, shared architecture, change ownership, and links to real repository development entry points | A centrally copied universal setup or workflow |
| Build on InKCre | The database-peer model, current Extension/API concepts, stability status, canonical technical sources, and a clear statement of what is not yet a supported public contract | Complete database integration guide, Extension SDK guide, tutorials, hosted API reference, compatibility policy, or production support |

The MVP must not publish empty `/developer/database/`, `/developer/extensions/`, or
`/developer/api/` pages. Those route names remain reserved for the first real ecosystem guidance.
Until then, `/developer/` and `/developer/architecture` carry a concise, useful ecosystem status.

## SSoT Restraint

SSoT means that a durable claim has one appropriate owner. It does not mean that every claim must
be moved into the Hub.

```text
product purpose, behavior, vocabulary      -> Hub 10-prd/**
cross-unit topology and contracts          -> Hub 20-product-tdd/**
Hub/Spoke shared-reference operations      -> Hub 00-meta/**
unit architecture and runtime mechanics    -> owning repository
enforced behavior                           -> code, config, schema, tests, automation
public-only organization and About facts   -> website/**
reader-oriented explanation and routing    -> website/**
```

The Developer Guide may summarize and link across these owners. It must not become a second owner
for exact commands, versions, deployment instructions, or implementation details that change with
one repository.

## `/developer/`: Orientation And Repository Map

### Reader outcome

The reader understands the current development surface and can choose the correct next page or
repository.

### Proposed content

- A short active-development notice.
- A one-paragraph explanation that InKCre is a multi-repository system organized around a shared
  info-base rather than one monolithic frontend/backend repository.
- A primary repository map:
  - `docs`: shared product and cross-unit truth; public website.
  - `core-py`: core Python runtime and database lifecycle authority.
  - `client-web`: web client, browser-extension workspace, and client infrastructure.
  - `ui`: design system and shared web UI package.
- Two first-class developer paths:
  - **Contribute to InKCre**: choose an owning repository and follow its current development
    entry point.
  - **Build on InKCre**: understand the database-peer model, the additional Extension/API
    surfaces, and their explicitly stated public-contract maturity.
- Two currently actionable next steps:
  - understand the shared system through Architecture;
  - route a source change through Contributing.
- A link to the full GitHub organization repository list without presenting every prototype or
  legacy repository as an active entry point.

### Explicit exclusions

- installation commands;
- toolchain versions;
- copied README or `CONTRIBUTING.md` sections;
- a promise that every public repository is currently maintained;
- user-facing product setup.

## `/developer/architecture`: Shared Mental Model

### Reader outcome

The reader gains enough shared vocabulary and topology to read repository-local architecture
without mistaking one runtime or transport for the whole product.

### Proposed content

1. Product flow:

   ```text
   external systems
        -> source collection
        -> blocks and relations in the info-base
        -> resolver interpretation / storage raw-content retrieval
        -> sink retrieval, indexing, and downstream use
   ```

2. Core vocabulary: info-base, block, relation, source, sink, resolver, extension, client.
3. Cross-unit topology:
   - multiple peer runtimes can operate around one shared info-base;
   - PostgreSQL is authoritative for shared persisted state;
   - native PostgreSQL and PostgREST are transports over the admitted protocol;
   - `core-py` owns migrations and lifecycle authority, not all request paths or product behavior.
4. Important boundaries:
   - source, info-base, and sink responsibilities remain distinct;
   - resolver interpretation and raw-content storage retrieval remain distinct;
   - extension `installed`, `enabled`, and `running` states remain distinct.
5. Ecosystem status:
   - the primary path is peer participation through the admitted database protocol;
   - native PostgreSQL and PostgREST are transports over the same admitted semantics;
   - “direct database access” does not mean arbitrary access outside the versioned schema,
     privileges, lifecycle, and compatibility contract;
   - extensions are a first-class capability model that can add source, resolver, or sink
     behavior;
   - current lifecycle and ownership semantics exist, but a stable third-party package/SDK
     contract is not yet documented;
   - implementation schemas and HTTP/database transports exist, but they are not automatically a
     versioned public API compatibility promise;
   - early ecosystem developers can inspect the canonical contracts and active repositories
     without being told that the surface is production-stable.
6. Links to canonical PRD, glossary, unit topology, state authority, and cross-unit contracts.

### Explicit exclusions

- provider-specific deployment;
- complete database/JWT contract reproduction;
- package/module diagrams owned by one repository;
- API endpoint reference;
- claims still present only as empty scaffolds in cross-unit documents.

## `/developer/contributing`: Contribute To InKCre

### Reader outcome

The reader can route a change to the correct repository and follow that repository's real
instructions without relying on a stale central copy.

### Proposed content

1. Choose the change owner:

   | Change | Start here |
   | --- | --- |
   | Product purpose, behavior, or shared vocabulary | `InKCre/docs` → `10-prd/**` |
   | Cross-unit state, topology, or interoperability contract | `InKCre/docs` → `20-product-tdd/**` |
   | Hub/Spoke reference workflow | `InKCre/docs` → `00-meta/**` |
   | Core runtime, database lifecycle, migrations | `InKCre/core-py` |
   | Web client or browser extension | `InKCre/client-web` |
   | Design tokens or shared UI | `InKCre/ui` |
   | Public website content or presentation | `InKCre/docs` → `website/**` |

2. Follow the selected repository:
   - read its root README, `AGENTS.md`, and `CONTRIBUTING.md` when present;
   - use its pinned runtime and package-manager contract;
   - run its own check and test commands;
   - follow its pull-request and review requirements.
3. Shared-truth changes:
   - update and publish the Hub owner before a Spoke records the new shared reference;
   - keep Hub edits, Spoke reference bumps, and Spoke-local changes isolated.
4. Link directly to each repository's current development entry point.

### Explicit exclusions

- a universal install command;
- a universal branch, commit, release, formatter, or test policy;
- copied SVC framework guidance;
- contribution promises such as response time or guaranteed acceptance.

## Deferred Developer Sections

- Full `/developer/database/` guidance for peer identity, admitted schema, privileges, lifecycle,
  compatibility, and native PostgreSQL/PostgREST examples.
- Full `/developer/extensions/` guidance, after a public extension contract and real example
  exist.
- Full `/developer/api/` guidance and API reference, after one generated or hosted API surface
  becomes a supported public contract.
- End-to-end local environment tutorial, only if repository-local entry points cannot provide a
  coherent cross-repository workflow without unsafe duplication.
- Release and deployment guidance, when there is a real external contributor or operator audience.
