---
title: Contributing
description: Route an InKCre change to its canonical owner and repository-specific workflow.
---

# Contributing to InKCre

InKCre welcomes code, documentation, design, and ecosystem contributions. Start by identifying the
owner of the change; then follow that owner's current development and review contract.

If you want to connect another service without changing InKCre itself, use the
[ecosystem developer guide](/developer/ecosystem/) instead. Your Extension can live in your own
repository; it does not need to become a Core contribution.

> [!NOTE] There is no copied, universal setup or contribution procedure. Toolchains and commands
> belong to the repository that runs and verifies them.

## Find a useful change

Use the organization searches for
[`good first issue`](https://github.com/search?q=org%3AInKCre+is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22&type=issues)
and
[`help wanted`](https://github.com/search?q=org%3AInKCre+is%3Aissue+is%3Aopen+label%3A%22help+wanted%22&type=issues).
An empty result means no task has currently been qualified for that label; it is not an invitation
to guess at an untracked change. For another proposal, open an issue in the owning repository before
a large implementation and describe the user outcome, affected area, and how it could be verified.
Report suspected vulnerabilities privately through that repository's `SECURITY.md` instead.

## Choose the change owner

| Change                                          | Start here                                                                                                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Product purpose, behavior, or shared vocabulary | [`InKCre/docs`](https://github.com/InKCre/docs) → [`10-prd/**`](https://github.com/InKCre/docs/tree/main/10-prd)                 |
| Cross-unit state, topology, or interoperability | [`InKCre/docs`](https://github.com/InKCre/docs) → [`20-product-tdd/**`](https://github.com/InKCre/docs/tree/main/20-product-tdd) |
| Hub/Spoke shared-document workflow              | [`InKCre/docs`](https://github.com/InKCre/docs) → [`00-meta/**`](https://github.com/InKCre/docs/tree/main/00-meta)               |
| Core runtime, migrations, or database lifecycle | [`InKCre/impl-py`](https://github.com/InKCre/impl-py)                                                                            |
| Web client or browser extension                 | [`InKCre/impl-ts`](https://github.com/InKCre/impl-ts)                                                                            |
| Design tokens or shared UI                      | [`InKCre/ui`](https://github.com/InKCre/ui)                                                                                      |
| Public website content or presentation          | [`InKCre/docs`](https://github.com/InKCre/docs) → [`website/**`](https://github.com/InKCre/docs/tree/main/website)               |

If a change spans repositories, separate the shared contract from each repository's implementation
instead of making one repository silently own the others.

## Follow the selected repository

After choosing an owner:

1. Fork the repository, branch from its current `main`, and read its root `README.md`, `AGENTS.md`,
   and `CONTRIBUTING.md` when present.
2. Use the runtime and package manager pinned by that repository.
3. Run its own formatter, checks, and tests.
4. Push the branch to your fork and open a pull request against the owning repository.
5. Follow its pull-request and review requirements until checks pass and conversations are resolved.

Useful entry points:

- [`impl-py` contributing guide](https://github.com/InKCre/impl-py/blob/main/CONTRIBUTING.md)
- [`impl-ts` contributing guide](https://github.com/InKCre/impl-ts/blob/main/CONTRIBUTING.md)
- [`ui` README](https://github.com/InKCre/ui#readme)
- [`docs` README](https://github.com/InKCre/docs#readme)

### Setup and access boundaries

| Repository | First setup gate                                                                                                                                                                                                                                                                                         | Complete local evidence                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `impl-py`  | Python and PDM versions checked by `pdm run doctor`; integration suites need a disposable PostgreSQL runtime                                                                                                                                                                                             | `pdm run check`, plus the repository-local integration or acceptance command for changed behavior                   |
| `impl-ts`  | `pnpm install` reads the private `@inkcre/ui-web` GitHub Package. Local contributors need a classic PAT with `read:packages` **and** package read access; follow the [authentication instructions](https://github.com/InKCre/ui/blob/main/CONTRIBUTING.md#github-packages-authentication) before install | `pnpm check`, plus the relevant browser E2E command                                                                 |
| `ui`       | Install from the repository root; generated tokens, metadata, and skills must be current                                                                                                                                                                                                                 | `pnpm check`, plus visual or interaction review for affected Stories or a real consumer                             |
| `docs`     | Use the website toolchain pinned in `website/`                                                                                                                                                                                                                                                           | The [website contract](https://github.com/InKCre/docs/blob/main/website/README.md), including link and build checks |

For `impl-ts`, a `401` or `403` during install is an access failure, not a source or lockfile
defect. Do not commit a package token or add it to the repository `.npmrc`. Contributors who do not
have package access cannot currently complete the normal local `impl-ts` setup; ask a maintainer to
confirm whether the proposed task is suitable before investing in that path.

## Submit a reviewable change

Use `type(scope): summary` for commit subjects and pull-request titles. The repository guide owns
its stable scopes; choose the primary implementation area, not every package touched. A
cross-project change may use a repository-level scope such as `extensions`, while the pull-request
body and the repository's fragment or Changeset mechanism list every affected release project
precisely.

Complete the pull-request template with the intended outcome, actual verification evidence, risk and
rollback, delivery effects, and any stacked pull requests. External fork workflows require
maintainer approval before read-only CI starts and receive no preview or production credentials. A
maintainer may therefore need to approve CI or perform a trusted preview; do not work around that
boundary by adding credentials to the branch. Passing review makes a change eligible to merge, but
canonical publication and production delivery occur only from protected `main`.

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
