# VitePress Website Evolution Foundation Audit

Date: 2026-07-28

## Purpose

This audit asks a stricter question than whether the current proposal can build: which early
decisions become expensive after URLs are published, content grows, or CI becomes a merge
contract?

The answer is not to pre-build the future site. It is to establish a few stable seams now and
leave reversible features unimplemented.

## Decision Matrix

| Concern | Correct early decision | Activation point |
|---|---|---|
| Site boundary | Keep one independent `website/` package and expose only its content root. | Initial scaffold |
| Locale-ready source | Store the default-language source in `website/content/en/**`; rewrite it to public root routes. | Initial scaffold |
| Public URL shape | Use `base: '/'`, `cleanUrls: true`, extensionless links, and stable section-index routes. | Initial scaffold |
| Active locales | Configure only the default root locale; do not advertise an incomplete second locale. | Initial scaffold |
| Content conventions | Use one H1, useful page descriptions, public-route links, and explicit anchors for durable deep links. | First page |
| Formatting | Add package-local EditorConfig and pinned formatter checks before content accumulates. | Initial scaffold |
| CI contract | Run one always-reporting required check with frozen install, least privilege, concurrency, timeout, and pinned actions. | First CI slice |
| Dependency upkeep | Add a scoped weekly updater for `/website`, without auto-merge. | First CI slice |
| Canonical origin | Confirm hostname, canonical URLs, sitemap hostname, robots behavior, and social URLs. | Before first public deployment |
| Redirect ownership | Keep direct redirects in version control under the site public directory. | Before the first published route moves |
| Section namespaces | Choose a durable route before publishing the first page in that section; do not create placeholders now. | First section page |
| Search and custom UI | Add only after corpus size or a real reader need justifies them. | Later pressure |

## Recommended Initial Route Contract

The initial configuration should encode:

```text
source root:          website/content
default source:       website/content/en/**
default public root:  /**
future Chinese root:  /zh/**
deployment base:      /
clean URLs:           enabled
active locales:       English root only
```

The relevant VitePress model is:

```text
srcDir: 'content'
base: '/'
cleanUrls: true
rewrites: { 'en/:rest*': ':rest*' }
locales.root: English
```

English at the public root is a recommendation, not yet a confirmed product decision. It
matches the language of the current durable Hub documents and avoids an `/en/` migration if
Chinese is added later. Sir should confirm it before implementation.

Public route rules:

- `/` is the simple site index.
- Section indexes use a trailing slash, for example `/manual/`.
- Leaf pages are extensionless, for example `/manual/getting-started`.
- Route segments are lowercase ASCII kebab-case and do not contain numeric ordering prefixes.
- Internal Markdown links target public routes and omit `.md` and `.html`.
- A heading used as a durable cross-page target receives an explicit custom anchor.
- Once published, a route is an external contract; a move requires a direct permanent redirect.

Candidate future namespaces are `/manual/`, `/developer/`, and `/about/`. They reserve no content
and should not appear in navigation until real pages exist. Their names must be confirmed before
the first page in each section is published, not necessarily for the one-page scaffold.

## Why This Must Be Done Early

### Locale-ready source without locale-prefixed default URLs

VitePress itself stores English under `docs/en/**` and rewrites it to root routes. This separates
source ownership from public addresses: adding `docs/zh/**` does not force English URLs or files
to move.

Starting with `content/index.md` is simpler only for the first page. Moving an established
corpus to `content/en/**` later creates a broad source rename, affects relative links and edit
history, and makes translation rollout harder to review.

### URL shape is independent from canonical-host metadata

`cleanUrls` controls the shape of every internal link, so postponing it creates avoidable URL
and redirect churn. Cloudflare Pages serves clean paths for generated `.html` and `index.html`
files, so the intended host supports this contract.

By contrast, sitemap hostnames, canonical links, Open Graph URLs, and production robots rules
depend on the final origin. Those should be decided before publication, not invented during the
local scaffold.

### Formatting is a content migration concern

