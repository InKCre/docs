---
title: Self-Hosted
description: Choose how to run your own InKCre instance and connect it to your information sources.
---

# Self-Hosted

Self-hosting means operating your own InKCre instance: you choose where information is stored, which
sources it collects, and which clients can access it. You also manage credentials, hosting
availability, backups, and updates. This section is for users choosing that responsibility.

For the application-level introduction and first-use journey, start with
[Getting Started](/getting-started). This section covers only the instance you operate.

## Choose a deployment path

| Path                                 | What you manage                                                                                                                  | Start here                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Fork quick deployment: Neon + Render | Provider accounts and GitHub settings; the workflow initializes the database and deploys Core and PostgREST.                     | [Render walkthrough](/self-hosted/render-neon) |
| Fork quick deployment: Neon + Heroku | The same topology on Heroku, with its billing and runtime settings.                                                              | [Heroku walkthrough](/self-hosted/heroku-neon) |
| Custom deployment                    | PostgreSQL initialization, PostgREST, the Core Python process or container, and hosting operations on infrastructure you choose. | [Custom guide](/self-hosted/custom)            |

Neon, Render, and Heroku are convenient deployment options, not product dependencies. Forking
provides a ready-made deployment workflow; it is not required to run InKCre. Both quick deployments
produce your own instance rather than access to a shared hosted account. Their sleeping compute
plans need particular care if you want continuous collection.

After deployment, retain the Core URL, PostgREST URL, JWT secret, and Core Peer ID, then
[connect the Web app](/guide/connect). If you already operate a compatible instance, start there.
