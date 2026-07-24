# SVC v10 Adoption

- **Objective**: adopt released SVC 10.0.1 in the InKCre shared-doc Hub and hard-cut copied v9 framework guidance while preserving InKCre-owned PRD, Product TDD, and Hub/Spoke operations.
- **Guardrails**: keep `10-prd/` and `20-product-tdd/` content unchanged; do not modify a Spoke reference before the Hub commit is pushed; do not copy v10 corpus documents; keep Hub edits, Spoke ref bumps, and Spoke-local changes in separate commits; do not commit or push without explicit authorization.
- **Verification**: official-wheel `svc status --json` is healthy; repeated `svc init --json` is a no-op; active Hub guidance has no `_svc_v9_8` or copied route/mode references; PRD and Product TDD have no diff; `git diff --check` passes.
- **Current Truth**: official `svc init` created schema-v2 adoption state, the Codex skill, bounded navigation, and the ignored local overlay contract. The v9 Hub mixed InKCre-owned shared truth with copied upstream framework documents. Those upstream copies are being removed; the InKCre submodule profile, operations, and executable shared-doc skill remain Hub-owned.
- **Next Step**: finish Hub validation, then request authorization for an isolated Hub commit and push before adding or bumping any Spoke `docs/_shared` reference.

## Boundary Notes

- `10-prd/**` owns shared product truth.
- `20-product-tdd/**` owns stable cross-unit technical contracts.
- `00-meta/submodule-profile.md`, `submodule-operations.md`, and `skills/edit-svc-shared-docs/**` own InKCre-specific collaboration mechanics.
- SVC owns its framework protocol inside the installed 10.0.1 corpus.
