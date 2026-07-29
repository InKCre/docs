# InKCre Website MVP Implementation Plan

Status: locally implemented and verified on 2026-07-29. Commit, push, exact-main CI, and production
acceptance still require Sir's explicit authorization.

## Outcome

Evolve the current one-page proof of concept into one coherent English reader journey:

```text
/                              basic project entry
/developer/                    developer orientation and repository map
/developer/architecture        shared mental model and ecosystem status
/developer/contributing        contribution routing and ownership
/about/                        public identity, purpose, values, and participation
```

The MVP is complete when a first-time technical visitor can understand InKCre's current purpose,
choose a developer path, reach the correct owner for deeper instructions, and understand the
project's public identity without encountering speculative product promises or obsolete legacy
material.

## Impact Handshake

### Address And Object

The implementation is bounded to these production surfaces:

| Surface | Planned change |
| --- | --- |
| `website/content/en/index.md` | Replace the proof-of-concept index with the restrained Landing. |
| `website/content/en/developer/index.md` | Add the Developer Guide entry and active repository map. |
| `website/content/en/developer/architecture.md` | Add the shared mental model and honest ecosystem status. |
| `website/content/en/developer/contributing.md` | Add change-owner and repository routing guidance. |
| `website/content/en/about/index.md` | Add public identity, mission, values, status, and participation. |
| `website/.vitepress/config.mts` | Add navigation, Developer sidebar, local search, source edit links, and Git-derived last-updated behavior. |
| `website/.vitepress/theme/index.ts` | Extend the VitePress default theme without replacing it. |
| `website/.vitepress/theme/custom.css` | Add only restrained InKCre brand variables and typography adjustments. |
| `website/scripts/site-contract.mjs` | Own the declared MVP route matrix shared by local and production verification. |
| `website/scripts/verify-build.mjs` | Expand the generated-site contract from the root page to the full MVP route matrix. |
| `website/scripts/verify-pages-deployment.mjs` | Smoke-test every MVP route on the immutable Pages origin and `inkcre.dev`. |
| `website/README.md` | Record the now-real navigation, source ownership, and verification contract. |

The task packet under `tasks/website-mvp/**` remains the implementation control surface and is
updated as evidence changes.

No change is planned for `website/package.json`, `website/pnpm-lock.yaml`,
`.github/workflows/**`, the Cloudflare configuration controller, or canonical Hub documents.

### State Diff

```text
one public route
  -> five intentional public routes

proof-of-concept index linking mainly to source documents
  -> basic Landing that explains, routes, and declares active development

no public developer orientation
  -> contributor and ecosystem paths with maturity stated honestly

no public identity page
  -> website-owned About truth for InKCre / 第三持存

GitHub link only, no section navigation or search
  -> top navigation, Developer sidebar, local search, edit links, and last-updated metadata

root-only generated-output and production smoke checks
  -> declared route-matrix, canonical, sitemap, locale, clean-link, search, and production checks
```

### Blast Radius

- `inkcre.dev` gains four routes and a new home presentation.
- Navigation, local-search data, sitemap entries, canonical/Open Graph metadata, edit links, and
  last-updated surfaces change for the website.
- The exact checked artifact delivered by the existing Cloudflare Pages pipeline grows to contain
  the MVP corpus.
- GitHub source links route readers into the current primary repositories and canonical Hub
  documents.

The application at `app.inkcre.dev`, legacy GitHub Pages, Spoke repositories, database behavior,
public APIs, and deployment authority do not move.

### Invariants

- English remains at `/`; `/zh/` remains reserved and unpublished.
- VitePress reads only `website/content/**`; Hub Markdown is not directly built or mirrored.
- `10-prd/**` remains authoritative for shared product claims.
- `20-product-tdd/**` remains authoritative for cross-unit technical contracts.
- Repository-local READMEs, contribution files, code, schemas, tests, and automation remain
  authoritative for unit mechanics.
- Public-only organization identity and About claims remain website-owned.
- Published routes use clean, extensionless URLs; section indexes retain trailing slashes.
- The default VitePress theme remains the presentation system. No custom Vue component system,
  plugin, or dependency enters the slice.
