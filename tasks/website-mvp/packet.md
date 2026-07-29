# InKCre Website MVP

- **Objective**: evolve the published `inkcre.dev` proof of concept into a documentation-first
  MVP with a basic Landing, a useful Developer Guide, and an About section. Reuse legacy
  `InKCre/.github` material only after validating its claims against current Hub truth and current
  repository reality.
- **Guardrails**: keep the Hub as the internal canonical owner of durable product and cross-unit
  truth used while developing InKCre; let `website/` own public-only organization identity and
  About content while projecting product and technical claims from their Hub owners; preserve the
  current independent VitePress package, English-at-root route contract, Cloudflare publication
  path, metadata, and non-indexing behavior for Pages origins; do not migrate the legacy site
  wholesale; do not publish speculative product capabilities, stale organization claims, generic
  coding rules, or Spoke-local setup mechanics; do not create a User Manual before verified user
  journeys exist; reserve `/zh/` without publishing an incomplete Chinese locale. Treat SSoT as
  an ownership discipline, not a mandate to centralize all truth in the Hub: follow the Hub where
  it already owns internal shared truth, but do not expand it merely to make every website claim
  derivative.
- **Verification**: every MVP route has a declared audience, source owner, and reader outcome;
  legacy migration decisions are traceable; navigation, section sidebars, local search, edit
  links, responsive behavior, accessibility basics, metadata, sitemap, clean URLs, dead links,
  route output, and production deployment pass deterministic checks; canonical Hub documents and
  Spoke-local owners remain distinguishable from website summaries; `svc status --json`,
  `svc init --agent codex --json`, website checks, and `git diff --check` pass.
- **Current Truth**: Before this task, `inkcre.dev` was a deployed one-page English VitePress site
  with an isolated content root and an established artifact-based Cloudflare Pages pipeline. The
  public legacy repository `InKCre/.github` contains English and Chinese About and Development
  material, an organization profile, and an older VitePress implementation. Most long-form pages
  were last changed in March 2024; the organization profile was updated in August 2025. The legacy
  material is useful as historical source material, but not as current authority: it mixes durable
  origin and naming ideas with aspirational capabilities, obsolete branding and domains,
  incomplete pages, and generic development policy. Current product claims live in `10-prd/**`;
  current cross-unit topology and contracts live in `20-product-tdd/**`; current repository and
  deployment mechanics live in their owning repositories. The MVP is one end-to-end reader
  journey, not three disconnected content buckets: Landing explains the project and routes
  readers; Developer Guide orients contributors across the active repository topology; About
  explains the project identity, origin, and present participation model. Sir confirmed that the
  unified public name is `InKCre`, the Chinese name is `第三持存`, and public organization facts do
  not need a Hub owner. The website therefore owns public-only About truth; this does not make it
  authoritative for product or cross-unit technical claims. The Developer Guide has two durable
  audiences:
  developers contributing to InKCre and third-party developers building Extensions or API
  integrations. The MVP may deliver unequal depth because public ecosystem contracts are still
  unstable, but its information architecture and language must not redefine the guide as
  contributor-only. The primary ecosystem integration model is peer access to the admitted shared
  database protocol, as used by `client-web` through PostgREST; native PostgreSQL and PostgREST are
  transports over the same semantics. Extension and API surfaces are additional integration
  mechanisms, not the center of the ecosystem model. “Direct database access” never means
  bypassing admitted schema, privileges, lifecycle, or compatibility contracts. `第三持存` is the
  established concept commonly rendered in English as “tertiary retention,” associated with
  Bernard Stiegler's account of memory exteriorized in technical supports. The English About page
  may identify the name and term but will not explain the philosophy in the MVP. Open source, user
  control, self-hosting, and community-driven development are confirmed public values; the About
  page must distinguish those values from claims that every corresponding product capability or
  governance mechanism is already complete. Sir confirmed the complete solution shape: the top
  surface contains Developer, About, GitHub, and local Search; Landing and About have no sidebar;
  Developer uses one route-scoped sidebar; presentation extends the VitePress default theme with
  only restrained brand variables and typography; edit links, last-updated data, deterministic
  route verification, responsive and accessibility acceptance, and production smoke are part of
  the MVP. Sir authorized implementation on 2026-07-29. The published site now contains the full
  five-route English MVP, default-theme navigation and search, a restrained brand layer, and a
  shared route contract consumed by generated-output and deployment verification. Current
  `client-web` implementation and E2E evidence confirm its PostgREST participation. Content
  preflight corrected one task-level wording error so resolver interpretation and storage
  raw-content retrieval remain distinct. Local deterministic checks, high-severity dependency
  audit, SVC health/no-op, final review, desktop/mobile reader flows, cross-page search, source edit
  links, sidebars, light/dark contrast, and browser console checks pass. The implementation commit
  is `bc18957899955e846890caab8d72dfa2055ebc20`. Exact-main Website checks run `30435750384`
  produced the checked artifact; Pages deployment run `30435799253` verified its identity,
  deployed Cloudflare Pages release `74f40d14`, and passed the five-route production smoke.
  Independent production verification passed against both the immutable Pages origin and
  `https://inkcre.dev`. Browser acceptance confirmed the Git-derived last-updated surface, desktop
  and `390 × 844` layouts, mobile navigation and Developer sidebar, search-result navigation,
  one-H1 structure, no horizontal overflow, light/dark switching, and no console warnings or
  errors.
- **Next Step**: the Website MVP task is complete. Treat later User Manual, Chinese publication,
  ecosystem depth, or richer Landing work as new task packets with their own evidence and scope.

## Supporting Material

- [Legacy content audit](legacy-content-audit.md)
- [Approved vertical slice](vertical-slice.md)
- [Developer Guide proposal](developer-guide.md)
- [About proposal](about.md)
- [Implementation plan](implementation-plan.md)
