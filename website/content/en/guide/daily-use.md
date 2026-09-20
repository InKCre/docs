---
title: Use Your Information
description: Connect the Web app and everyday tools, with optional AI organization.
---

# Use Your Information

Start with a working instance and [a successful search](/guide/search). Retain your Core URL,
PostgREST URL, and private JWT secret. If someone else operates the instance, ask them to register
your browser Peer rather than assuming database access.

## Read and explore in the Web app

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
4. Open **Info Base**, search for the phrase that worked in the [search guide](/guide/search), and
   inspect a result. Use **View content** for supported content and the graph view to follow
   relationships. The list is a search surface, not every stored Block. Some source renderers need a
   compatible Web Extension; the CLI's `get_text` remains a way to read Core-resolved text.
5. Bookmark the app. Another browser/device needs its own connection setup. **Export** omits the
   secret and is not an info-base backup.

## Use your information from a terminal or AI tool

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

## Add AI organization when you need it

Once collection and reading work, configure a model provider and Agent for rumination, then
explicitly reconsider a Block. Follow the
[Core organization configuration](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/organization.md)
for the Agent and deployment settings before using **Ruminate** or
`inkcre-cli organization ruminate BLOCK_ID`.

Inspect the Job and graph afterward. A valid result may add nothing. Re-index after new content is
added to find it by words. Semantic search additionally needs an embedding provider/profile and
maintenance; an LLM API key alone does not enable it. Selected content leaves your instance for
configured AI providers and may incur charges.

Next: [Troubleshooting](/guide/troubleshooting).
