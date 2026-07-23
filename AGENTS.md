# InKCre Shared Product Docs

This repository is the authoritative Hub for durable product truth shared across InKCre repositories. Keep framework guidance in the installed SVC corpus; keep only InKCre-owned claims and operating contracts here.

## Repository Map

- `10-prd/`: business intent, observable behavior, vocabulary, and derived domain boundaries.
- `20-product-tdd/`: stable cross-unit topology, authority, and interoperability contracts.
- `00-meta/`: InKCre-owned Hub/Spoke profile, shared-reference operations, and the shared-doc editing skill.
- `tasks/`: active Hub-local task state; never an exported durable authority.
- `docs/index.md`: navigation for this repository's human and agent consumers.

## Knowledge Owners

- Working protocol and implementation judgment: the adopted SVC 10.0.1 corpus, queried through the generated SVC navigation below.
- Product what and why: `10-prd/index.md`.
- Cross-unit technical contracts: `20-product-tdd/`.
- Hub/Spoke transport and ownership: `00-meta/submodule-profile.md`.
- Shared-reference mutation order: `00-meta/submodule-operations.md`.
- Executable shared-reference workflow: `00-meta/skills/edit-svc-shared-docs/`.
- Task retention: keep packets while work is active; completed packets may be deleted without an archive or deletion-time promotion review.

## Development Workflow

- Runtime: Python 3.11+ for the SVC CLI.
- Install SVC: `python -m pip install sustainable-vibe-coding==10.0.1`.
- Inspect adoption: `svc status --json`.
- Check generated integration: `svc init --agent codex --json` must report `noop`.
- Check repository changes: `git diff --check`.

## Execution Rules

- Read `10-prd/` for product claims and `20-product-tdd/` for cross-unit contracts; do not put Spoke-local architecture or runtime mechanics in either.
- Query SVC guidance on demand. Do not copy SVC framework documents into `00-meta/`.
- Edit and publish Hub truth before updating any Spoke `docs/_shared` reference.
- Keep Hub edits, Spoke reference bumps, and Spoke-local changes in separate commits.
- Require explicit human authorization before commit or push.
- Preserve one canonical owner for every durable claim and keep generated SVC surfaces unmodified.

<!-- svc:begin navigation sha256=01d8643023a40533a997a67c70e920bb0ff0056081d2d18bec59e47324318152 -->
## SVC

This project uses the local Sustainable Vibe Coding CLI. Query framework guidance when it is needed instead of copying framework documents into this repository.

- Use `svc lookup --keyword "<need>"` to find relevant guidance, then `svc lookup --name '<exact-path-regex>'` to read an authoritative document.
- Use `svc status` before broad process changes. If the installed corpus is newer than the adopted version in `svc.json`, read its migration guidance before `svc adopt`.
- Treat all unmarked project instructions and documentation as consumer-owned.
<!-- svc:end navigation -->
