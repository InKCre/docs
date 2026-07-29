# Approved Website MVP Vertical Slice

## Slice Outcome

A first-time technical visitor can:

1. understand what InKCre currently is and is not;
2. choose between learning about the project and contributing to it;
3. understand the active multi-repository topology at a useful level;
4. reach the correct repository-owned setup or contribution instructions;
5. understand InKCre's identity and present status without reading obsolete plans.

This is a vertical slice because it connects content ownership, routes, navigation, search,
metadata, verification, and production publication in one usable reader journey.

## Proposed Route Set

```text
/                              basic Landing and site entry
/developer/                    Developer Guide entry and repository map
/developer/architecture        shared product and technical orientation
/developer/contributing        contribution routing and ownership boundaries
/about/                        identity, purpose, origin, current status, participation
```

The route set intentionally starts small. About can split into `/about/origin` or
`/about/community` only when one page becomes difficult to scan. Developer setup stays linked to
the repository that owns it instead of being copied into a cross-project tutorial.

## Reader Flow

```text
Landing
  |-- "Understand the system" --> Developer / Architecture
  |                                  |-- canonical product claims
  |                                  |-- cross-unit topology
  |                                  `-- active repositories
  |-- "Contribute" ------------> Developer / Contributing
  |                                  |-- choose an owning repository
  |                                  |-- follow repo-local setup
  |                                  `-- understand Hub/Spoke docs
  `-- "Why InKCre" ------------> About
                                     |-- identity and naming
                                     |-- concise origin and purpose
                                     `-- current status and participation
```

## Content Ownership

| Public surface | Primary source | Website responsibility |
| --- | --- | --- |
| Landing product statement | `10-prd/_drivers/**`, `10-prd/behavior/**` | Compress and route; do not add capabilities. |
| Architecture overview | `20-product-tdd/**`, `10-prd/glossary.md` | Explain topology and vocabulary for a new developer. |
| Repository map | GitHub repository reality plus repository-owned READMEs | Curate links and roles; do not copy local mechanics. |
| Contribution guide | SVC working protocol, Hub/Spoke contract, repo-local instructions | Explain where to start and where truth belongs; link to detailed owners. |
| About identity and mission | Website-owned public truth, informed by confirmed legacy material | State public identity and purpose without creating an internal Hub package. |
| Origin and naming | Website-owned public truth derived from confirmed history | Use `InKCre` and `第三持存`; tell the story without turning aspirations into current capabilities. |

## Repository Map Baseline

The Developer Guide should not present every public repository as equally current:

| Repository | Observed current role | MVP treatment |
| --- | --- | --- |
| `InKCre/docs` | Shared product and cross-unit truth Hub; website owner | Primary documentation and contribution surface. |
| `InKCre/core-py` | Python core and executable database/runtime contract | Primary active implementation unit. Link to its README and `CONTRIBUTING.md` for setup. |
| `InKCre/client-web` | Current web client, browser-extension workspace, and shared client infrastructure | Primary active client unit. Link to its repo-owned development guide for setup. |
| `InKCre/ui` | Design system and current `@inkcre/ui-web` package | Primary active design/UI unit. Link to its repo-owned toolchain and joint-development instructions. |
| `InKCre/client-webext` | Older standalone browser-extension repository | Do not route new contributors here until its relationship to the current `client-web` workspace is confirmed. |
| `InKCre/client-ios` | iOS prototype with a product description that does not match current shared vocabulary | Label only after its present status and relation to the core product are confirmed. |
| `InKCre/rokid-studio-client` | CameraX-derived prototype | Keep out of the primary path until its InKCre role is documented by its owner. |
| `InKCre/inkcre-docu` | Older product-document repository, last pushed in 2024 | Treat as legacy migration evidence, not a current contributor destination. |

## Engineering Increment

- Add locale-aware top navigation for Developer Guide, About, and GitHub.
- Add route-scoped sidebars for `/developer/`; avoid a sidebar for the single-page About section.
- Enable VitePress local search now that the site has a real documentation corpus.
- Enable correct website-source edit links and Git-derived last-updated metadata.
- Extend deterministic output verification from one route to the declared route matrix, canonical
  URLs, search artifacts, sitemap entries, locale, and a real `404`.
- Verify mobile navigation, keyboard use, heading structure, contrast, and reduced-motion behavior
  in preview.
- Preserve the existing English root and future `/zh/` contract without adding an incomplete locale
  selector.

## Explicitly Outside This Slice

- User Manual
- Chinese publication
- product download, signup, pricing, testimonials, or other marketing conversion surfaces
- exhaustive API reference
- copied per-repository setup commands
- organization governance, funding, roadmap, or community-channel promises
- custom Vue theme or component system unless the default theme demonstrably blocks the reader
  journey
- migration of the legacy build, deployment, or URL structure

## Proposed Execution Sequence

1. Confirm the Landing message hierarchy and the website-owned About claims.
2. Confirm the five-route information architecture and the active repository roles.
3. Draft all English pages against their respective owners in one coherent editorial pass.
4. Configure navigation, sidebars, search, edit links, and last-updated behavior.
5. Extend deterministic verification for the complete route matrix.
6. Preview the full reader journey on desktop and mobile; correct content and accessibility.
7. Publish through the existing checked-artifact pipeline and smoke-test canonical production.
