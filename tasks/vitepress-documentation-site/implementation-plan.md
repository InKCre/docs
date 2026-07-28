# VitePress Documentation Site Implementation Plan

Status: local website implemented and verified on 2026-07-28; production deployment is
authorized and in progress. English owns the public root and future Chinese content will use
`/zh/`.

## Impact Handshake

- **Address and Object**: add an isolated VitePress package, configuration, locale-ready content
  root, formatting contract, and simple index under `website/**`; later add one root-level
  website-check workflow and scoped dependency-updater configuration.
- **State Diff**: no site runtime or public build -> one locally buildable documentation site
  whose content is a human-facing projection of Hub truth and whose first URLs can evolve
  without a default-language migration.
- **Blast Radius**: Hub-local website development and future static publication move; canonical
  `00-meta/**`, `10-prd/**`, and `20-product-tdd/**` content and Spoke-local implementations do
  not. Website-only commits do not require Spoke shared-reference bumps.
- **Invariants**: canonical Hub owners stay authoritative; VitePress reads only website-owned
  Markdown; the site does not imply a stable, productized User Manual, Developer Guide, About
  surface, or marketing landing page.
- **Verification**: formatting, an explicit dependency audit, deterministic VitePress production
  build with default dead-link failure, route-output assertions, manual preview acceptance, SVC
  health/no-op, and `git diff --check`.

## Confirmed Language Contract

Sir confirmed:

```text
English source:       website/content/en/**
English public URLs:  /**
future Chinese URLs:  /zh/**
active locales now:   English root only
```

This follows the language of the current Hub corpus and VitePress's own source/public split.

The following are engineering defaults rather than additional content commitments:

- deploy the official website at root with `base: '/'`;
- enable `cleanUrls` from the first build;
- use extensionless public-route links;
- keep future sections unpublished until real content exists;
- keep current documentation versionless.

## Slice 0: Re-check Toolchain

Immediately before mutation, run:

```text
node --version
pnpm --version
npm view vitepress version dist-tags
npm view vitepress@next version dependencies
```

Resolve and audit the exact dependency graph in a disposable directory. Stop if the selected
graph has a high-severity advisory or the minimal fixture no longer builds. Keep this
network-dependent audit as an explicit dependency-selection and dependency-update check rather
than embedding it in the deterministic website `check` command.

Prepared baseline from 2026-07-28:

- Node `22.22.3`;
- pnpm `11.17.0`;
- exact VitePress `2.0.0-alpha.18`.

These versions are implementation candidates, not timeless project truth. Re-check them instead
of floating on `latest` or `next`.

## Slice 1: Establish The Isolated Website Package

Create:

```text
website/
  README.md
  package.json
  pnpm-lock.yaml
  .editorconfig
  .gitignore
  .oxfmtrc.json
  .vitepress/
    config.mts
  content/
    en/
      index.md
  scripts/
    verify-build.mjs
```

Use existing InKCre Node package conventions:

- package-local `packageManager`;
- package-local `devEngines.runtime`;
- exact Node, pnpm, VitePress, and Oxfmt versions;
- package-local ignores for `node_modules`, VitePress cache, and build output;
- `pnpm install --frozen-lockfile` in CI;
- `dev`, `build`, `preview`, `format`, `format:check`, and deterministic `check` scripts.

The `check` script runs formatting verification, the production build, and generated-route
verification. Keep the network-dependent advisory audit explicit and separate.

Configure:

```text
srcDir: 'content'
base: '/'
cleanUrls: true
rewrites: { 'en/:rest*': ':rest*' }
locales.root: English
```

Do not point VitePress at the repository root or canonical Hub directories. Do not add a public
directory until there is a real fixed-name asset or redirect to own.

`website/README.md` records the route and authoring contract so future pages follow it without
requiring a formatter or URL migration.

## Slice 2: Add The Minimal Website

The initial index contains only:

- repository/site identity;
- one concise description;
- links to the canonical Product PRD and Product TDD sources;
- optionally a link to the source repository.

The page uses one H1 and a useful description. Internal links target public routes and omit
`.md` and `.html`; headings that become cross-page targets receive explicit anchors.

Use the default VitePress theme with minimal title, description, language, and navigation
configuration. Keep the default dead-link behavior. Do not add:

- marketing hero copy or feature grids;
- product CTAs;
- User Manual, Developer Guide, or About pages;
- empty future navigation or placeholder directories;
- copied Hub document trees;
- a search control for the one-page corpus;
- sitemap, canonical URLs, or deployment-origin metadata before the hostname is confirmed;
- PWA, LLM output, Twoslash, custom Markdown transforms, or custom theme components.

