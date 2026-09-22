---
title: Deploy with Render and Neon
description: Deploy your own InKCre instance using a GitHub fork, Neon, and Render.
---

# Deploy with Render and Neon

Use this fork-based quick deployment if you do not have an instance yet. You need GitHub, Neon, and
a compute-provider account. These providers are convenience options, not InKCre requirements;
[Custom Self-Hosting](/self-hosted/custom) covers your own infrastructure.

Keep credentials in a password manager. API keys let the workflow act on your hosting accounts; they
are different from sign-in passwords.

1. Open [InKCre/core-py](https://github.com/InKCre/core-py), choose **Fork**, and create your
   repository copy. Open its **Actions** tab and enable workflows if GitHub asks.
2. Create a project in [Neon](https://console.neon.tech). Keep the default `neondb` database and
   `neondb_owner` role. Save the project ID and create a Neon API key with access to it.
3. Create a workspace in [Render](https://dashboard.render.com). Save its workspace ID from Settings
   and create a Render API key. Your fork must be public, or Render must already have permission to
   read it.
4. In your fork, open **Settings → Secrets and variables → Actions**. Use **New repository secret**
   under **Secrets** and **New repository variable** under **Variables** to add:

| Kind     | Name                    | Value                                                                                |
| -------- | ----------------------- | ------------------------------------------------------------------------------------ |
| Secret   | `NEON_API_KEY`          | Your Neon API key.                                                                   |
| Secret   | `RENDER_API_KEY`        | Your Render API key.                                                                 |
| Secret   | `JWT_SECRET`            | A new random secret of at least 32 ASCII characters, saved in your password manager. |
| Variable | `NEON_PROJECT_ID`       | Your Neon project ID.                                                                |
| Variable | `RENDER_OWNER_ID`       | Your Render workspace ID.                                                            |
| Variable | `RENDER_SERVICE_PREFIX` | A unique lowercase prefix such as `alex-inkcre`, between 3 and 40 characters.        |

5. Open **Actions → Deploy self-hosted InKCre → Run workflow**, select your fork's `main` branch,
   and run it. Wait for completion. If it fails, open the failed step, correct the reported problem,
   and rerun using the same credentials.
6. Open the completed run's summary. Save the **Core URL**, **PostgREST URL**, and **Core Peer ID**.
   The workflow deliberately does not print your secret; retain the original value.
7. Open the Core URL with `/readyz` appended. Continue when it returns HTTP `200`. A sleeping
   service may take time to start.

**Checkpoint:** deployment succeeded, and you have both service URLs and your `JWT_SECRET`. Use the
**Core URL** for the CLI and the **PostgREST URL** for the Web app later.

The workflow selects Render Free services. They sleep when idle, share account usage limits, and
cannot guarantee continuous collection. Check
[Render's current limits](https://render.com/docs/free) and your Neon plan before relying on them.
Continuous scheduled collection needs hosting that keeps Core running. The maintained deployment
procedure and recovery details live in the
[Core self-hosting guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/render-neon-self-host.md).

**Keep your instance credentials private.** `JWT_SECRET` grants control of the instance, not a
limited personal login. Do not paste it into an online JWT generator, an issue, a chat, or your
public fork. This deployment does not isolate different users from one another. Start with your own
information and trusted devices.

Next: [Connect the CLI](/guide/connect-cli), or return to the
[self-hosted setup guide](/self-hosted/setup).
