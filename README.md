# InKCre Shared Product Docs

This repository is the canonical Hub for product truth shared by InKCre repositories.

- [`10-prd/`](10-prd/index.md) owns product intent, observable behavior, vocabulary, and derived domain boundaries.
- [`20-product-tdd/`](20-product-tdd/unit-topology.md) owns stable cross-unit topology, authority, and interoperability contracts.
- [`00-meta/`](00-meta/submodule-profile.md) owns the InKCre-specific Hub/Spoke transport and shared-reference workflow.
- [`tasks/`](tasks/README.md) is volatile Hub-local collaboration state, not durable shared truth.

SVC framework guidance is intentionally not copied here. Install the version recorded in [`svc.json`](svc.json), use `svc status --json` to verify adoption, and query guidance with `svc lookup`.

Spoke repositories consume a published Hub commit through a read-only `docs/_shared/` git submodule. Hub content must be committed and pushed before a Spoke records the reference; Hub edits and Spoke reference bumps stay in separate commits.
