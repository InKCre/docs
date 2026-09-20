---
title: Advanced Self-Hosting
description:
  Deploy InKCre on your own infrastructure and plan its operation, upgrades, and recovery.
---

# Advanced Self-Hosting

This guide is for people who want to manage the runtime directly or move beyond the fork-based quick
deployments. If you want the shortest route to your first collected information, start with
[Self-Hosted Getting Started](/self-hosted/getting-started).

## Manual deployment

You can use your own machine, VPS, containers, or other hosting. No GitHub fork, Neon account,
Render account, or Heroku account is inherently required. These providers automate a portable
runtime consisting of:

| Component                                                   | Responsibility                                                                          |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| PostgreSQL with the required extensions, including pgvector | Persists the info-base and shared configuration.                                        |
| Database initializer                                        | Creates/migrates the schema, provisions runtime roles, and reconciles built-in records. |
| PostgREST                                                   | Exposes the admitted database API used by the Web client.                               |
| Core Python program                                         | Runs collection, Jobs, Extensions, and the Core HTTP API.                               |

The initializer is a deployment step, not an additional always-running service. Core and PostgREST
connect to the same initialized database with different runtime roles. The CLI connects to Core; the
Web client uses PostgREST and discovers Core capabilities. The Web app itself can remain at
`app.inkcre.dev` or be hosted separately.

For a manual installation, work through these steps using the runtime documentation for the Core
revision you selected:

1. Provision PostgreSQL with the required extensions. Retain an owner connection for initialization
   and migrations; do not use that privileged connection as the application's runtime connection.
2. Run Core's ordered database initializer with the runtime profile. It provisions schema and roles
   as well as migrations: starting an empty database and only launching Python is not enough. The
   [database lifecycle guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/database-contract.md)
   owns the initializer commands, credentials, and readiness checks.
3. Configure PostgREST with the `authenticator` connection, the admitted `inkcre` schema, and the
   deployment's JWT settings. Configure Core with the `inkcre_core` connection and matching JWT
   settings. Keep the migration-owner credentials out of both running services.
4. Start the Core Python program with its pinned dependencies, or use its container image, and start
   PostgREST. The [Core README](https://github.com/InKCre/core-py#readme) and
   [container/runtime guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/docker.md)
   own the supported entry points. The Compose stack is a useful topology reference, but its
   development credentials and defaults are not a production configuration.
5. Configure HTTPS and reachable service URLs, advertise Core's public address in its Peer
   configuration, and arrange process restarts, backups, and upgrades. Verify Core `/readyz` and
   authenticated database access before connecting clients. The
   [runtime orchestration guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/runtime-orchestration.md)
   explains readiness and capability availability.

## Operate your instance

A successful first deployment is the beginning of operating the instance. Before relying on it for
important information:

- Choose hosting that keeps Core available for scheduled collection; sleeping plans cannot promise
  continuous collection.
- Keep database backups and verify how you will restore them. Your source accounts and repository
  fork are not backups of the info-base.
- Retain deployment credentials securely. Coordinate changes to database passwords and JWT settings
  across the services and clients that use them.
- Plan upgrades against the selected Core revision's migration and deployment instructions. Inspect
  readiness and collection Jobs after changes; do not treat a running process as proof that
  collection succeeded.

Provider-specific procedures remain in the
[Render deployment guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/render-neon-self-host.md)
and
[Heroku deployment guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/heroku-neon-self-host.md).
The Core runtime documentation linked above owns exact commands and recovery procedures.

## Continue with collection and use

Once Core and PostgREST are ready, retain both URLs, the private JWT secret, and the Core Peer
identity. Continue with [Connect the CLI](/guide/connect-cli),
[your first source](/guide/first-source), [search](/guide/search), and
[everyday tools](/guide/daily-use). These shared guides apply to manual and quick deployments alike.
