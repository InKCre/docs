# Legacy `InKCre/.github` Content Audit

## Evidence Baseline

- Repository: <https://github.com/InKCre/.github>
- Default branch: `main`
- Latest repository commit observed: `b85c74cad2270f37d241f0182040c9d760e7d5a6`
- Legacy About and Development pages were primarily last changed in March 2024.
- `profile/README.md` was last changed on 2025-08-06.
- The repository still has GitHub Pages enabled, but its VitePress build and deployment are not
  candidates for the current site's production path.

The audit classifies semantic material, not files to copy. Product and technical material should
be rewritten in current English and projected from its Hub or repository owner. Public-only
organization material may be rewritten as website-owned About truth.

## Migration Decisions

| Legacy source | Useful material | Decision for MVP |
| --- | --- | --- |
| `profile/README.md` | Information-overload pressure, name expansion, 2023 idea / 2025 demo history | Reuse selectively. Validate history and naming. Reject the unbounded “any source”, ambient assistance, every-device, glasses, and BCI capability list. |
| `docs/index.md` | A home page that routes to project, organization, and GitHub surfaces | Reuse the routing intent only. Do not reuse `InKCreThing`, old domains, old product links, or the marketing-like feature list. |
| `docs/about/who-are-we.md` | Information-to-creation identity and the `InKCre` name explanation | Rewrite using the confirmed public name `InKCre` and Chinese name `第三持存`. Do not revive `InKCreThing` or “翰墨化机团队”. |
| `docs/about/mission.md` | The core pressure from information to later creation; openness and user control as possible principles | Treat as a proposal, not current truth. Claims about self-hosting, full behavioral control, community ownership, and ecosystem policy require explicit confirmation. |
| `docs/about/origin.md` | Founder problem narrative and motivation for reusable information | Condense and update. Avoid outdated competitor comparisons, exhaustive feature wishes, and claims that exceed current PRD scope. |
| `docs/about/team.md` | Maintainer-card pattern | Re-verify identity, role, avatar, and social links before publishing. Prefer a simple maintained fact over a custom component in the first slice. |
| `docs/about/join.md` | Multiple ways to participate and an invitation to improve docs | Rewrite around current GitHub repositories and actual contribution entry points. Remove promises about response time and unavailable community channels. |
| `docs/development/index.md` | Developer Guide should cover orientation, collaboration, quality, and contribution | Reuse as an information-architecture prompt, not prose. Start from the current multi-repository topology and real repo-owned instructions. |
| `docs/development/workflow.md` | Requirement-to-change lifecycle as a topic | Do not migrate as policy. It predates the current SVC working protocol and invents GitHub Projects, branches, release branches, tools, and testing rules that are not uniformly true. |
| `docs/development/coding-standard.md` | Readability and maintainability as goals | Do not migrate. Global indentation, line length, formatters, comments, commit rules, and language standards conflict with repo-local enforcement and current project instructions. |
| `docs/**/the-launch-stage.md` | Historical launch-stage planning | Do not publish. It is task/roadmap state, not current reader documentation. |
| `docs/management/**`, `docs/operation/**`, `docs/plans/**`, `docs/efforts.md` | Historical organization planning | Keep out of the MVP. Several pages are incomplete or speculative and no current canonical owner exists. |
| `docs/zh-cn/**` | More natural source wording for origin, mission, and naming | Use only as migration evidence. Keep `/zh/` reserved until a complete, maintained Chinese slice exists. |
| `docs/.vitepress/**` | Local search, edit-link, last-updated, nav, sidebar, locale patterns | Re-evaluate the capabilities against current VitePress; do not copy the old config. The current site already has stronger route, metadata, sitemap, build, and deployment contracts. |
| `.github/workflows/deploy.yml`, `.pages.yml` | Historical publication mechanics | Do not migrate. Preserve the current checked-artifact Cloudflare Pages pipeline. |

## Current Sources That Supersede Legacy Claims

- Product pressure and objectives: `10-prd/_drivers/**`
- Current product claims and scope: `10-prd/behavior/**`
- Product vocabulary: `10-prd/glossary.md`
- Cross-unit topology and contracts: `20-product-tdd/**`
- Hub/Spoke publication and ownership: `00-meta/**`
- Repository-specific setup, testing, and deployment: each active repository
- Public repository inventory: <https://github.com/orgs/InKCre/repositories>

## Material Uncertainties

- Is the information-to-creation statement the current organization mission, the product purpose,
  or only historical motivation?
- Are open source, self-hosting, user control, and community-driven governance current commitments
  or future aspirations?
- Which person or group is currently publishable as maintainer, and which contact channels are
  active?
- Are `docs`, `core-py`, `client-web`, and `ui` the complete primary MVP repository set?
- Is the standalone `client-webext` repository superseded by the browser-extension workspace in
  `client-web`, and how should the iOS and Rokid prototypes be labeled?
- Should the old `InKCre/.github` repository remain as the GitHub organization profile owner after
  website content migrates, or should its profile become a short pointer to `inkcre.dev`?

## Confirmed Public Identity

- Unified public name: `InKCre`
- Chinese name: `第三持存`
- Retired public names for this MVP: `InKCreThing`, `翰墨化机团队`
- Public-only organization facts are owned by `website/`, not added to the internal Hub truth
  packages.
