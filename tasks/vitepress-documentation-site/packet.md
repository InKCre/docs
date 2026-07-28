# VitePress Documentation Site

- **Objective**: establish and publish an independent VitePress website at `https://inkcre.dev`
  as a human-facing projection of the InKCre shared-doc Hub. Keep only a simple index page while
  the product is unstable, and preserve the future public-site information architecture without
  prematurely writing productized guidance.
- **Guardrails**: keep this repository authoritative for shared product and cross-unit truth;
  keep the VitePress project isolated under `website/`; do not turn the current index into a
  marketing landing page; do not create placeholder User Manual, Developer Guide, or About
  sections; do not treat website wording as a replacement owner for canonical Hub truth; do not
  add manifest, hash, or route machinery merely to eliminate editorial drift; do not expose
  `tasks/**`, `AGENTS.md`, generated SVC integration, local configuration, or other Hub-local
  collaboration state; keep Spoke-local implementation, deployment, and task truth in each
  Spoke; preserve the existing Hub-first and isolated-commit workflow.
- **Verification**: `svc status --json` remains healthy and `svc init --agent codex --json`
  remains a no-op; VitePress reads only website-owned content under `website/`; formatting and
  the simple home page pass a deterministic production check with default dead-link failure;
  route-output assertions prove that the default language stays at root and links remain clean;
  manual preview passes; the selected dependency graph passes an explicit audit; canonical Hub
  documents remain unchanged; GitHub deploys the exact checked artifact to Cloudflare Pages;
  `inkcre.dev` serves HTTPS, canonical metadata, sitemap, robots, and a real `404`; Pages preview
  origins remain `noindex`; `git diff --check` passes.
- **Current Truth**: the repository now has an independent `website/` package with only
  website-owned Markdown routable. English source begins under `content/en/**` and rewrites to
  clean public root routes; only the English root locale is active. The package pins Node
  `22.22.3`, pnpm `11.17.0`, VitePress `2.0.0-alpha.18`, and Oxfmt `0.60.0` in package metadata
  and its lockfile. The simple index describes active development, links to canonical Hub
  sources, and creates no speculative sections. Its deterministic check formats, builds with
  default dead-link failure, and verifies generated language and URL contracts. One
  always-reporting GitHub Actions workflow protects the website contract with pinned actions,
  frozen install, least privilege, concurrency cancellation, and timeout. Dependabot maintains
  `/website` npm dependencies and root GitHub Actions weekly without auto-merge. Product
  behavior and language remain in `10-prd/**`; cross-unit contracts remain in
  `20-product-tdd/**`; Hub/Spoke operations remain in `00-meta/**`; `tasks/**` remains volatile.
  The website is an editorial projection and no canonical Hub document changed. The repository
  can consume the existing organization Cloudflare account and API-token secrets, owns
  `CLOUDFLARE_PAGES_PROJECT=inkcre-website`, and has a GitHub `production` environment restricted
  to the `main` branch. `inkcre.dev` now has a proxied apex CNAME to
  `inkcre-website.pages.dev`, and the Pages custom domain reports active with SSL enabled.
- **Result**: publication completed through the normal pull-request and main-branch artifact
  path. Production run `30369725430` verified immutable deployment
  `3e61826e-b55f-45f0-8480-027421c40092` and `https://inkcre.dev`: HTTPS root, English locale,
  canonical metadata, sitemap, robots, real `404`, production indexing behavior, and Pages-origin
  `noindex` all passed.

## Supporting Material

- [Implementation plan](implementation-plan.md)
- [Preflight evidence and projection decision](preflight.md)
- [Industry benchmark and selected engineering baseline](industry-benchmark.md)
- [Evolution foundation audit](foundation-audit.md)

## Confirmed Direction

- The repository remains the InKCre shared documentation Hub.
- `website/` is an independent presentation, content, and build surface.
- The initial website is documentation-first and has only a simple home page.
- Website content is an editorial projection of Hub truth, not a byte-identical rendering.
- Ordinary editing judgment and source links are sufficient; zero-drift automation is not a
  requirement.
- The website may later become the unified InKCre public site, but current implementation must
  not imply product maturity that does not exist.
- Responsive layout, basic accessibility, essential page metadata, dead-link checks, and a
  website-local content root remain valid first-slice requirements.
- Search remains a future requirement but is omitted from the one-page site. Built-in local
  search is the default when a reader-facing documentation corpus exists.
- The website publishes at `inkcre.dev`; the application remains independently owned at
  `app.inkcre.dev`.

## Confirmed Language Contract

Sir confirmed:

```text
English source:       website/content/en/**
English public URLs:  /**
future Chinese URLs:  /zh/**
active locales now:   English root only
```

This matches the current English Hub corpus and avoids a later English source-tree and URL
migration.

Candidate future section namespaces are `/manual/`, `/developer/`, and `/about/`. They remain
unpublished and absent from navigation; confirm each before its first real page rather than
creating placeholders now.

## Content Topology

```text
authoritative Hub truth
  00-meta/**                 Hub/Spoke operating contracts
  10-prd/**                  product truth and vocabulary
  20-product-tdd/**          cross-unit technical contracts
          |
          | editorial projection, summary, and links
          v
website/                     public content, VitePress configuration, theme, navigation, assets
          |
          v
static documentation site
```

The website projection must not make these routable:

```text
tasks/**
AGENTS.md
.agents/**
docs/index.md
svc.json
svc.local.json
other generated or machine-local collaboration state
```

## Deferred Information Architecture

These sections describe the intended long-term role of the site. They are preserved for future
product pressure and must not be scaffolded with speculative content now.

### Landing

- Remain a simple project and documentation index during rapid development.
- Later, when product claims and availability are stable, it may become a fuller public landing
  page.

### User Manual

- Task-oriented guidance for actual user journeys.
- Likely progression: start, concepts, collect, organize, retrieve/use, extensions,
  troubleshooting.
- Procedures must be derived from verified client behavior, not inferred from PRD or technical
  contracts.

### Developer Guide

- Unified orientation for repository topology, architecture, shared runtime, extension
  development, contracts, and contribution.
- Spoke-local commands, implementation mechanics, deployment, and recovery remain linked to
  their Spoke owners rather than copied into the Hub.

### About

- Organization mission, principles, repositories, governance, licensing, contribution, and
  contact information.
- Durable organization claims require an explicit owner before publication.

## Projection Decision

- VitePress compiles website-owned Markdown only.
- Hub documents remain canonical inputs for human editing judgment, not build-time inputs.
- A website page may summarize or reorganize Hub truth and should link to a canonical source
  when that link materially helps readers or maintainers.
- Editorial drift is accepted as a normal consequence of serving different audiences.
- No exact source-to-route manifest, wrapper fleet, generated mirror, source hash gate, or
  cross-surface freshness mechanism is required.
- When drift exposes a real product or contract mismatch, update the canonical Hub owner first
  and adjust the relevant website page in the same task when it is in scope.
