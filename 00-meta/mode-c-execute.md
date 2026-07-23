# Mode C: Execute

## Role

Use when the current slice of work is clear enough to implement or edit safely.

This mode can appear in any input type once ownership and verification are sufficiently clear.

For non-trivial code work, use `implementation-taste.md` as a projection onto concrete code surfaces, not as a new durable owner.

## Forbidden

- Do not skip local `AGENTS.md` and relevant TDD checks before coding.
- Do not keep executing when new evidence shows the problem is still not understood.

## Read-Do Steps

1. Restate the exact change, protected invariants, and verification plan.
2. Load the nearest local `AGENTS.md` plus any governing PRD, TDD, deployment, or topology docs.
3. For non-trivial code work, load `implementation-taste.md` and project its principles onto the concrete code surface.
4. If the blast radius is not obviously local, pause for the Impact Handshake before mutating durable truth.
5. Implement the smallest safe change for the current slice.
6. Run checks and compare the result against the declared verification.
7. If unexpected behavior appears, re-enter Explore or Diagnose instead of guessing.

## Exit Criteria

- The requested change for this slice is implemented.
- Verification passes.
- No known invariant is violated.
