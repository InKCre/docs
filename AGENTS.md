# InKCre Shared Product Docs

The authoritative Hub for durable product truth shared across InKCre repositories. Framework guidance lives in the installed SVC corpus; only InKCre-owned claims and operating contracts live here.

## Mental Model

InKCre is a system of heterogeneous peers sharing one info-base. Peers differ in runtime capability, not in authority: no fixed frontend/backend hierarchy exists.

This Hub owns **what** the product is and **why** (PRD), plus the cross-unit technical contracts that let peers interoperate safely (Product TDD). Spoke repositories consume this Hub through a git submodule at `docs/_shared/` and mount it read-only. Hub truth is always edited here first, then Spokes bump their submodule reference in a separate commit.

## Repository Map

- `10-prd/`: business intent, observable behavior, vocabulary, and derived domain boundaries
- `20-product-tdd/`: stable cross-unit topology, authority, and interoperability contracts
- `00-meta/`: Hub/Spoke profile, shared-reference operations, and the shared-doc editing skill
- `website/`: published documentation site source
- `tasks/`: active Hub-local task state; never exported as durable truth
- `docs/index.md`: navigation for this repository's human and agent consumers

## Knowledge Owners

- Product what and why: `10-prd/index.md`
- Cross-unit technical contracts: `20-product-tdd/`
- Hub/Spoke transport and ownership: `00-meta/submodule-profile.md`
- Shared-reference mutation order: `00-meta/submodule-operations.md`
- Executable shared-reference workflow: `00-meta/skills/edit-svc-shared-docs/`
- Working protocol and implementation judgment: the installed SVC corpus (see the SVC section below)

## Development Constraints

- Read `10-prd/` for product claims and `20-product-tdd/` for cross-unit contracts; do not put Spoke-local architecture or runtime mechanics in either.
- Edit and publish Hub truth before updating any Spoke `docs/_shared` reference.
- Keep Hub edits, Spoke reference bumps, and Spoke-local changes in separate commits.
- Task retention: keep packets while work is active; completed packets may be deleted without an archive or deletion-time promotion review.

## Governance And Workflow

- Git and GitHub workflow: [Git and GitHub Governance](https://github.com/InKCre/.github/blob/main/GOVERNANCE.md) and [Contributing](https://github.com/InKCre/.github/blob/main/CONTRIBUTING.md)
- Verification and test selection: [Verification and Test Policy](https://github.com/InKCre/.github/blob/main/TESTING.md); repository-local documents may only record justified local exceptions.

<!-- svc:begin -->
## SVC

Use `svc --help` or `svc <command> --help`.

- `svc status`: inspect project state
- `svc dev`: manage declared development targets

If `AGENTS.local.md` exists, read it after this file. It is ignored local guidance; shared rules belong here.
<!-- svc:end -->
