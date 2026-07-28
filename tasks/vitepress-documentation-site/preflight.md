# VitePress Documentation Site Preflight

Date: 2026-07-28

All experiments ran in a disposable `/tmp` fixture copied from the current Hub. No website,
package, configuration, CI, or canonical Hub document was changed in the working repository.

## Decision Outcome

Directly building canonical Hub Markdown into website pages was technically feasible but was
not selected.

Sir accepted normal editorial drift between canonical Hub truth and a human-facing website.
The selected architecture keeps all VitePress Markdown under `website/`; Hub documents inform
website content through ordinary editing judgment, summaries, and links. There is no
source-to-route manifest, wrapper fleet, generated mirror, source hash gate, or cross-surface
freshness mechanism.

This is the simpler and deeper boundary:

```text
Hub owns shared product and cross-unit truth.
Website owns public presentation and reader-oriented structure.
```

When a website page depends materially on a Hub claim, a normal source link is sufficient.
When a real mismatch is discovered, update the canonical Hub owner first and then adjust the
website page when it is in scope.

## Reusable Environment Evidence

- Local runtime: Node `22.22.3`, npm `10.9.8`, pnpm `11.17.0`, macOS arm64.
- Neighboring InKCre packages already use Node `22.22.3`, package-local pnpm declarations,
  `devEngines.runtime`, frozen installs, and aggregate `check` commands.
- Registry state during preflight:
  - VitePress stable: `1.6.4`;
  - VitePress `next`: `2.0.0-alpha.18`;
  - Vite stable: `8.1.5`.
- VitePress 1.6.4 built the disposable fixture, but its resolved dependency graph reported
  three moderate and one high vulnerability.
- VitePress 2.0.0-alpha.18 built and previewed successfully, and
  `pnpm audit --audit-level high` reported no known vulnerabilities.
- The prerelease must be pinned exactly and re-evaluated at execution time; implementation must
  not float on the `next` tag.

## Findings That Shaped The Plan

- Root `README.md` is a repository entry and links to Hub-local task state, so it should not be
  reused as the public index.
- A minimal site-owned index avoids changing README or weakening dead-link checks.
- Keeping VitePress source and dependencies inside `website/` removes the parent-source module
  resolution seam and makes Hub-local files unreachable by construction.
- Development-server HTTP status is not useful publication evidence because VitePress serves an
  SPA shell for unknown paths; production build and preview remain the meaningful checks.
- The client-web Cloudflare Pages workflow contains application-specific artifact identity,
  SPA, preview-cleanup, and database concerns. The documentation site should reuse only the
  Node/pnpm and pinned-action conventions, not that workflow's complexity.

## Route And Locale Evolution Experiment

A second disposable fixture tested the source and URL model that would otherwise be expensive
to retrofit. It used VitePress `2.0.0-alpha.18` with:

```text
srcDir: 'content'
base: '/'
cleanUrls: true
rewrites: { 'en/:rest*': ':rest*' }
locales.root: English
```

The source tree contained:

```text
content/en/index.md
content/en/manual/index.md
content/en/manual/getting-started.md
```

The production build passed and emitted:

```text
.vitepress/dist/index.html
.vitepress/dist/manual/index.html
.vitepress/dist/manual/getting-started.html
```

It emitted no `/en/` output, used `en-US` page language, and generated clean internal links
without `.html`. Adding a Chinese locale and `content/zh/**` generated `/zh/**` while English
remained at root.

The negative test was more important: when the English leaf page had no Chinese counterpart,
the locale switch still linked to `/zh/manual/getting-started`, and the production build still
passed. Therefore:

- default-language source should start under `content/en/**`;
- only the root locale should be active initially;
- a future locale requires route parity or a fallback-capable locale switch;
- production build remains the dead-link baseline but is not a translation-parity check.

Cloudflare Pages' documented clean-path behavior supports enabling `cleanUrls` from the first
build. Hostname-dependent sitemap, canonical, social, and robots metadata can still wait until
the public origin is confirmed.

## Selected Verification Baseline

Implementation should verify:

```text
pnpm --dir website install --frozen-lockfile
pnpm --dir website check
svc status --json
svc init --agent codex --json
git diff --check
```

The deterministic website `check` command should run formatting verification followed by the
VitePress production build and its default dead-link check. The network-dependent advisory
audit remains an explicit dependency-selection and update check. Production-output assertions
verify that the default language stays at root and generated links use the selected clean URL
contract. Preview remains a manual acceptance and later deployment-smoke tool rather than a
background process in the normal check.

Canonical Hub directories remain outside VitePress's source root and therefore need no
publication manifest or hash comparison.

## Execution Result

The authorized implementation completed on 2026-07-28 with these exact local package pins:

```text
Node:       22.22.3
pnpm:       11.17.0
VitePress:  2.0.0-alpha.18
Oxfmt:      0.60.0
```

Oxfmt replaced the planned Prettier dependency after execution-time inspection showed that
modern neighboring InKCre repositories already use Oxfmt and its official language support
covers Markdown and the website's configuration formats. `0.60.0` was selected instead of the
newly published `0.61.0`: pnpm's supply-chain policy required release-age exceptions for the
new version and its platform bindings, while `0.60.0` is already used by neighboring
repositories and needs no exception.

Implemented surfaces:

- independent package, lockfile, ignores, formatter, configuration, content, and generated-route
  verifier under `website/`;
- a single English index rewritten from `content/en/index.md` to `/`;
- one always-reporting website contract workflow with pinned actions;
- weekly Dependabot coverage for `/website` and root GitHub Actions.

Verification passed:

- frozen installation;
- Oxfmt check;
- VitePress production build and default dead-link gate;
- generated output checks for root `en-US`, no `/en/`, and no internal `.md` or `.html` links;
- deliberate negative probes for `/en?probe=1` and `guide.html?probe=1`, both correctly rejected;
- high-severity dependency audit with no known vulnerabilities;
- desktop `1280x720` and mobile `390x844` browser acceptance;
- root `200`, missing-route `404`, responsive layout, accessible landmarks and controls, and no
  browser console warnings or errors.

The independent final review accepted the implementation. Its two URL-assertion edge cases were
resolved by parsing and normalizing generated local URLs before validation.
