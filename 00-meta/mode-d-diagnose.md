# Mode D: Diagnosis

## Trigger

Use this mode for runtime anomalies, data corruption, unexplained failures, or system behavior that lacks trustworthy causal grounding.

## Constraints

- strictly read-only by default
- do not guess a fix
- do not modify code or durable docs during diagnosis

## Read-Do Steps

1. gather telemetry first: logs, metrics, traces, failing requests, runtime state
2. establish ground truth from evidence rather than intuition
3. write a diagnostic task doc with failure modes, evidence, and validation steps
4. identify what additional telemetry or reproduction data is still missing
5. pause for human confirmation before switching to Mode C or invoking deployment runbooks

## Exit Criteria

Exit this mode only after a bounded diagnosis exists and the next step is explicitly chosen.
