---
title: Getting Started
description:
  Create your own InKCre instance, collect your first feed, connect personal sources, and find your
  information from the web or your everyday tools.
---

# Getting Started

This is the [Self-Hosted](/self-hosted/) walkthrough: you will operate your own InKCre instance. It
is not a requirement that every InKCre user deploy a server.

You have information scattered across subscriptions, saved repositories, messages, and email. This
guide takes you from **no InKCre instance** to collecting a source you care about, finding something
you collected, and making that collection available in your daily workflow.

Start with one RSS feed. Once it works, add your personal sources one at a time. You do not need to
develop InKCre or configure an AI model for this first journey. The fork-based deployment paths also
avoid running Docker locally. You will use a browser, a text editor, and a few terminal commands.

InKCre is under active development. Some setup still uses its command-line tool rather than a setup
wizard. Collection preserves source relationships; further AI organization needs its own
configuration. There is no default daily digest or automatic Telegram/email notification service.

## 1. Create your instance

Your instance stores your information and runs collection. The public
[Web app](https://app.inkcre.dev/settings) is a client you connect to it; opening the app does not
create a private instance for you.

Choose one deployment path. **Neon + Render and Neon + Heroku are alternative fork-based quick
deployments**, not requirements of InKCre itself. Both workflows initialize the database and run
Core and PostgREST for you. If you prefer your own server or database, follow
[manual deployment](#manual-deployment) instead, then return to step 2.

For either quick deployment, use GitHub, Neon, and one compute provider:

| Account          | What it does                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| GitHub           | Keeps your fork of InKCre and runs its deployment workflow. A fork is your own repository copy.                 |
| Neon             | Stores your info-base in a PostgreSQL database.                                                                 |
| Render or Heroku | Runs Core, which collects and processes information, and PostgREST, which connects the Web app to the database. |

Use a dedicated Neon project for this instance and a password manager to retain credentials. An API
key lets the deployment workflow act on your hosting account; it is different from your sign-in
password.

### Quick deployment: Render and Neon {#render-neon}

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

### Quick deployment: Heroku and Neon {#heroku-neon}

Choose this instead of the Render steps; you do not need both providers. The database still lives in
Neon, while Heroku runs two apps: Core and PostgREST.

1. Fork `core-py` and enable Actions. Create a dedicated Neon project, keeping `neondb` and
   `neondb_owner`, and retain the project ID and API key as described above.
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
   for HTTP `200`, then continue to step 2 below.

The workflow runs one Eco web dyno per app. Heroku charges and
[Eco sleep behavior](https://devcenter.heroku.com/articles/eco-dyno-hours) apply. Keep the same
database passwords on reruns; replacing them is a coordinated credential rotation, not a routine
redeploy. As with Render Free, sleeping Core cannot provide continuous collection. The maintained
deployment procedure and recovery details live in the
[Core Heroku self-hosting guide](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/heroku-neon-self-host.md).

### Manual deployment {#manual-deployment}

For your own database, server, or container setup, follow
[Advanced Self-Hosting](/self-hosted/advanced#manual-deployment). It covers PostgreSQL
initialization, PostgREST, the Core Python program, and operating responsibilities. Return here
after deployment to connect clients and collect your first source.

**Checkpoint for every deployment path:** you have a ready Core URL, a PostgREST URL, your private
JWT secret, and a persistent Core Peer identity. Continue below; collecting and using information
works the same way regardless of the hosting provider.

**Keep your instance credentials private.** `JWT_SECRET` grants control of the instance, not a
limited personal login. Do not paste it into an online JWT generator, an issue, a chat, or your
public fork. This deployment does not isolate different users from one another. Start with your own
information and trusted devices.

## 2. Connect the command-line tool {#connect-cli}

The CLI handles setup operations that do not yet have a Web form. It connects over HTTPS; it does
not run another server on your computer.

1. Install [Python](https://www.python.org/downloads/) 3.12 or later if needed. Check
   `python --version` in a terminal; use `python3` if that is your system's command name.
2. Create a local environment:

   ```sh
   python -m venv .venv
   ```

   Activate it with `source .venv/bin/activate` on macOS/Linux, or `.venv\Scripts\Activate.ps1` in
   Windows PowerShell. Then install the published CLI:

   ```sh
   python -m pip install inkcre-cli
   inkcre-cli --help
   ```

3. In a local folder outside any Git repository, use a text editor to create `connection.json`:

   ```json
   {
     "base_url": "https://YOUR-CORE-HOST",
     "jwt_secret": "YOUR-SAVED-JWT-SECRET"
   }
   ```

   Replace both values, preserving the quotes. Use the Core base URL without `/readyz`. This file
   contains a credential; keep it private.

4. From that folder, save and check the connection:

   ```sh
   inkcre-cli connection set personal --input connection.json
   inkcre-cli connection use personal
   inkcre-cli connection check
   ```

   Both readiness and the authenticated read should succeed. You can remove the temporary
   `connection.json` afterward: the CLI retains it at `.inkcre/cli/connections.json` in your home
   directory. Protect that file too.

**Checkpoint:** `connection check` can read your instance. For `401`, check the secret; for a
connection failure, check the Core URL and wake `/readyz`. In later terminal sessions, reactivate
the environment before using `inkcre-cli`.

The [CLI reference](https://github.com/InKCre/core-py/blob/main/cli/README.md) owns command details.
`--help` explains a command; `--schema` on input-taking commands shows the configuration accepted by
your running instance.

## 3. Collect your first RSS feed

Choose a publication you already read and copy its **RSS or Atom feed URL**. Its normal homepage URL
is not usually a feed URL. Look for an RSS/Subscribe link on the publication.

### Enable the collector

Install the RSS Extension on Core, then enable it:

```sh
inkcre-cli extension install inkcre/rss --version 0.2.0
inkcre-cli extension enable inkcre/rss
inkcre-cli source types
```

Version `0.2.0` is a published Python release for Core Host `0.2.x`. For a different Host version,
check the [RSS release listing](https://registry.inkcre.dev/v1/extensions/inkcre/rss) for a
published release with a compatible `python.host_sdk_version`. Do not guess a version or use
`latest`. If already installed, inspect `inkcre-cli extension get inkcre/rss` before changing it.

The type list should contain `extensions.rss.rss.Source` and `extensions.rss.atom.Source`. The Web
app's Extensions switch controls its browser runtime; it does not enable this Core collector.

### Add and run the source

1. Create `feed.json` in your local working folder:

   ```json
   {
     "nickname": "My first feed",
     "config": {
       "feed_url": "https://YOUR-PUBLICATION/FEED",
       "fetch_full_text": false,
       "download_enclosures": false
     }
   }
   ```

   Replace the URL. These first-run settings collect feed content without extra article fetches or
   attachment downloads.

2. Create the Source, choosing the matching feed format:

   ```sh
   inkcre-cli source create --type extensions.rss.rss.Source --input feed.json
   ```

   For Atom, use `extensions.rss.atom.Source`. Record the returned Source `id`.

3. Collect it. Replace `42` with your Source ID:

   ```sh
   inkcre-cli source collect 42 --input-json '{}'
   ```

4. The response contains a **Job ID**, different from the Source ID. Replace `17` with it:

   ```sh
   inkcre-cli job wait 17 --for 30s
   ```

   Look for `status: finished`. If still `pending` or `running`, observe again rather than creating
   another collect job. If `failed`, inspect `inkcre-cli job get 17 --json` and its diagnostics.
   Ending observation does not stop the Job.

**Checkpoint:** the collection Job finished. A feed exposes only what its publisher currently
provides; success does not mean its entire historical archive was imported.

## 4. Find and inspect what you saved

Collection and indexing are separate. Create a lexical-index maintenance Job after collection to
enable search by remembered words, without an AI provider:

```sh
inkcre-cli job create --type core.feature_retrieval.lexical.maintain.v1 --input-json '{"parameters":{}}'
```

Use its returned Job ID with `inkcre-cli job wait JOB_ID --for 30s`, replacing `JOB_ID` with the
number. Check its status and `state` for indexed records and diagnostics. Maintenance processes a
bounded batch; repeat if you imported more than one batch can index.

Copy a distinctive phrase from an item in your feed and search:

```sh
inkcre-cli recall 'A phrase from your feed item' --mode lexical
```

Read a returned Block's content and relationships, replacing `123` with that Block's ID:

```sh
inkcre-cli resolver invoke block:123 --method get_text
inkcre-cli graph neighborhood block:123
```

**Checkpoint:** you can retrieve a real item you recognize and see its source relationships. You
have completed the first loop: source → saved information → information you can use.

This first form of organization comes from the source: feed items belong to feeds, GitHub
repositories can belong to Lists, and mail has sender and mailbox relationships. It does not mean
InKCre has already summarized, tagged, or reorganized everything with AI.

## 5. Keep collecting and searching

After the manual run works, create `collect-hourly.json`, replacing `42` with your Source ID:

```json
{
  "schedule": "0 * * * *",
  "job_parameters": { "source": 42, "config": {} }
}
```

```sh
inkcre-cli cron create --job-type core.source.collect.v1 --input collect-hourly.json
```

This five-field schedule means “at minute zero of every hour.” Add independent index maintenance so
later items become searchable. Save this as `index-periodically.json`:

```json
{
  "schedule": "*/10 * * * *",
  "job_parameters": {}
}
```

```sh
inkcre-cli cron create --job-type core.feature_retrieval.lexical.maintain.v1 --input index-periodically.json
inkcre-cli cron list
```

Create each schedule once. Inspect its returned Cron ID with `inkcre-cli cron get ID`; `last_job`
identifies the Job to check. Pause it with `inkcre-cli cron disable ID`. Replace `ID` with the
actual number. Your terminal may be closed, but Core must run. Sleeping hosts miss occurrences and
do not automatically catch up. Independent indexing also means new items may not become searchable
immediately.

## 6. Add the sources you actually use

For each new source: enable its Core Extension, create the Source, collect once, inspect the Job,
run index maintenance, and search for a known item. Only then add a schedule.

The versions below are published releases for Core Host `0.2.x`. Check the linked release listings
and your running type's `--schema` when versions differ. Source files and command output may contain
account credentials; do not publish them.

### GitHub Stars and Lists

1. Create a personal access token for the account whose Stars and Lists you want to collect,
   following
   [GitHub's token instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
   Its account and permissions determine which data is visible.
2. Enable the Extension:

   ```sh
   inkcre-cli extension install inkcre/github --version 0.3.0
   inkcre-cli extension enable inkcre/github
   ```

3. Save `github.json` with your token:

   ```json
   {
     "nickname": "My GitHub saves",
     "config": { "github_token": "YOUR-GITHUB-TOKEN" }
   }
   ```

   ```sh
   inkcre-cli source create --type extensions.github.stars.Source --input github.json
   ```

4. Collect the returned Source ID as in step 3. After indexing, search for a repository you starred.
   Each run synchronizes current Stars and Lists; it is not a code backup or a full GitHub activity
   archive.

See the [GitHub collector](https://github.com/InKCre/core-py/blob/main/extensions/github/README.md)
and [published releases](https://registry.inkcre.dev/v1/extensions/inkcre/github).

### Email over IMAP

1. Find your provider's IMAP hostname and enable IMAP if required. Obtain an app-specific password
   where supported. Accounts requiring an unsupported authentication method cannot be connected by
   substituting an ordinary login password.
2. Install and enable `inkcre/mail` version `0.3.0`, using the two Extension commands above with
   `inkcre/mail` in place of `inkcre/github`.
3. Save `mail.json`, replacing the host and credentials:

   ```json
   {
     "nickname": "My mail",
     "config": {
       "protocol": "imap",
       "parameters": {
         "host": "YOUR-IMAP-HOST",
         "port": 993,
         "security": "tls",
         "username": "YOUR-MAIL-LOGIN",
         "password": "YOUR-APP-PASSWORD"
       },
       "ordinary_mark_as_seen": false,
       "synchronize_deletions": false
     }
   }
   ```

   ```sh
   inkcre-cli source create --type extensions.mail.source.Source --input mail.json
   ```

4. Send yourself a test email **after creating the Source**, then collect its ID. Ordinary
   collection starts with new mail; an empty first run does not imply login failed. Inspect mailbox
   diagnostics even if the Job finishes. This example preserves unread state; the collector's
   default would mark ordinary collected mail as seen.
5. For older mail, request a small explicit backfill. Replace `42` with the Mail Source ID and
   choose dates for your mailbox:

   ```sh
   inkcre-cli source backfill 42 --input-json '{"since":"2026-09-01","before":"2026-09-08"}'
   ```

   The start date is included and the end date excluded. Observe the Job and index afterward. This
   collector does not send mail or create email digests.

See the
[Mail configuration](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/mail-extension.md)
and [published releases](https://registry.inkcre.dev/v1/extensions/inkcre/mail).

### Send or forward messages from Telegram

1. Create a dedicated bot with [@BotFather](https://t.me/botfather): send `/newbot`, follow its
   naming prompts, and retain the token. Obtain your own numeric user ID using
   [Telegram Desktop's data export](https://telegram.org/blog/export-and-more): open **Settings →
   Advanced → Export Telegram data**, include personal information, and choose JSON format. In the
   exported JSON, use `personal_information.user_id`, not your `@username` or the bot's ID. Telegram
   may require confirmation from another device or a waiting period.
2. Install and enable `inkcre/telegram` version `0.3.0` with the same Extension commands.
3. Save `telegram.json`, replacing the token and example user ID:

   ```json
   {
     "nickname": "My Telegram inbox",
     "config": {
       "bot_token": "YOUR-BOT-TOKEN",
       "bound_user_id": 123456789,
       "download_attachments": false
     }
   }
   ```

   ```sh
   inkcre-cli source create --type extensions.telegram.source.Source --input telegram.json
   ```

4. Send a distinctive text message in a private chat with the bot, then collect the Source ID.
   Successfully saved messages receive a 👍 reaction. After indexing, search for its text.
5. Add a schedule to forward messages without running the CLI each time. `*/5 * * * *` polls every
   five minutes while Core is awake. Telegram retains updates for a limited time, so a long-sleeping
   instance should not be your only copy.

Use one bot for one Source. This is a capture inbox, not group/channel history import or a
notification destination. Attachments are metadata-only in this example; enable
`download_attachments` when you want their bytes saved too. See the
[Telegram collector](https://github.com/InKCre/core-py/blob/main/extensions/telegram/README.md) and
[published releases](https://registry.inkcre.dev/v1/extensions/inkcre/telegram).

Add more RSS/Atom subscriptions with one Source per feed. Memos-compatible capture is also available
through a separately configured
[Memos Extension](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/memos-extension.md).
An arbitrary service or browser account is not automatically a supported Source; check for a
collector before assuming its history can be imported.

## 7. Bring information into your daily workflow

### Read and explore in the Web app

The browser needs its **own** Client ID. Do not reuse the Core Peer ID: the browser excludes its own
identity when looking for another Peer to execute a capability. Settings does not yet create this
record for you.

1. In your dedicated Neon project's **SQL Editor**, select the same default branch and `neondb`
   database as deployment. For a manually hosted database, use your PostgreSQL SQL client against
   the initialized InKCre database instead. Run this once to register your browser:

   ```sql
   INSERT INTO inkcre.peers (id, name, config)
   VALUES (
     gen_random_uuid(),
     'My web browser',
     '{"extension_registry_url":"https://registry.inkcre.dev"}'::jsonb
   )
   RETURNING id;
   ```

   Save the returned UUID as your browser Client ID. This adds one record without replacing Core's
   record. Reuse it when reconnecting this browser.

2. Wake Core `/readyz`, then open [Web app Settings](https://app.inkcre.dev/settings).
3. Enter **PostgreSQL REST URL** = PostgREST base URL, **JWT Secret** = your saved secret, and
   **Client ID** = the new browser UUID. Choose **Save**, then reload. The Clients list should
   include Core, reporting online.
4. Open **Info Base**, search for the phrase that worked in step 4, and inspect a result. Use **View
   content** for supported content and the graph view to follow relationships. The list is a search
   surface, not every stored Block. Some source renderers need a compatible Web Extension; the CLI's
   `get_text` remains a way to read Core-resolved text.
5. Bookmark the app. Another browser/device needs its own connection setup. **Export** omits the
   secret and is not an info-base backup.

### Use your information from a terminal or AI tool

Keep `inkcre-cli recall 'your clue' --mode lexical` available wherever you work. A terminal-based
assistant you trust can use the installed CLI and named connection. For example:

> Use my InKCre personal connection to find articles I saved about distributed systems. Read the
> matches and cite their original links. Do not change my sources or data.

The connection has owner authority; only give it to a tool you trust. Its model provider may receive
the content it reads.

For clients that connect over MCP instead of running terminal commands, follow the
[MCP Sink setup](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/mcp-sink.md). Create
and enable a `core.mcp.v1` Sink with a separate PAT, then configure Bearer authentication for
`https://YOUR-CORE-HOST/sinks/SINK_ID/mcp`. This needs explicit Sink and client setup; the CLI has
no `sink` command. The MCP PAT is not `JWT_SECRET`. Check the client's authentication support or the
documented tunnel before choosing this route.

These paths make your saved information available on demand. They do not configure proactive
notifications or a daily briefing.

### Add AI organization when you need it

Once collection and reading work, configure a model provider and Agent for rumination, then
explicitly reconsider a Block. Follow the
[Core organization configuration](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/organization.md)
for the Agent and deployment settings before using **Ruminate** or
`inkcre-cli organization ruminate BLOCK_ID`.

Inspect the Job and graph afterward. A valid result may add nothing. Re-index after new content is
added to find it by words. Semantic search additionally needs an embedding provider/profile and
maintenance; an LLM API key alone does not enable it. Selected content leaves your instance for
configured AI providers and may incur charges.

## If a step does not work

| What you observe                         | What to check next                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Deployment workflow missing              | Enable Actions in your fork and check that it is up to date with upstream `main`.                         |
| Core slow or offline                     | Open Core `/readyz`; inspect host logs if it stays unready. PostgREST may sleep separately.               |
| Client returns `401`                     | Check endpoint and secret. Anonymous PostgREST `401` is expected; authenticated `401` is not.             |
| Source type absent                       | Install a compatible Extension and enable it on Core, not only in the Web app.                            |
| Job stays pending                        | Confirm Core is awake and its collector enabled. Job creation only confirms acceptance.                   |
| Collection finished but search empty     | Confirm the source exposed the item; run lexical maintenance and inspect diagnostics.                     |
| CLI works but Web cannot find a provider | Check Core readiness and that browser and Core Peer IDs differ.                                           |
| Old mail missing                         | Ordinary collection starts with new mail. Request a historical backfill.                                  |
| Truncated content or no attachment bytes | First-run examples avoid extra downloads. Check the collector's settings.                                 |
| Request outcome uncertain                | Read the Job or resulting data before repeating a write; a lost response does not prove nothing happened. |

Keep hosting and connection credentials in your password manager. Review your database's
backup/restore options and hosting usage before collecting irreplaceable information. A fork, a
client configuration export, and a source account are not backups of your info-base.
