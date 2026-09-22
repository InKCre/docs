---
title: Custom Self-Hosting
description: Deploy InKCre step by step on infrastructure and services you choose.
---

# Custom Self-Hosting

Choose this path when you want infrastructure other than the maintained Render or Heroku workflows,
or when you want to control each service directly. It is more customizable, not a test of technical
seniority. The steps below explain what each component does, what you need to retain, and how to
check your progress.

For the shortest maintained deployment, choose a fork workflow from [Self-Hosted](/self-hosted/).

## What you will run

You can use your own machine, VPS, containers, or other hosting. No GitHub fork, Neon account,
Render account, or Heroku account is inherently required. These providers automate a portable
runtime consisting of:

| Component                                                   | Responsibility                                                                          |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| PostgreSQL with the required extensions, including pgvector | Persists the info-base and shared configuration.                                        |
| Database initializer                                        | Creates/migrates the schema, provisions runtime roles, and reconciles built-in records. |
| PostgREST                                                   | Exposes the admitted database API used by the Web client.                               |
| Core Python program                                         | Runs collection, Jobs, Extensions, and the Core HTTP API.                               |

The initializer is a command you run during deployment, not another permanent service. Core and
PostgREST then connect to the initialized database with separate limited roles. The CLI talks to
Core; client-web talks to PostgREST and discovers Core capabilities. You can continue using
`app.inkcre.dev` rather than hosting client-web yourself.

## 1. Choose a Core release and runtime shape

Choose one exact Core release or commit and use its deployment documentation throughout. Decide
where PostgreSQL, PostgREST, and Core will run and how both HTTP services will receive HTTPS URLs.
They may share a machine, but they remain separate processes.

**Checkpoint:** you have an exact Core revision and two planned public URLs—one for Core and one for
PostgREST.

## 2. Prepare PostgreSQL and credentials

1. Provision PostgreSQL with the extensions required by your chosen Core revision.
2. Retain its owner connection only for initialization, migrations, and recovery.
3. Generate separate strong passwords for the `inkcre_core` and `authenticator` login roles.
4. Generate one private JWT secret that PostgREST and your clients will share.

Do not give either running service the database-owner URL. Keep the three generated secrets in your
hosting provider's secret storage.

**Checkpoint:** PostgreSQL is reachable from your deployment environment, and you have an owner URL,
two different role passwords, and one JWT secret.

## 3. Initialize the database

Run Core's ordered runtime initializer for a production-shaped environment. It applies migrations,
creates the limited roles, and reconciles built-in records. Launching Python against an empty
database is not initialization.

Use the exact command and image from the selected revision's
[database lifecycle guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/database-contract.md),
then run its read-only readiness command. The initializer is safe to repeat when deploying the same
profile.

**Checkpoint:** database readiness reports the expected migration, roles, privileges, and protocol
contract without exposing the owner URL.

## 4. Start PostgREST

Configure PostgREST to connect as `authenticator`, expose only the admitted `inkcre` schema, reject
anonymous access, and validate the JWT secret and claims required by the selected Core revision. Put
it behind HTTPS.

**Checkpoint:** the public PostgREST URL answers, anonymous access is denied, and an authenticated
request with your deployment JWT reaches the admitted API.

## 5. Start Core

Run the pinned Python program or its container image with the `inkcre_core` database connection and
the same JWT settings. Supply Core's public HTTPS base URL so its Peer can advertise callable HTTP
capabilities. The
[container guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/docker.md) and
[Core README](https://github.com/InKCre/core-py#readme) own the supported entry points.

**Checkpoint:** after you connect client-web, Core appears in **Peers**. If it is offline, start the
service and refresh until the Peer is online and publishes its capabilities.

## 6. Connect and complete a real journey

Retain the Core URL, PostgREST URL, JWT secret, and Core Peer ID. Follow
[Connect to Your Instance](/guide/connect), then collect one small source and retrieve an item you
recognize. A healthy process is necessary, but a real collection-and-retrieval loop proves that the
services work together.

**Checkpoint:** client-web can reach PostgREST and the online Core Peer, and you can retrieve one
collected item.

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

Provider-specific examples remain in the
[Render deployment guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/render-neon-self-host.md)
and
[Heroku deployment guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/heroku-neon-self-host.md).
The Core runtime documentation linked above owns exact commands and recovery procedures.

The Core
[runtime orchestration guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/runtime-orchestration.md)
owns readiness and shutdown details for the selected revision.
