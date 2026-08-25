# Shared security model ownership

- **Objective**: move InKCre-wide actors，assets，trust boundaries and proportional security-classification method from
  `core-py` into the shared Hub，then leave core-py with only its runtime-specific application of that model。
- **Guardrails**: this is an independent ownership correction，not a `knowledge-lifecycle-capabilities` Unit，security audit，
  control expansion or behavior change。Hub truth must remain meaningful without FastAPI，PostgREST，Alembic，one concrete
  Extension or one repository's CI。External reporting remains owned by each repository's `SECURITY.md` and organization
  policy；Spokes retain executable admission，rendering，runtime and deployment mechanics。
- **Verification**: every migrated claim has one durable owner；Hub navigation reaches the shared model；core-py no longer
  presents the shared model as repository-local truth；Hub is committed and pushed before the Spoke shared ref moves；Hub and
  Spoke diffs pass their declared static checks。
- **Current Truth**: `core-py/docs/30-unit-tdd/security-model.md` mixes stable project-wide reasoning with core-py actors，
  runtime vocabulary，deployment links and a Memos PAT worked example。Its project-wide content is already consumed as a
  collaboration boundary across InKCre，so repository-local ownership is misleading。
- **Next Step**: publish a Hub-owned `20-product-tdd/security-boundary-model.md` containing only shared truth。After Human
  review and Hub push，bump core-py's `docs/_shared` ref and replace the local monolith with a thin core runtime boundary note。

## Ownership split

### Hub-owned

- deployment owner，admitted Peer，untrusted caller/content，Extension protocol caller，Extension artifact and external
  provider as shared actor categories；
- protected info-base，credentials，owner authority，artifact integrity and attacker-reachable availability/cost；
- admission，persistence，data/code，Extension and privileged-operator trust boundaries；
- vulnerability versus bug，hardening，operational risk and accepted-risk classification；
- actor → asset/harm → boundary → attack-path → existing-controls → control-cost reasoning；
- the rule that deployment topology changes may change a security conclusion without changing the method。

### Spoke-owned

- exact routes，claims，roles，database grants，processes，migrations，logs，probes and deployment sequencing；
- renderer，native-client and transport-specific data handling；
- concrete Extension credentials and protocol admission；
- repository CI/dependency admission and local worked examples。
