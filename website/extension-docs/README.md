# First-party Extension documentation

First-party producers use this VitePress preset and the website's theme through their pinned
`docs/_shared` checkout. The Hub owns the template; the producer owns the pages. Ecosystem authors
can build an entirely different static site because Registry receives only its output.

Each set has ordinary Markdown pages, `.vitepress/config.mts`, and `.vitepress/theme/index.ts`.
Import `extensionDocs` from this directory in the config, with the Extension name, scope, title,
description, and its own sidebar. The theme entry re-exports `website/.vitepress/theme/index.ts`.
Relative import paths are resolved from each producer's document location. Do not copy the theme.

Install the locked toolchain once, then build a set from the producer repository root:

```sh
pnpm --dir docs/_shared/website install --frozen-lockfile
INKCRE_DOCS_VERSION=0.2.0 pnpm --dir docs/_shared/website exec vitepress build \
  "$PWD/extensions/memos/docs/global"
```

The output is `<set>/.vitepress/dist/`. `INKCRE_DOCS_VERSION` is required and must match the exact
Release targeted by publication. Set `INKCRE_DOCS_REGISTRY_URL` when publishing to another Registry;
it defaults to the public first-party Registry. The build requires no publisher credential or final
snapshot hostname. Root-relative links work at the snapshot's root origin.

Use `/` for the overview and stable leaf routes for complete procedures. Local search, narrow-screen
navigation, version/scope labels, and the existing `InterfaceGuide` Web/CLI selector are shared.
Without JavaScript both interface sections remain readable. Set `outline: false` on pages using
`InterfaceGuide`, so the outline does not link to hidden headings. This template adds no Service
Worker or offline cache.

Validate each set with VitePress's dead-link checks and inspect its built HTML before uploading.
Publication uses the Developer Toolkit's static-bundle protocol; it does not publish another Python
or MF artifact. Upload the complete output and retain the candidate for uncertain-response recovery.
Never publish a newly built candidate over an unreviewed newer documentation entity tag.
