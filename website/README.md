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
- `/getting-started` owns the application-level What, Why, and How introduction.
- `/getting-started` owns a linear first-use path in the User Guide: connect the Web app, choose a
  Source, prepare its Extension, collect, and retrieve a real item. These steps remain grouped under
  Getting Started instead of being filed by the capabilities they happen to exercise.
- `/self-hosted/` selects Render/Heroku quick deployment or Custom Self-Hosting. It is not a second
  Getting Started hierarchy.
- After Getting Started, the User Guide groups reusable procedures into Collection, Organization,
  Application / Use, and Self-Hosted chapters. Info Base browsing, Agent connections, and Sinks are
  Application / Use topics. An Extension may provide Source, Sink, Organization, or other behavior,
  so preparing the first Extension belongs to the onboarding journey rather than Collection.
- `/guide/sources` selects independent source tutorials under `/guide/sources/`; `/guide/collect`
  owns shared collection and Job observation. Collection scheduling stays separate from Organization
  guidance; indexing is retrieval support, not Organization. Memos is documented separately as
  write-in capture.
- `/developer/` separates ecosystem integration guidance under `/developer/ecosystem/` from
  architecture and core contribution guidance; `/about/` describes the project.
- Section indexes use trailing-slash routes, such as `/developer/`.
- Leaf pages use lowercase ASCII kebab-case routes without an extension, such as
  `/developer/architecture`.
- Source ordering belongs in navigation configuration, not numeric filename prefixes.
- Once a published route has external references, treat it as a compatibility contract and move it
  only with a direct permanent redirect.
- `scripts/site-contract.mjs` owns the canonical origin and locale shared by site generation and
  deployment verification.

Internal Markdown links target rewritten public routes and omit `.md` and `.html`. Relative links
are resolved from the rewritten route, not the source file location.

## Product Language

- Lead initial user-facing pages with the outcome and familiar objects: InKCre collects information
  so people and the tools they connect can find and use it; InKCre can improve collected information
  when that helps. Wording may vary with context, but it must preserve that collection and
  use-centered meaning. Source independence, storage, and self-hosting are supporting properties,
  not the value claim itself.
- Introduce InKCre-specific vocabulary only after the reader has a concrete workflow that needs it.
  In particular, do not make `info-base`, Blocks, Relations, Peers, or capability ownership part of
  the home hero or the initial Getting Started explanation. Define such terms where they help the
  reader act or understand architecture.
- Keep capability boundaries precise. Collection brings information into InKCre. Organization acts
  on information already collected when that improves use. Application makes information useful to
  people or downstream tools. These are independent capabilities, not mandatory stages.
- Prefer a concrete way information becomes useful—finding a saved item, following a relationship,
  or retrieving it from a connected tool—over phrases such as “a shared base” or “reusable
  information” that name an attribute without explaining its value.
- Review meaning with a simple counterexample, not only a terminology search: a person collects one
  item through a supported integration and later finds it through another connected tool without
  running Organization. Initial product copy must allow that successful path, must be understandable
  without internal vocabulary, and must not imply arbitrary integrations, automatic synchronization,
  uniform capabilities across connected tools, or generated answers. Finding useful information is
  already a successful use; the product need not complete the surrounding task automatically.

## Page Authoring

- Give each page one primary reader, one task, and one observable completion state. An introduction
  explains; a tutorial leads to a result; a guide supports a task; a reference supplies facts. Do
  not make one page perform all four jobs.
- Keep one linear first-success path under Getting Started. Formal User Guide pages must remain
  independently useful and should not add a generic **Next** link when no real dependency exists.
- Repeat shared context only when entering the page directly without it could cause an incorrect or
  unsafe action. Link to the owning explanation instead of restating it.
- Use headings to answer a reader's question or name an action. Avoid decorative eyebrow text,
  all-caps labels, and a subsection that contains only one short sentence.
- Keep commands, screenshots, results, and caveats inside the step they explain. Use a table for
  comparison, not to fit prose into columns. Bold names visible in the interface; use code style for
  literal values, identifiers, and commands.
- Review a changed page with its navigation entry and exit. Render at least one representative
  procedure in desktop light mode and at narrow width; confirm that hidden interface variants,
  lists, code, tables, screenshots, and links remain understandable.
- User procedures default to client-web. Use the shared `InterfaceGuide` component with `#web` and
  `#cli` slots for alternate steps on the same route; CLI instructions primarily serve Agents. The
  choice survives client-side navigation, not a full reload. Without JavaScript, both sections
  remain readable. Keep shared prerequisites and limitations outside the slots.
- Set `outline: false` on interface-switching pages: the default VitePress outline includes hidden
  slot headings. Do not expose links to invisible instructions. The site sidebar remains available.
- State actual interface gaps instead of implying feature parity. Core package installation and
  lexical maintenance may still need the user's Agent; a browser wizard requires a compatible native
  distribution as well as its Core collector. Check both against published Registry releases.
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

### Web Screenshots

- Add a screenshot when it helps the reader identify a control, confirm a saved state, or compare a
  result. Keep prose authoritative; do not use screenshots as decorative substitutes for steps.
- Capture client-web in light mode at a desktop viewport. Use 1:1, 4:3, or approximately 16:9, and
  crop to the application viewport rather than including the browser toolbar or desktop. Use a
  mobile viewport only when the procedure specifically documents the mobile experience.
- Show the smallest useful state around the documented action. Preserve enough surrounding UI for
  orientation instead of cropping to an isolated button or field.
- Use fixtures or placeholders where possible. Remove personal content and real credentials; mask
  secrets before capture, and inspect the final pixels rather than relying only on the control's
  intended masking behavior.
- Store client-web images under `content/public/images/client-web/` with stable, kebab-case names.
  Alt text identifies the surface and visible state; the following italic caption explains what the
  reader should notice or do.
- Before publishing, inspect the rendered page at desktop width, confirm that text remains legible,
  and verify the image route in the exact preview deployment. Keep raw acceptance evidence in the
  task packet rather than publishing browser chrome, credentials, or transient diagnostics.

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
user-facing preview URL. The `docs preview` commit status on the exact pull-request head links to
that URL after deployment and smoke checks succeed; pending, failed, or cancelled runs link to the
workflow logs. The workflow's automatic environment deployment record belongs to its trusted `main`
controller, so the explicit commit status provides the PR-facing entry point. Changes to this
`workflow_run` controller take effect after merging into `main`. Cloudflare retains the underlying
immutable deployments in its history. If automatic retirement fails, the cleanup workflow can be run
manually for the closed pull-request number. A preview build is never promoted to production.

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
