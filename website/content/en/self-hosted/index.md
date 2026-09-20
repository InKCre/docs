---
title: Self-Hosted
description: Choose how to run your own InKCre instance and connect it to your information sources.
---

# Self-Hosted

Self-hosting means operating your own InKCre instance: you choose where information is stored, which
sources it collects, and which clients can access it. You also manage credentials, hosting
availability, backups, and updates. This section is for users choosing that responsibility.

For the application-level introduction and access choices, start with
[Getting Started](/getting-started). Here, choose between the step-by-step
[self-hosted walkthrough](/self-hosted/getting-started) and
[Advanced Self-Hosting](/self-hosted/advanced) for manual deployment and operations.

## Choose a deployment path

| Path                                 | What you manage                                                                                                                  | Start here                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Fork quick deployment: Neon + Render | Provider accounts and GitHub settings; the workflow initializes the database and deploys Core and PostgREST.                     | [Render walkthrough](/self-hosted/getting-started#render-neon) |
| Fork quick deployment: Neon + Heroku | The same topology on Heroku, with its billing and runtime settings.                                                              | [Heroku walkthrough](/self-hosted/getting-started#heroku-neon) |
| Manual deployment                    | PostgreSQL initialization, PostgREST, the Core Python process or container, and hosting operations on infrastructure you choose. | [Advanced](/self-hosted/advanced#manual-deployment)            |

Neon, Render, and Heroku are convenient deployment options, not product dependencies. Forking
provides a ready-made deployment workflow; it is not required to run InKCre. Both quick deployments
produce your own instance rather than access to a shared hosted account. Their sleeping compute
plans need particular care if you want continuous collection.

## From an empty instance to useful information

Follow [Getting Started](/self-hosted/getting-started) to deploy an instance, collect one RSS feed,
find a saved item, and add the sources you use. The guide then connects the instance to the Web app
and everyday tools. It assumes basic technical familiarity but no InKCre development setup.

If you already operate a compatible instance, begin at
[connecting the CLI](/self-hosted/getting-started#connect-cli).
