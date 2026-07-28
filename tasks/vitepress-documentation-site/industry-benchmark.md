# VitePress Documentation Site Industry Benchmark

Date: 2026-07-28

## Purpose And Method

This benchmark tests both whether the planned InKCre boundary is sound and which foundations
successful VitePress projects establish before content scale makes them expensive to change. It
is not a feature checklist or a justification of choices already made.

The sample deliberately covers three different pressures:

- a dedicated documentation repository: Vue documentation;
- documentation packages inside product repositories: VitePress, Vite, and Vitest;
- large generated or multi-surface documentation systems: VueUse and UnoCSS.

All repository claims below were checked against the named default-branch commit and official
VitePress documentation. Popularity is only a filter for operational evidence, not proof that
every mechanism should be copied. At the time of inspection, the repositories ranged from about
3,200 to 82,000 GitHub stars.

## Repository Comparison

| Project | Snapshot | Site topology and source model | Build and publication | Relevant lesson |
|---|---|---|---|---|
| [Vue docs](https://github.com/vuejs/docs/tree/7681134fd8505e61a265d161d73d28acb3c74822) | `7681134` | The repository is the site. VitePress configuration lives in `.vitepress/`, while `srcDir: 'src'` keeps public Markdown in one content root. Navigation is explicit; theme and marketing integrations are extensive. | `dev`, `build`, `preview`, and Vue type-check scripts; VitePress build retains default dead-link failure. Netlify builds `.vitepress/dist`; there is no PR site-build workflow. | Closest positioning match. Adopt the bounded content root and typed configuration, but not its mature marketing/theme surface or provider-only validation. |
| [VitePress](https://github.com/vuejs/vitepress/tree/430a890a17910593e26e9654b141ef3855ecceac) | `430a890` | `docs/` is a workspace package that dogfoods the framework through `workspace:*`. Locale content, translation tracking, search, and metadata are split only because the project serves the framework itself in many languages. | Framework `check` covers formatting, build, types, unit, init, and browser E2E. Netlify separately builds the production docs and translation report. | Treat VitePress's tests as framework-owner obligations, not normal site requirements. Its minimal default-theme extension is more relevant than its locale and E2E machinery. |
| [Vite](https://github.com/vitejs/vite/tree/d17d739eedc4e8ede5973f1533826f27554c2078) | `d17d739` | `docs/` is a workspace package inside the product monorepo. Markdown is primary; small data loaders and a `buildEnd` hook produce blog/RSS data. Version data comes from the product package. | `test-docs` runs the VitePress build in GitHub CI. Netlify runs `ci-docs`, which builds product packages before the site because the docs consume them. | Strongest CI reference: make the production docs build a merge gate. Do not copy the product-build dependency, RSS hook, custom theme, or version-site redirects. |
| [Vitest](https://github.com/vitest-dev/vitest/tree/eb16ab80330c7f33cc894eede76633191358d7b4) | `eb16ab8` | `docs/` is a workspace package. Most content is handwritten, while CLI pages are generated from executable CLI definitions. The site adds PWA, custom theme, and build-time contributor data. | CI checks that generated CLI content is current. Netlify performs the full docs build, including a product build and network prefetch. | Generate only content with an executable canonical owner and a demonstrated drift problem. Avoid PWA and build-time network dependencies for the InKCre first slice. |
| [VueUse](https://github.com/vueuse/vueuse/tree/a7d9aba02985c8f71931b99ae903b458a8d652da) | `a7d9aba` | VitePress uses `packages/` as its site root. Function metadata, types, source files, demos, Git history, and Markdown transforms produce navigation and rich API pages. | A high-memory build first refreshes metadata and package outputs. Netlify publishes the result; repository CI primarily protects the library. | This is a scale-specific code-to-doc projection system. It is evidence against introducing generation before InKCre has many uniform executable documentation units. |
| [UnoCSS](https://github.com/unocss/unocss/tree/e28a47c557fe179935a37a4fbeb650292d0d1d5a) | `e28a47c` | `docs/` remains mostly handwritten with explicit navigation, while shared generated package data powers documentation, playground, and interactive surfaces. | Netlify builds product packages, docs, playground, and interactive apps together. CI spans operating systems and product tests. | Its local search and narrow dead-link exceptions are reusable later. Its multi-product build, interactive tools, and package-generation graph are outside InKCre's current pressure. |

## Version And Toolchain Evidence

The external sample has already moved to the VitePress 2 prerelease line:

| Project | Declared VitePress version |
|---|---|
| Vue docs | `^2.0.0-alpha.17` |
| Vite | `^2.0.0-alpha.18` |
| Vitest | `2.0.0-alpha.16` |
| VueUse | `^2.0.0-alpha.17` through its workspace catalog |
| UnoCSS | `^2.0.0-alpha.17` through its workspace catalog |

VitePress itself was at `2.0.0-alpha.18`. This supports the preflight conclusion that VitePress
2 is a credible implementation candidate, but does not justify floating on `next`. InKCre
should keep one exact version in `website/package.json` and its lockfile, then re-evaluate that
pin when implementation starts.

The sample consistently declares pnpm and uses Node 20 or newer; current hosted builds commonly
use Node 24. InKCre's prepared Node `22.22.3` and pnpm `11.17.0` remain compatible candidates,
subject to the execution-time package check.

## Cross-Project Findings

### 1. A bounded site root is the common architectural seam

Every project gives VitePress a deliberate source boundary: a dedicated repository root, a
`docs/` package, `srcDir`, or a package subtree. None treats unrelated repository Markdown as
implicitly public.

This supports:

```text
website/                       package and site root
  .vitepress/                  site configuration
  content/                     only routable Markdown
```

It also supports the prior projection decision. Mature projects generate from code only when
their product topology makes code an appropriate canonical owner; they do not demonstrate a
general need to compile an internal collaboration Hub directly.

### 2. The production build is the basic content contract

VitePress's `ignoreDeadLinks` default is `false`: a production build fails on dead links unless
the site deliberately opts out. The sampled sites generally rely on this behavior instead of a
second internal-link checker. Vite goes further and executes the docs build in GitHub CI.

For InKCre:

- `pnpm --dir website check` should be deterministic and include the production build;
- do not set `ignoreDeadLinks: true`;
- add only narrow exceptions if a real non-page route later requires one;
- do not add browser E2E while the site is static Markdown plus the default theme.

### 3. Build verification and deployment are separate concerns

Most sampled sites publish through Netlify, while repository CI protects selected source
contracts. The official VitePress GitHub Pages example also separates a build job from the
privileged deployment job and gives the deployment job explicit permissions and concurrency.

For InKCre:

- add a PR/push site-build workflow after the local package works;
- use frozen installation and pinned action SHAs;
- keep deployment, credentials, domain metadata, previews, and post-deploy smoke in the later
  deployment slice;
- build once and deploy the checked artifact when publication enters scope.

### 4. Search follows corpus size

Vite, Vitest, and UnoCSS use built-in local search. Vue docs, VitePress, and VueUse use Algolia
because their established corpora and traffic justify an external index. VitePress supports
local search without an external service.

The one-page InKCre slice should show no search control. When reader-facing documentation pages
exist, local search is the default next step; Algolia requires separate scale or relevance
evidence.

### 5. URL shape is an early contract; origin metadata follows the hostname

Large sites commonly enable clean URLs, sitemap generation, canonical metadata, Open Graph
metadata, edit links, and last-updated timestamps. They do not all have the same activation
point:

- public route shape, `base`, and internal-link conventions affect every page and should be
  stable from the first build;
- Cloudflare Pages supports clean paths for the intended static output, so enable `cleanUrls`
  in the first slice rather than migrating published links later;
- sitemap, canonical URLs, and `og:url` require the confirmed public hostname;
- `lastUpdated` requires useful Git history in the build checkout;
- edit links become useful when the site has reader-facing documentation pages.

The initial index still needs correct language, title, description, responsive behavior, and
accessible default-theme interaction.

### 6. Locale-ready source is cheaper than a later source-tree migration

VitePress itself stores default English content under `docs/en/**`, rewrites it to the public
root, and places other locales under prefixes such as `/zh/`. This preserves root English URLs
while keeping source ownership explicit.

InKCre should start with `website/content/en/**` and publish it at root, subject to Sir
confirming English as the default public language. Only the root locale should be active now.
A disposable build proved that VitePress does not fail when a locale switch points to a missing
translation, so a future locale needs route parity or a deliberate fallback-capable switch.

### 7. Formatting, CI status, and dependency updates are lifecycle foundations

Vue docs and VitePress establish formatting configuration and checks before their content
corpora grow. Vite and Vitest run documentation build or repository checks in CI. VitePress,
Vite, and neighboring InKCre packages also show least-privilege workflows, concurrency control,
frozen dependency installation, and automated dependency maintenance.

These details are inexpensive in the first engineering slice and costly to retrofit:

- add package-local EditorConfig and pinned formatter configuration;
- make formatting verification and the production build the deterministic `check`;
- use one always-reporting required workflow;
- avoid workflow-level path filters for a required check because a skipped workflow can remain
  pending in GitHub;
- add a weekly updater scoped to `/website`, with no auto-merge, because the selected VitePress
  version is a pinned prerelease.

A dedicated external-link crawler is not a consistent baseline across the sample. Add one only
when outbound-link volume creates a demonstrated maintenance problem.

The external sample establishes the need for an early formatting contract, not a mandatory
formatter brand. Execution-time inspection found that modern neighboring InKCre repositories
use Oxfmt, whose current language support includes Markdown and the site's configuration
formats. The implementation therefore reuses pinned Oxfmt rather than introducing Prettier as a
local exception.

### 8. Generated content is justified by a canonical executable owner

Vitest generates CLI documentation from CLI definitions. VueUse derives pages from function
metadata, source, types, and demos. UnoCSS shares generated package data with its docs and
interactive tools. Each generation graph exists because there are many uniform units and a
real executable owner.

This does not justify a Hub-to-website mirror. InKCre has already accepted editorial projection,
and the current site has no repetitive executable documentation surface. If a future CLI,
schema, or API becomes canonical and produces many pages, add one narrow generator for that
surface and verify generated output freshness.

## InKCre Engineering Baseline

### Adopt in the first implementation slice

- one independent `website/` package with its own exact tool declarations and lockfile;
- one explicit website-owned Markdown root through `srcDir: 'content'`, with default-language
  source under `content/en/**` rewritten to public root routes;
- `base: '/'`, `cleanUrls: true`, extensionless public links, and stable route conventions;
- only the root locale until a second locale has route parity or safe fallback behavior;
- default VitePress theme, typed minimal configuration, and a simple index;
- package-local EditorConfig and pinned Oxfmt configuration;
- `dev`, `build`, `preview`, `format`, `format:check`, and deterministic `check` scripts;
- production build as the dead-link and static-rendering gate;
- one always-reporting GitHub Actions workflow after local verification, using frozen install,
  least privilege, concurrency cancellation, timeout, and pinned action SHAs;
- a weekly dependency updater scoped to `/website`, without auto-merge;
- dependency audit as an explicit dependency-selection and update check;
- production-output assertions for root rewrite and clean-link behavior;
- manual wide/narrow viewport and keyboard review.

### Add only when triggered

- local search: when a reader-facing documentation corpus exists;
- edit links and last-updated data: when documentation pages warrant them;
- sitemap, canonical/Open Graph URLs, robots behavior, and deployment smoke: when the hostname
  is confirmed;
- custom theme components: when a real brand or reader interaction cannot be expressed by the
  default theme;
- generated pages: when an executable canonical owner and repetitive page family exist;
- source-controlled redirects: when the first published URL changes;
- version routing: when a real multi-version support obligation exists.

### Do not include in the current plan

- Algolia, PWA, offline caching, or browser E2E;
- Twoslash, Graphviz, tabs, group icons, or custom Markdown transforms;
- `vitepress-plugin-llms` or another website-derived agent corpus: the website is not InKCre's
  canonical agent knowledge surface;
- a published second locale, translation tracking, version subdomains, or redirect fleets;
- contributor, sponsor, avatar, analytics, advertising, or marketing integrations;
- generated Hub mirrors, source-route manifests, hash/freshness gates, or global dead-link
  suppression;
- product builds, playgrounds, interactive apps, or Spoke test matrices in the website pipeline.

## Changes To The Prepared Plan

The benchmark preserves the selected architecture and narrows the first slice:

1. Keep `website/content` and the editorial projection boundary.
2. Put default-language source under `content/en/**`, rewrite it to public root routes, and
   activate only the root locale.
3. Set the root deployment base, clean URLs, extensionless links, formatting contract, and
   route conventions in the first slice.
4. Omit search from the one-page site; prefer local search when content expands.
5. Let VitePress production build enforce internal dead links, but add explicit output
   assertions for route rewrites because the build does not prove locale parity.
6. Keep `check` deterministic. Run the network-dependent dependency audit explicitly during
   dependency selection and updates instead of embedding it in every `check`.
7. Use `preview` for manual acceptance and later deployment smoke, not as a background process
   inside the normal CI check.
8. Use an always-reporting CI workflow and a scoped weekly dependency updater from the first CI
   slice.
9. Defer hostname-dependent metadata, not URL shape, until deployment is confirmed.

## Primary Sources

- [VitePress site configuration](https://vitepress.dev/reference/site-config)
- [VitePress routing and rewrites](https://vitepress.dev/guide/routing)
- [VitePress internationalization](https://vitepress.dev/guide/i18n)
- [VitePress asset handling](https://vitepress.dev/guide/asset-handling)
- [VitePress search](https://vitepress.dev/reference/default-theme-search)
- [VitePress deployment](https://vitepress.dev/guide/deploy)
- [VitePress's own locale-ready configuration](https://github.com/vuejs/vitepress/blob/430a890a17910593e26e9654b141ef3855ecceac/docs/.vitepress/config.ts)
- [Oxfmt language support](https://oxc.rs/docs/guide/usage/formatter/language-support)
- [Cloudflare Pages serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
- [GitHub Actions path-filter status behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Vue docs package](https://github.com/vuejs/docs/blob/7681134fd8505e61a265d161d73d28acb3c74822/package.json)
- [Vue docs configuration](https://github.com/vuejs/docs/blob/7681134fd8505e61a265d161d73d28acb3c74822/.vitepress/config.ts)
- [Vite docs package](https://github.com/vitejs/vite/blob/d17d739eedc4e8ede5973f1533826f27554c2078/docs/package.json)
- [Vite docs CI gate](https://github.com/vitejs/vite/blob/d17d739eedc4e8ede5973f1533826f27554c2078/.github/workflows/ci.yml)
- [Vitest docs package](https://github.com/vitest-dev/vitest/blob/eb16ab80330c7f33cc894eede76633191358d7b4/docs/package.json)
- [VueUse site configuration](https://github.com/vueuse/vueuse/blob/a7d9aba02985c8f71931b99ae903b458a8d652da/packages/.vitepress/config.ts)
- [VueUse Markdown transform](https://github.com/vueuse/vueuse/blob/a7d9aba02985c8f71931b99ae903b458a8d652da/packages/.vitepress/plugins/markdownTransform.ts)
- [UnoCSS site configuration](https://github.com/unocss/unocss/blob/e28a47c557fe179935a37a4fbeb650292d0d1d5a/docs/.vitepress/config.ts)
- [UnoCSS deployment configuration](https://github.com/unocss/unocss/blob/e28a47c557fe179935a37a4fbeb650292d0d1d5a/netlify.toml)
