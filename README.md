# InKCre Shared Product Docs

The canonical product truth Hub for InKCre — shared PRD, cross-unit product TDD, and the source of [inkcre.dev](https://inkcre.dev).

`docs` 是 InKCre 的产品真相 Hub——维护跨仓库共享的 PRD、产品 TDD，以及 [inkcre.dev](https://inkcre.dev) 网站的内容源。

## Repository shape

- [`10-prd/`](10-prd/index.md) — product intent, observable behavior, vocabulary, and derived domain boundaries
- [`20-product-tdd/`](20-product-tdd/unit-topology.md) — stable cross-unit topology, authority, and interoperability contracts
- [`00-meta/`](00-meta/submodule-profile.md) — InKCre-specific Hub/Spoke transport and shared-reference workflow
- [`website/`](website/) — the source of [inkcre.dev](https://inkcre.dev) (developer guide, architecture, and extension docs)
- [`tasks/`](tasks/README.md) — volatile Hub-local collaboration state, not durable shared truth

## How Spokes consume this Hub

Spoke repositories consume a published Hub commit through a read-only `docs/_shared/` git submodule. Hub content must be committed and pushed before a Spoke records the reference; Hub edits and Spoke reference bumps stay in separate commits.

## Documentation

- [Agent operating guide](AGENTS.md)
- [Documentation index](docs/index.md)
- SVC adoption state: [`svc.json`](svc.json) — verify with `svc status --json`