- The existing checked-artifact publication path, Pages-origin `noindex`, real `404`, canonical
  origin, sitemap, and robots behavior remain intact.
- Values such as self-hosting and user control are presented as values and direction, not as
  claims of complete current capability.
- Database peer participation is described as use of the admitted protocol, never arbitrary
  access that bypasses schema, privileges, lifecycle, or compatibility boundaries.

### Verification

Local proof:

```text
pnpm --dir website install --frozen-lockfile
pnpm --dir website check
pnpm --dir website audit --audit-level high
svc status --json
svc init --agent codex --json
git diff --check
```

Preview acceptance covers wide and narrow viewports, keyboard navigation, local search, Developer
sidebar behavior, absence of sidebars on Landing and About, one-H1 heading structure, visible
focus, contrast, reduced-motion compatibility, edit-link targets, last-updated rendering, and
browser console errors.

After separately authorized commit and push, production proof covers the successful exact-main
website artifact, successful Pages deployment, all five routes on the immutable and canonical
origins, canonical metadata, sitemap inclusion, Pages-origin `noindex`, official-origin indexing
behavior, clean internal navigation, and a real missing-route `404`.

## Source Map For The Editorial Pass

| Website claim | Canonical evidence or owner |
| --- | --- |
| Collect, organize, and use information later | `10-prd/_drivers/business-and-service-objectives.md`, `10-prd/behavior/claims.md` |
| Reusable info-base and product vocabulary | `10-prd/glossary.md`, `10-prd/behavior/workflows.md` |
| Source / info-base / sink separation | `10-prd/behavior/rules-and-invariants.md`, `10-prd/domain-structure/**` |
| Multi-runtime and database-peer model | `20-product-tdd/unit-topology.md`, `20-product-tdd/system-state-and-authority.md` |
| Admitted PostgreSQL and PostgREST protocol | `20-product-tdd/peer-database-runtime-contract.md` |
| Extension states and ownership boundaries | `20-product-tdd/cross-unit-contracts.md` |
| Active repository roles and local setup links | Current repository state and each repository's owned entry points |
| InKCre / 第三持存, mission, values, and participation | Confirmed website-owned public truth in this packet |
| Legacy origin and naming evidence | `legacy-content-audit.md`; rewrite, never copy wholesale |

The approved About mission is:

> Help information remain reusable—from collection and organization to later use and creation.

The MVP name treatment is limited to:

> InKCre is also known in Chinese as 第三持存 (tertiary retention).

## Execution Slices

### Slice 0: Establish A Passing Baseline

1. Record the current worktree and exact package versions without changing them.
2. Run the current deterministic website check and high-severity advisory audit.
3. Confirm SVC health and generated integration.
4. Stop and diagnose before implementation if the proof-of-concept baseline no longer passes.

This separates pre-existing breakage from MVP regressions.

### Slice 1: Write The Complete Reader Journey

Draft all five English pages in one editorial pass:

1. Landing uses VitePress's default `home` layout with restrained hero actions and the three
   capabilities `Collect`, `Organize`, and `Use`.
2. Landing includes an active-development warning and routes to Developer, About, and GitHub. It
   has no download, signup, pricing, AI, device, or already-complete self-hosting claim.
3. Developer entry gives contributors and third-party ecosystem developers equal conceptual
   status while acknowledging unequal current documentation maturity.
4. Architecture explains the source-to-info-base-to-sink flow, peer runtimes, the admitted
   database protocol as the primary ecosystem path, and Extensions/APIs as additional surfaces.
5. Contributing routes changes to the Hub, `core-py`, `client-web`, `ui`, or `website/**`, then
   defers exact setup and checks to the selected repository.
6. About states InKCre / 第三持存, the approved mission and four public values, active-development
   status, and realistic participation paths.

Every page receives one H1, concise description frontmatter, clean public-route links, and direct
links to the relevant current owners. Empty `/developer/database/`, `/developer/extensions/`,
`/developer/api/`, `/manual/`, and `/zh/` routes are not created.

