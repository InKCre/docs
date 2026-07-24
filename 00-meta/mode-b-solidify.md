# Mode B: Solidification

## Trigger

Use this mode when the request is clear enough to record, but the durable truth is still missing or out of date.

## Constraints

- do not jump straight into implementation when durable references or invariants matter
- update durable docs before code when new durable truth is being introduced

## Read-Do Steps

1. identify the durable owner: `00-meta`, PRD, Product TDD, Unit TDD, deployment, or local `AGENTS.md`
2. perform the pre-execution restatement
3. wait for human confirmation when the change is reference-sensitive or changes invariants
4. update the durable truth in the correct layer
5. only then hand off or continue into execution

## Exit Criteria

Exit this mode when the durable truth is recorded and the task becomes straightforward execution.
