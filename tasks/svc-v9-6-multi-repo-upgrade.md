# SVC v9.6 Multi-Repo Upgrade

## MVT Core

- Objective & Hypothesis: upgrade shared docs from v9.3 to v9.6 and hard-cut the repo into the optional Hub/Spoke topology model without inventing new product truth.
- Guardrails Touched: shared docs must be edited source-first; business glossary must live in `10-prd/glossary.md`, not in `15-alignment/`.
- Verification: Hub docs contain v9.6 route/mode/topology files, legacy v9.3 entrypoints are removed, and Spoke repos can bump to a pushed Hub commit.

## Exploration Scaffold

- Perturbation: `core-py` requested SVC upgrade and alignment while already consuming shared docs through `docs/_shared/`.
- Input Type: Constraint
- Active Mode or Transition Note: Solidify into Execute for shared durable truth and topology alignment.
- Governing Anchors: `00-meta/_svc_v9_6.md`, `00-meta/multi-repo.md`, `10-prd/`, `20-product-tdd/`.
- Impact Hypothesis: Spoke repos will switch from v9.3 shared baseline usage to v9.6 typed-input plus optional multi-repo guidance.
- Temporary Assumptions: existing `core-product.md` and `product-glossary.md` content is sufficient to seed the v9.6 PRD package.
- Negotiation Triggers: pause if PRD restructuring requires inventing product drivers that are not grounded in existing source truth.
- Promotion Candidates: Hub/Spoke shared-ref safety protocol and typed-input root dispatcher expectations.

## Execution Notes

- key findings: current shared repo was still on v9.3; latest local SVC source is v9.6 with optional multi-repo extension.
- decisions made: hard-cut legacy entrypoints; rename shared-doc skill to `edit-svc-shared-docs`; move business glossary into PRD.
- final outcome: pending implementation and push.
