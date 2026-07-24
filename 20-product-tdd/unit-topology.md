# Unit Topology

## Purpose

Define cross-unit technical boundaries and ownership so changes do not leak responsibilities.

## Current Baseline

- This file is initialized as a scaffold.
- Add stable cross-unit boundaries only after they are confirmed by at least one real integration change.

## Database Peer Topology

- `core-py`, `client-web`, and future units are peer nodes; frontend/backend hierarchy is not
  part of the durable topology.
- Native PostgreSQL and PostgREST are transports over one admitted database protocol, not
  separate semantic authorities.
- Every authenticated peer may operate the complete admitted protocol surface. Different
  transports and deployments still use distinct login principals and secret custody.
- Migration authority, runtime capability, HTTP authentication, and anonymous access remain
  separate trust boundaries.
