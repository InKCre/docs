---
title: Deploy with Heroku and Neon
description: Deploy your own InKCre instance using a GitHub fork, Neon, and Heroku.
---

# Deploy with Heroku and Neon

Use this fork-based quick deployment if you do not have an instance yet. You need GitHub, Neon, and
a compute-provider account. These providers are convenience options, not InKCre requirements;
[Advanced Self-Hosting](/self-hosted/advanced) covers your own infrastructure.

Keep credentials in a password manager. API keys let the workflow act on your hosting accounts; they
are different from sign-in passwords.

Choose Heroku instead of Render; you do not need both providers. The database still lives in Neon,
while Heroku runs two apps: Core and PostgREST.

1. Open [InKCre/core-py](https://github.com/InKCre/core-py), choose **Fork**, and enable workflows
   in your fork's **Actions** tab. Create a dedicated project in [Neon](https://console.neon.tech),
   keeping the default `neondb` database and `neondb_owner` role. Save its project ID and create a
   Neon API key with access to it.
2. Create a [Heroku account](https://dashboard.heroku.com/) with billing enabled and obtain an API
   key. The workflow creates the two apps; you do not need to provision a Heroku database add-on.
3. In your fork's **Settings → Secrets and variables → Actions**, add the following settings.
   Generate independent random values for the three credential secrets and retain them in your
   password manager.

| Kind     | Name                          | Value                                                                              |
| -------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| Secret   | `NEON_API_KEY`                | Your Neon API key.                                                                 |
| Secret   | `HEROKU_API_KEY`              | Your Heroku API key.                                                               |
| Secret   | `JWT_SECRET`                  | A new random secret of at least 32 ASCII characters.                               |
| Secret   | `CORE_DATABASE_PASSWORD`      | A separate random password of at least 32 ASCII characters.                        |
| Secret   | `POSTGREST_DATABASE_PASSWORD` | Another random password of at least 32 ASCII characters.                           |
| Variable | `NEON_PROJECT_ID`             | Your Neon project ID.                                                              |
| Variable | `HEROKU_APP_PREFIX`           | A unique lowercase app prefix, such as `alex-inkcre`, between 3 and 18 characters. |

4. Open **Actions → Deploy self-hosted InKCre to Heroku → Run workflow**, select your fork's `main`
   branch, and wait for the run to succeed.
5. Save the Core URL, PostgREST URL, and Core Peer ID from its summary. Open Core `/readyz` and wait
   for HTTP `200`, then continue to [Connect the CLI](/guide/connect-cli).

The workflow runs one Eco web dyno per app. Heroku charges and
[Eco sleep behavior](https://devcenter.heroku.com/articles/eco-dyno-hours) apply. Keep the same
database passwords on reruns; replacing them is a coordinated credential rotation, not a routine
redeploy. As with Render Free, sleeping Core cannot provide continuous collection. The maintained
deployment procedure and recovery details live in the
[Core Heroku self-hosting guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/heroku-neon-self-host.md).

**Keep your instance credentials private.** `JWT_SECRET` grants control of the instance, not a
limited personal login. Do not paste it into an online JWT generator, an issue, a chat, or your
public fork. This deployment does not isolate different users from one another. Start with your own
information and trusted devices.

Next: [Connect the CLI](/guide/connect-cli), or return to the
[self-hosted walkthrough](/self-hosted/getting-started).
