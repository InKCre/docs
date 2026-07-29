---
title: Contributing
description: Route an InKCre change to its canonical owner and repository-specific workflow.
---

# Contributing to InKCre

InKCre welcomes code, documentation, design, and ecosystem contributions. Start by identifying the
owner of the change; then follow that owner's current development and review contract.

> [!NOTE] There is no copied, universal setup or contribution procedure. Toolchains and commands
> belong to the repository that runs and verifies them.

## Choose the change owner

| Change                                          | Start here                                                                                                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Product purpose, behavior, or shared vocabulary | [`InKCre/docs`](https://github.com/InKCre/docs) → [`10-prd/**`](https://github.com/InKCre/docs/tree/main/10-prd)                 |
| Cross-unit state, topology, or interoperability | [`InKCre/docs`](https://github.com/InKCre/docs) → [`20-product-tdd/**`](https://github.com/InKCre/docs/tree/main/20-product-tdd) |
| Hub/Spoke shared-document workflow              | [`InKCre/docs`](https://github.com/InKCre/docs) → [`00-meta/**`](https://github.com/InKCre/docs/tree/main/00-meta)               |
| Core runtime, migrations, or database lifecycle | [`InKCre/core-py`](https://github.com/InKCre/core-py)                                                                            |
| Web client or browser extension                 | [`InKCre/client-web`](https://github.com/InKCre/client-web)                                                                      |
| Design tokens or shared UI                      | [`InKCre/ui`](https://github.com/InKCre/ui)                                                                                      |
| Public website content or presentation          | [`InKCre/docs`](https://github.com/InKCre/docs) → [`website/**`](https://github.com/InKCre/docs/tree/main/website)               |

If a change spans repositories, separate the shared contract from each repository's implementation
instead of making one repository silently own the others.

## Follow the selected repository

After choosing an owner:

1. Read its root `README.md` and `AGENTS.md`, plus `CONTRIBUTING.md` when present.
2. Use the runtime and package manager pinned by that repository.
3. Run its own formatter, checks, and tests.
4. Follow its pull-request and review requirements.

Useful entry points:

- [`core-py` contributing guide](https://github.com/InKCre/core-py/blob/main/CONTRIBUTING.md)
- [`client-web` README](https://github.com/InKCre/client-web#readme)
- [`ui` README](https://github.com/InKCre/ui#readme)
- [`docs` README](https://github.com/InKCre/docs#readme)

## Changes to shared truth

The `docs` repository is the Hub for durable product and cross-unit truth used across InKCre
repositories. For a shared-truth change:

1. Update and publish the canonical Hub owner.
2. Update each consuming Spoke's shared reference.
3. Apply Spoke-local implementation or documentation changes.

Keep those steps in separate commits so ownership and rollback remain visible. The
[Hub/Spoke operations contract](https://github.com/InKCre/docs/blob/main/00-meta/submodule-operations.md)
contains the repository-specific workflow.

## Website contributions

This website is a reader-oriented projection, not a second owner for product or cross-unit
contracts. Public-only About facts belong here; product and architecture summaries must continue to
agree with their Hub owners.

The [website README](https://github.com/InKCre/docs/blob/main/website/README.md) owns its route,
authoring, build, and publication contract.
