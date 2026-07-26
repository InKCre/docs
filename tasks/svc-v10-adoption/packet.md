# SVC v10 Adoption

- **Objective**: adopt released SVC 10.0.1 in the canonical InKCre shared-doc Hub, hard-cut copied v9 framework guidance, and restore the peer-database runtime contract that both active Spokes already implement.
- **Guardrails**: preserve the existing InKCre-owned PRD and previously reviewed Product TDD semantics; do not modify a Spoke reference before the Hub commit is pushed; do not copy v10 corpus documents; keep provider/runtime mechanics in their Spoke owners; keep Hub edits, Spoke ref bumps, and Spoke-local changes in separate commits.
- **Verification**: official-wheel `svc status --json` is healthy; repeated `svc init --json` is a no-op; active Hub guidance has no copied v9 route/mode corpus; the peer database contract is byte-equivalent to the reviewed v9.8 publication; its topology and authority links resolve; `git diff --check` passes.
- **Current Truth**: Hub `main` reverted the earlier combined SVC v10 and peer-contract publication. core-py therefore consumes the contract from Hub commit `f648612` on the v9.8 alignment branch, while client-web consumes SVC 10.0.1 commit `ad464fd` without that contract. The restored tree combines the already reviewed SVC 10.0.1 adoption with the identical peer database/JWT/environment contract and keeps InKCre-specific submodule operations and the executable shared-doc skill Hub-owned.
- **Next Step**: publish this Hub source commit first, then move core-py and client-web to the same exact commit in isolated Spoke ref-bump commits.

## Boundary Notes

- `10-prd/**` owns shared product truth.
- `20-product-tdd/**` owns stable cross-unit technical contracts.
- `00-meta/submodule-profile.md`, `submodule-operations.md`, and `skills/edit-svc-shared-docs/**` own InKCre-specific collaboration mechanics.
- SVC owns its framework protocol inside the installed 10.0.1 corpus.
