# Mode C: Execution

## Trigger

Use this mode when the target is specific, the relevant truths are already aligned, and the task is ready for direct implementation work.

## Constraints

- do not skip the closest relevant local guide
- do not ignore existing invariants or contracts

## Read-Do Steps

1. read the closest relevant local `AGENTS.md`
2. read `docs/30-unit-tdd/` if the change touches unit-level logical structure
3. read shared PRD/Product TDD/deployment docs as relevant
4. perform the pre-execution restatement
5. await human confirmation before reference-sensitive or logic-altering work when invariants matter
6. prefer tests, types, assertions, and CI guardrails over extra prose

## Exit Criteria

Exit this mode when implementation and verification are complete, or when new ambiguity forces a return to Mode A or Mode B.
