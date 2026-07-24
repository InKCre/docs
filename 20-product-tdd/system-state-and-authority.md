# System State And Authority

## Purpose

Record durable ownership of authoritative state across units and distinguish it from derived state.

## Current Baseline

- This file is initialized as a scaffold.
- Populate only cross-unit state authority that is stable and expensive to rediscover.

## Shared Database Authority

- PostgreSQL is authoritative for shared persisted InKCre state.
- The `inkcre` schema is the versioned protocol surface admitted to authenticated peers.
- `core-py` currently owns migrations and the executable lifecycle contract; this is schema
  authority, not request-path or product-tier authority over other peers.
- Production rows are operational recovery data and must never be reproduced as development
  seed.

## Extension Installation Authority

- Extension installation state is authoritative at the deployment level.
- One deployment must not carry multiple installed records for the same extension ID.
- Installation state is distinct from client-scoped permission and distinct from current runtime activity.

## Info-Base Graph Authority

- Persisted blocks and relations are authoritative graph state.
- A block record may carry inline content or a pointer to externally retrieved content.
- Raw content retrieval is downstream runtime behavior, not additional authoritative graph state.
