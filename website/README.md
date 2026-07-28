# InKCre Website

This package builds the public InKCre documentation site. Its Markdown is a reader-oriented
projection of the canonical shared product truth in the repository root; it does not replace that
truth or make Hub-local collaboration files public.

## Commands

Run commands from the repository root:

```sh
pnpm --dir website dev
pnpm --dir website check
pnpm --dir website preview
```

The deterministic `check` command verifies formatting, builds the production site with VitePress's
dead-link checks enabled, and checks the generated route contract. Dependency advisories remain a
separate, network-dependent check:

```sh
pnpm --dir website audit --audit-level high
```

## Content And Route Contract

- VitePress reads only `content/`.
- English source lives under `content/en/` and is published at the public root.
- Future Chinese source will live under `content/zh/` and be published under `/zh/`.
- Only English is active until the Chinese route set is complete or the locale switch has a
  deliberate fallback.
- Section indexes use trailing-slash routes, such as `/manual/`.
- Leaf pages use lowercase ASCII kebab-case routes without an extension, such as
  `/manual/getting-started`.
- Source ordering belongs in navigation configuration, not numeric filename prefixes.
- Published routes are compatibility contracts. Move one only with a direct permanent redirect.

Internal Markdown links target rewritten public routes and omit `.md` and `.html`. Relative links
are resolved from the rewritten route, not the source file location.

## Page Authoring

- Keep exactly one H1 per page.
- Add a concise page `description` in frontmatter.
- Give headings explicit custom anchors only when another page or external consumer needs a durable
  deep link.
- Keep current product behavior tentative where the canonical Hub does not claim stability.
- Link to a canonical Hub source when it materially helps readers or maintainers.
- Do not create empty pages or navigation for future User Manual, Developer Guide, or About
  sections.

Update canonical Hub truth first when a public page reveals a real product or cross-unit contract
mismatch.

## Publication

`Website checks` builds and uploads `inkcre-website-dist`. The separate `Pages deployment` workflow
accepts only a successful artifact for the exact current `main` commit, downloads that artifact
without rebuilding it, and deploys it to the `inkcre-website` Cloudflare Pages Direct Upload
project.

The deployment controller idempotently owns:

- production branch `main`;
- custom domain `inkcre.dev`;
- canonical, sitemap, robots, and Open Graph metadata;
- `noindex` headers on production and immutable `pages.dev` origins;
- smoke checks for HTTPS, root HTML, real `404`, sitemap, robots, and canonical behavior.

GitHub provides the deployment inputs without copying credentials into this package:

```text
organization secrets:
  CLOUDFLARE_ACCOUNT_ID
  CLOUDFLARE_API_TOKEN

repository variable:
  CLOUDFLARE_PAGES_PROJECT=inkcre-website
```

The Cloudflare token requires Pages Write access. The application at `app.inkcre.dev` remains an
independent deployment.