Checkpoint: build once after the coherent content and route set exists so VitePress's dead-link
gate evaluates the complete journey rather than partial scaffolding.

### Slice 2: Add Navigation And Restrained Presentation

1. Add top-level `Developer`, `About`, and `GitHub` navigation.
2. Add one route-scoped `/developer/` sidebar containing Overview, Architecture, and Contributing.
3. Enable VitePress local search.
4. Enable Git-derived last-updated data and edit links that resolve to
   `website/content/en/**`, verifying the mapping against the existing rewrite.
5. Extend the default theme and set a small brand-color/type variable layer. Do not introduce
   custom layout components, animations, logos, or assets merely to decorate the MVP.

Checkpoint: verify Landing and About have no sidebar, Developer navigation highlights correctly,
search can find text from more than one route, and all source edit links target real files.

### Slice 3: Turn The MVP Shape Into An Executable Contract

Add one small `site-contract.mjs` module and make both verification scripts consume its declared
route table:

```text
/                              index.html
/developer/                    developer/index.html
/developer/architecture        developer/architecture.html
/developer/contributing        developer/contributing.html
/about/                        about/index.html
```

For every route, assert:

- expected HTML output exists;
- document language is `en-US`;
- description, canonical URL, and Open Graph URL match the public route;
- the route appears exactly once in the sitemap;
- no `/en/`, `.md`, or `.html` internal URL leaks into generated output.

Also retain robots and Pages-origin header checks, assert a generated `404.html`, and verify local
search through the most stable generated artifact or markup contract exposed by the pinned
VitePress build. Avoid assertions against opaque hashed filenames when a semantic check is
available.

Extend the deployment smoke script to request all five routes from both origins. Each response
must be HTML `200`, carry the expected canonical URL, and preserve the origin-specific `noindex`
contract. Keep sitemap, robots, root language, and missing-route checks.

Checkpoint: `pnpm --dir website check` passes and a deliberate missing-route or wrong-canonical
probe fails the verifier.

### Slice 4: Preview And Accessibility Acceptance

Run the production preview and inspect the complete reader flow at representative desktop and
mobile widths:

```text
Landing -> Developer -> Architecture -> Contributing
Landing -> About -> Developer
any documentation route -> Search -> selected result
any documentation route -> Edit this page -> correct GitHub source
```

Check:

- navigation collapse and sidebar behavior on narrow screens;
- keyboard-only access to navigation, search, sidebar, and content links;
- visible focus and readable light/dark contrast;
- one H1 and a sensible heading outline per page;
- no horizontal overflow or content collision;
- no custom motion that defeats reduced-motion preference;
- no console errors, failed assets, or unexpected client warnings.

Correct defects within the approved files. If the default theme itself blocks acceptance and
would require a component or dependency, return to discussion before expanding scope.

### Slice 5: Final Local Review

1. Run the complete local proof listed in the Impact Handshake.
2. Review the diff for duplicated authority, unsupported maturity claims, legacy branding, stale
   repositories, accidental locale publication, and unrelated changes.
3. Confirm the task packet's Current Truth and Next Step reflect the verified state.
4. Obtain separate authorization before commit or push.

The intended single coherent commit is:

```text
feat(website): publish documentation MVP

- add the Landing, Developer Guide, and About reader journey
- enforce navigation, search, routes, metadata, and production smoke contracts
```

Only current-task changes enter that commit.

### Slice 6: Publish And Accept Production

After explicit commit and push authorization:

1. commit and push the relevant task-packet and website changes;
2. observe the `Website checks` run for the exact current `main` commit;
3. observe the artifact-driven `Pages deployment`;
4. verify the five routes and navigation on `https://inkcre.dev`;
5. confirm immutable Pages origins remain `noindex`;
6. record production evidence and update the packet to completed truth.

If production acceptance fails, diagnose the exact layer. Fix content/build defects in the
website; do not weaken artifact identity, origin indexing, canonical, or missing-route
guardrails to make a deployment pass.

