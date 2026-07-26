# Documentation

## Shared Truth

- [Product requirements](../10-prd/index.md)
- [Unit topology](../20-product-tdd/unit-topology.md)
- [System state and authority](../20-product-tdd/system-state-and-authority.md)
- [Cross-unit contracts](../20-product-tdd/cross-unit-contracts.md)
- [Peer database runtime contract](../20-product-tdd/peer-database-runtime-contract.md)
- [Claim realization matrix](../20-product-tdd/claim-realization-matrix.md)
- [Hub/Spoke ownership profile](../00-meta/submodule-profile.md)
- [Shared-reference operations](../00-meta/submodule-operations.md)
- [Shared-doc editing skill](../00-meta/skills/edit-svc-shared-docs/SKILL.md)

`tasks/` is a Hub-local collaboration surface, not shared durable truth. SVC framework guidance is queried from the installed corpus and is intentionally absent from this repository.

<!-- svc:begin navigation sha256=01d8643023a40533a997a67c70e920bb0ff0056081d2d18bec59e47324318152 -->
## SVC

This project uses the local Sustainable Vibe Coding CLI. Query framework guidance when it is needed instead of copying framework documents into this repository.

- Use `svc lookup --keyword "<need>"` to find relevant guidance, then `svc lookup --name '<exact-path-regex>'` to read an authoritative document.
- Use `svc status` before broad process changes. If the installed corpus is newer than the adopted version in `svc.json`, read its migration guidance before `svc adopt`.
- Treat all unmarked project instructions and documentation as consumer-owned.
<!-- svc:end navigation -->