Adding a formatter after dozens of Markdown pages creates a repository-wide mechanical rewrite
that obscures meaningful history. A package-local EditorConfig, pinned formatter, and
`format:check` gate are small now and expensive to retrofit.

Execution-time inspection found that modern neighboring InKCre repositories use Oxfmt. Its
official language support includes Markdown, TypeScript, JSON, and YAML, so the website should
reuse a pinned Oxfmt release instead of creating a project-local Prettier exception.

### A required CI check must always report

GitHub documents that a workflow skipped by path filtering can leave a required check pending.
For this small site, an always-run website check is cheaper and more reliable than a
path-filtered required workflow. If execution cost later becomes material, an always-reporting
change-detection job can replace it without changing the branch-protection contract.

## Evolution Pre-mortem

### Adding Chinese

Add `website/content/zh/**` and a `zh` locale while keeping English at root. Do not enable the
locale switcher merely because one translated page exists.

A disposable VitePress 2 fixture showed that the build succeeds even when the generated locale
switch points to a missing counterpart route. Therefore translation rollout needs one of:

- route parity for the published locale set; or
- a deliberate locale-switch implementation that falls back safely.

The minimal site should use only the root locale until that rule is implemented.

### Expanding sections

Navigation and sidebar data can remain inline while there is one page and split into
section-local configuration modules later. Do not create empty directories, placeholder pages,
or speculative navigation merely to reserve the future information architecture.

### Moving a published page

Keep redirect rules in `website/content/public/_redirects` when the first redirect is needed.
Use direct old-to-new mappings rather than chains, and test both the canonical destination and
the old URL in deployment smoke checks.

### Versioning unstable product documentation

Keep current documentation versionless at root. Do not introduce `/latest/`, `/v0/`, or version
subdomains before InKCre has an explicit multi-version support obligation. If historical
documentation later becomes necessary, preserve current routes and add an archive rather than
moving the current corpus.

### Deploying

Build once in the unprivileged verification job and deploy that exact artifact in a separate
privileged job. Before first publication, confirm the canonical hostname and add sitemap,
canonical/social metadata, production robots behavior, and preview `noindex` handling.

Cloudflare's default cache behavior is sufficient for the first static site; custom global
cache rules are not an early requirement.

## Disposable Route Experiment

A VitePress `2.0.0-alpha.18` fixture used `srcDir: 'content'`, `cleanUrls: true`, an
`en/:rest* -> :rest*` rewrite, and only a root English locale.

Observed output:

- `content/en/index.md` produced `/index.html`, not `/en/index.html`;
- `content/en/manual/index.md` produced `/manual/index.html`;
- `content/en/manual/getting-started.md` produced
  `/manual/getting-started.html`;
- generated internal links used clean public paths without `.html`;
- adding a `zh` locale produced `/zh/**`;
- a missing Chinese counterpart did not fail the production build.

This validates the proposed source/public split and disproves an assumption that the normal
VitePress build alone enforces translation-route parity.

## Intentionally Reversible Later

No initial placeholder or abstraction is needed for:

- search;
- custom theme components and CSS;
- split navigation/sidebar modules;
- edit links and last-updated display;
- PWA, Twoslash, LLM exports, analytics, or external search;
- data loaders and generated pages without an executable canonical owner;
- a dedicated external-link crawler.

## Primary Evidence

- [VitePress routing and rewrites](https://vitepress.dev/guide/routing)
- [VitePress internationalization](https://vitepress.dev/guide/i18n)
- [VitePress Markdown custom anchors](https://vitepress.dev/guide/markdown)
- [VitePress asset and public-directory behavior](https://vitepress.dev/guide/asset-handling)
- [VitePress's own locale-ready configuration](https://github.com/vuejs/vitepress/blob/430a890a17910593e26e9654b141ef3855ecceac/docs/.vitepress/config.ts)
- [Oxfmt language support](https://oxc.rs/docs/guide/usage/formatter/language-support)
- [Cloudflare Pages serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
- [GitHub Actions path-filter status behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
