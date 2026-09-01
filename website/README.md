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
dead-link checks enabled, and checks the generated route, metadata, locale, source-link, and sitemap
contract. Dependency advisories remain a separate, network-dependent check:

```sh
pnpm --dir website audit --audit-level high
```

## Content And Route Contract

- VitePress reads only `content/`.
- English source lives under `content/en/` and is published at the public root.
- Future Chinese source will live under `content/zh/` and be published under `/zh/`.
- Only English is active until the Chinese route set is complete or the locale switch has a
  deliberate fallback.
- The current published routes are `/`, `/developer/`, `/developer/architecture`,
  `/developer/contributing`, and `/about/`.
- Section indexes use trailing-slash routes, such as `/developer/`.
- Leaf pages use lowercase ASCII kebab-case routes without an extension, such as
  `/developer/architecture`.
- Source ordering belongs in navigation configuration, not numeric filename prefixes.
- Published routes are compatibility contracts. Move one only with a direct permanent redirect.
- `scripts/site-contract.mjs` owns the route matrix shared by generated-output and deployment
  verification.

Internal Markdown links target rewritten public routes and omit `.md` and `.html`. Relative links
are resolved from the rewritten route, not the source file location.

## Page Authoring

- Keep exactly one H1 per page.
- Add a concise page `description` in frontmatter.
- Give headings explicit custom anchors only when another page or external consumer needs a durable
  deep link.
- Keep current product behavior tentative where the canonical Hub does not claim stability.
- Link to a canonical Hub source when it materially helps readers or maintainers.
- Keep exact setup commands, versions, runtime mechanics, and contribution checks in the repository
  that enforces them.
- Documentation layouts expose Git-derived last-updated data and a source edit link after their
  content is committed. The VitePress home layout intentionally has no document footer.
- Do not create empty pages or navigation for future User Manual, database, Extension, API, or
  Chinese sections.

Update canonical Hub truth first when a public page reveals a real product or cross-unit contract
mismatch. Public-only identity, About, and presentation facts remain website-owned and do not need
an artificial Hub mirror.

## Publication

`Website checks` validates pull-request candidates and supports manual diagnostics. It proves that
the website can be built and that the generated site satisfies the repository contract, but it owns
neither a preview delivery input nor canonical production delivery. After a successful
same-repository run, the trusted Preview workflow checks out that exact head, builds it itself, and
publishes an isolated, deterministic, short-lived preview. Fork pull requests receive no preview
credentials, preview origins remain `noindex`, and closing the pull request replaces the live
preview with a trusted closed-preview tombstone. The stable `preview-docs-pr-N` branch alias is the
user-facing preview URL and is recorded against the pull-request head in GitHub; Cloudflare retains
the underlying immutable deployments in its history. If automatic retirement fails, the cleanup
workflow can be run manually for the closed pull-request number. A preview build is never promoted
to production.

Protected `main` is the publication authority. `Pages deployment` runs for a push to `main`; failed
runs can be rerun for the same commit, while rollback starts by reverting `main` through a pull
request. The secret-free build job checks out the pushed commit, installs the frozen website
toolchain, runs the release contract, and uploads `inkcre-website-dist`. Its production job
downloads that artifact from the same workflow run without rebuilding it, checks that `main` still
names the selected commit, and deploys the artifact to the `inkcre-website` Cloudflare Pages Direct
Upload project.

The release records its source commit, workflow run, artifact identity and digest, Cloudflare
deployment identity, and smoke result. Independent pull-request and release builds are not required
to be byte-identical.

The deployment controller idempotently owns:

- production branch `main`;
- custom domain `inkcre.dev`;
- canonical, sitemap, robots, and Open Graph metadata;
- `noindex` headers on production and immutable `pages.dev` origins;
- smoke checks for HTTPS, the root page, real `404`, sitemap, robots, and canonical behavior.

Trusted GitHub environment jobs provide the deployment inputs without copying credentials into this
package. Preview and production currently reuse the repository-selected organization credentials;
pull-request source code never executes in the credential-bearing preview controller:

```text
repository-selected organization secrets:
  CLOUDFLARE_ACCOUNT_ID
  CLOUDFLARE_API_TOKEN

repository variable:
  CLOUDFLARE_PAGES_PROJECT=inkcre-website
```

The Cloudflare token requires Pages Write access. The one-time domain bootstrap also requires the
proxied apex DNS record `inkcre.dev CNAME inkcre-website.pages.dev`; it is zone state rather than
part of each content deployment. The application at `app.inkcre.dev` remains an independent
deployment.