Future website pages may summarize or reorganize Hub truth for their audience. They should link
to canonical sources when useful, but no build-time inclusion or freshness automation is
required.

## Slice 3: Verify The Local Site

Repository-level verification:

```text
pnpm --dir website install --frozen-lockfile
pnpm --dir website check
pnpm --dir website audit --audit-level high
svc status --json
svc init --agent codex --json
git diff --check
```

Assert from the production output:

- the index is emitted at `/`, not `/en/`;
- page language is the selected root locale;
- no default-language prefix leaks into generated URLs;
- generated page links are clean and extensionless;
- default dead-link checking remains enabled;
- only website-owned Markdown becomes routable.

Manually inspect:

- the production site through `pnpm --dir website preview`;
- narrow and wide viewport layout;
- keyboard navigation and visible focus;
- title, description, and language metadata;
- simple navigation with no speculative sections;
- canonical Hub documents remain unchanged.

Do not add an SVC `dev` target in this slice. There is not yet repeated multi-worktree
coordination pressure or an instance-aware readiness contract to justify it.

## Slice 4: Add The CI And Update Contract

After local verification passes:

1. add one website-check workflow using pinned action SHAs;
2. trigger it for relevant PR and branch events without workflow-level path filtering, so a
   required check always reports;
3. declare least privilege, concurrency cancellation, and a finite timeout;
4. set up pnpm and Node from `website/package.json`, cache against
   `website/pnpm-lock.yaml`, then run frozen install and `pnpm --dir website check`;
5. add a weekly dependency updater scoped to `/website`, without auto-merge;
6. include GitHub Actions digest updates in the existing repository-level updater contract;
7. upload static output only when a later deployment slice needs artifact handoff.

Reuse InKCre's toolchain and dependency-update conventions, not the application-specific
client-web Pages workflow. Do not copy database E2E, SPA fallback, release identity, preview
cleanup, or Changesets logic.

If CI cost later becomes meaningful, use an always-reporting change-detection job instead of
making a required workflow skippable.

## Authorized Deployment Slice

Publish through a Cloudflare Pages Direct Upload project named `inkcre-website`:

1. add sitemap hostname, canonical/Open Graph URLs, production robots behavior, and explicit
   `noindex` headers for `pages.dev` origins;
2. upload the exact artifact produced by the unprivileged website contract job;
3. in a separate production-environment job, idempotently ensure the Direct Upload project and
   `inkcre.dev` custom domain through the Cloudflare Pages API;
4. deploy the downloaded artifact using the existing organization Cloudflare credentials;
5. smoke-test the immutable Pages deployment and `https://inkcre.dev`;
6. keep application deployment at `app.inkcre.dev` independent.

External state in scope:

- allow `InKCre/docs` to consume the existing selected organization secrets
  `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`;
- set repository variable `CLOUDFLARE_PAGES_PROJECT=inkcre-website`;
- create or reconcile the `inkcre-website` Pages project with production branch `main`;
- attach `inkcre.dev`, allowing Cloudflare to create the apex DNS record and certificate;
- create a GitHub `production` deployment environment through the workflow.

GitHub preparation completed on 2026-07-28: the selected organization secrets now also allow
`InKCre/docs`, the repository variable is set, and the `production` environment accepts
deployments only from `main`. The workflow remains responsible for idempotently reconciling the
Cloudflare Pages project and custom domain.

When the first published route moves, add its direct permanent redirect under
`website/content/public/_redirects` and verify both old and new URLs. Do not add custom global
cache rules until measured behavior requires them.

## Deferred Content Expansion

Add User Manual, Developer Guide, About, and a fuller Landing only when real content and stable
product pressure exist. Candidate route namespaces are `/manual/`, `/developer/`, and `/about/`;
confirm each before its first page is published rather than creating placeholders now.

When Chinese content enters scope, add `/zh/**` only after the published locale set has route
parity or a deliberate fallback-capable locale switch. A normal VitePress build does not detect
missing translated counterparts.

Keep current documentation versionless. Add historical versions only when InKCre has a real
multi-version support obligation, without moving the current public routes.

## Stop Conditions

Return to discussion before continuing if:

- website implementation would require changing canonical Hub truth;
- a dependency or VitePress prerelease migration changes the planned minimal surface;
- site setup starts to introduce root workspace metadata or unrelated repository tooling;
- dead-link repair would require publishing an internal page;
- implementation starts to create speculative product documentation;
- deployment or external-domain work enters scope without explicit authorization.
