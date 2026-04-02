# System State And Authority

## Purpose

Record durable ownership of authoritative state across units and distinguish it from derived state.

## Current Baseline

- This file is initialized as a scaffold.
- Populate only cross-unit state authority that is stable and expensive to rediscover.

## Extension Installation Authority

- Extension installation state is authoritative at the deployment level.
- One deployment must not carry multiple installed records for the same extension ID.
- Installation state is distinct from client-scoped permission and distinct from current runtime activity.