## Local Implementation Result

Slices 0–5 completed on 2026-07-29:

- five English public routes build from `website/content/en/**` with no `/en/` leakage;
- the default VitePress theme provides Landing, Developer navigation/sidebar, About, local search,
  edit links, and Git-derived last-updated support;
- one minimal theme extension owns brand variables, typography, and accessible primary-button
  states without custom Vue components or dependencies;
- `site-contract.mjs` provides one canonical origin, default language, and route matrix to
  VitePress and both verification layers;
- generated-output verification covers all route files, one-H1 structure, descriptions,
  canonical/Open Graph metadata, sitemap uniqueness, accessible search controls, edit-source
  targets, internal route reachability, clean URLs, locale isolation, Pages headers, robots, and
  `404.html`;
- production smoke will request all five routes concurrently on the immutable and canonical
  origins while preserving canonical, sitemap, robots, `noindex`, and missing-route contracts.

Execution-time findings were resolved inside the approved scope:

- VitePress serializes `editLink.pattern`; removing its closure fixed an SSR-only missing-source
  link that the generated-output verifier correctly rejected.
- Search verification uses stable UI semantics plus a real cross-page browser query instead of a
  private hashed MiniSearch asset name.
- Content preflight corrected `resolver / storage interpretation` to resolver interpretation and
  storage raw-content retrieval.
- Browser contrast inspection found primary buttons below 4.5:1 in both themes; explicit default,
  hover, and active button variables now provide at least 5.53:1.

Verification passed:

```text
pnpm --dir website check
pnpm --dir website audit --audit-level high
node --check website/scripts/site-contract.mjs
node --check website/scripts/verify-build.mjs
node --check website/scripts/verify-pages-deployment.mjs
svc status --json
svc init --agent codex --json
git diff --check
```

Browser acceptance covered `1440 × 900` desktop and `390 × 844` mobile overrides, the complete
Landing/Developer/About reader flow, mobile navigation and Developer sidebar, cross-page local
search for `tertiary retention`, source edit links, one-H1 structure, horizontal overflow,
light/dark contrast, and console warnings/errors.

The new pages are still uncommitted, so Git cannot yet provide their last-updated timestamps.
That surface and the production smoke contract remain Slice 6 acceptance evidence rather than
being simulated locally.

## Preflight Risks And Resolutions

| Risk | Planned resolution |
| --- | --- |
| VitePress `2.0.0-alpha.18` behavior differs from stable documentation | Keep the exact pin, use only documented default-theme surfaces, and prove each generated contract from the local build. No dependency update is part of the MVP. |
| `rewrites` causes edit links or active navigation to target `/en/` or the wrong source path | Use a file-path-aware edit-link mapping and verify every generated/edit target before publication. |
| Local-search output uses implementation-specific hashed assets | Assert search behavior in preview and choose a stable semantic build assertion rather than pinning a hash or private filename. |
| “Direct database access” is read as arbitrary SQL access | Always qualify it as participation through the admitted, versioned protocol and link the canonical runtime contract. |
| Public values are mistaken for completed product/governance guarantees | Separate values and direction from current status in About and retain the active-development notice. |
| Developer Guide becomes a stale copy of four repository READMEs | Publish routing, topology, and ownership only; link exact commands and versions to their owners. |
| Minimal branding grows into a custom design system | Limit changes to default-theme extension and CSS variables; stop before custom components, packages, or asset work. |
| Root-only production smoke misses a broken new route | Make the same declared route table drive local output verification and production route requests. |

## Stop Conditions

Return to discussion before continuing if:

- implementation requires changing a canonical Hub claim rather than projecting it;
- an active repository role cannot be verified;
- the accepted mission, values, developer audience, or ecosystem model would need substantive
  reinterpretation;
- a new package, plugin, custom Vue component, workflow change, redirect, or locale enters scope;
- route repair would require publishing an empty or unstable section;
- a VitePress prerelease defect requires changing the framework version;
- the production path would need weaker artifact identity, canonical, indexing, or `404`
  guarantees.
