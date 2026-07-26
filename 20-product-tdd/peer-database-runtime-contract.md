# Peer Database Runtime Contract

## Purpose

Define the database protocol and lifecycle that every InKCre unit can consume without
copying SQL, inferring initialization order, or depending on one provider's administrative
roles.

This contract implements the peer relationships in
[Unit Topology](unit-topology.md) and the authority assignments in
[System State And Authority](system-state-and-authority.md).

## Authority And Protocol Surface

- The `inkcre` PostgreSQL schema is the admitted, versioned relation and function surface.
- Authenticated native and HTTP peers operate the same admitted semantics.
- PostgreSQL administration, provider schemas, and Alembic bookkeeping are not protocol
  surface.
- A protocol object is not admitted merely because it exists. Admission requires checked-in
  migration state, explicit privileges, contract introspection, and acceptance coverage.
- Breaking relation, function, privilege, or lifecycle changes require a contract-version
  change and coordinated consumer migration.

## Security Principals

- `authenticated` is a `NOLOGIN`, `NOINHERIT` capability role for the complete admitted
  protocol surface.
- Native deployments use distinct login principals that are members of `authenticated`.
- PostgREST uses a distinct, unprivileged `authenticator` login principal. It has no direct
  protocol privileges and may switch only to `authenticated` from a validated JWT role
  claim.
- `anonymous` exists as an explicit `NOLOGIN`, zero-capability role. Anonymous protocol
  access is denied.
- Migration authority is separate from runtime principals. Migrations and role
  reconciliation may not name Neon-, Heroku-, or installation-specific owners.
- Login passwords and JWT secrets are runtime inputs. They never appear in migrations,
  images, generated profiles, logs, or shared documents.
- Existing objects and owner-specific default privileges must converge to the same policy:
  `authenticated` receives the required schema, relation, sequence, and function privileges;
  `PUBLIC`, `anonymous`, and `authenticator` do not inherit protocol capability.

## Lifecycle

The executable contract provides these independently callable, idempotent semantics:

| Command | Required result |
|---|---|
| `db migrate` | Upgrade to the artifact's unique expected migration head. |
| `db provision-roles` | Reconcile fixed roles, memberships, existing ACLs, and default ACLs using runtime credentials. |
| `db reconcile-builtins` | Reconcile artifact-owned storage, extension, and source-type catalogs without starting an application runtime. |
| `db seed-dev` | Reconcile the deterministic minimum development/E2E baseline. |
| `db ready --profile runtime\|development --json` | Read-only validation with stable JSON and reliable exit status. |
| `db reset-dev` | Fail-closed reset followed by migrate, role reconciliation, built-ins, and development seed. |
| `db init --profile runtime\|development` | Execute the required primitives in their sole supported order. |
| `db contract --json` | Report the machine-readable contract and artifact revision without a database mutation. |

No lifecycle command may start FastAPI, a scheduler, an extension runtime, or a source
collector. Repeating `migrate`, role provisioning, built-in reconciliation, seed, init, or
reset must converge to the same result.

`seed-dev` contains only stable minimum records required to start and test peers. It uses
checked-in identifiers and is not a production-data source. Artifact-owned catalogs are
reconciled independently from development seed.

`reset-dev` requires both an explicit destructive confirmation and a database-owned
development identity. It refuses production, preview, and unknown databases.

## Readiness

Readiness is a versioned JSON contract and validates at least:

- database connectivity and identity;
- current and expected migration heads;
- protocol and artifact contract revisions;
- required roles, attributes, and memberships;
- schema, relation, sequence, function, and owner-specific default privileges;
- artifact-owned catalog baseline;
- development seed baseline when the development profile is requested.

Output is deterministic, contains no credentials or raw connection errors, and uses a
non-zero exit status for every contract mismatch. Port reachability alone is not readiness.

## JWT Contract

The shared browser-to-database and browser-to-runtime token contract is:

- algorithm: `HS256`;
- role: required and exactly `authenticated`;
- issuer: required and exactly `inkcre-client`;
- audience: required and exactly `inkcre-api`;
- issued-at (`iat`): required;
- expiry (`exp`): required;
- maximum lifetime: 24 hours;
- signature secret: runtime-owned and at least 32 bytes.

PostgREST and native HTTP runtimes validate the same claim vectors. A missing, malformed,
expired, overlong, wrong-secret, wrong-role, wrong-issuer, or wrong-audience token is denied.
The contract does not assign secret custody to `core-py`; each deployment supplies the same
secret independently to the runtimes that validate it.

## Artifact And Environment Contract

- The core database runtime is published as an OCI image addressable by immutable digest.
- The image contains migrations, lifecycle commands, runtime dependencies, contract
  revision, and source commit metadata.
- PostgREST and PostgreSQL/pgvector test runtimes are independently digest-pinned.
- Non-secret deployment profiles may publish canonical URLs, stable client identifiers,
  JWT issuer/audience, and contract/artifact revisions. They never publish credentials.

The durable delivery topology is:

```text
main -> canonical production
eligible internal PR(repository, number) -> isolated, expiring review environment
```

There is no required persistent staging environment. Review identity includes repository
identity and PR number so peer repositories cannot address the same resource accidentally.
Production data is recovery data, never seed and never the initial contents of review
environments.

## Acceptance Contract

The portable acceptance chain runs without a managed database provider:

```text
fresh PostgreSQL/pgvector
-> migrate
-> provision roles
-> reconcile built-ins
-> seed development
-> ready
-> start PostgREST
-> authenticated read and write
-> wrong-secret denial
-> anonymous denial
-> reset development
-> identical baseline
```

It also proves repeated execution, migration-head mismatch detection, ACL/default-ACL drift
detection, missing-seed detection, shared JWT vectors, and reset refusal outside a
development database.
