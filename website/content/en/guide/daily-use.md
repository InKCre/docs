---
title: Browse and Use Your Information
description: Browse the info-base and connect it to the tools where you work.
---

# Browse and Use Your Information

Start with your instance and [a successful search](/guide/search). Retain your Core URL, PostgREST
URL, and private JWT secret.

## Read and explore in the Web app

First [connect the Web app](/guide/connect). Current Settings generates and registers the browser's
own Client ID; do not manually create a Peer or reuse Core's identity.

1. Open **Info Base** and search for the phrase that worked in the [search guide](/guide/search).
2. Select a result, use **View content** where supported, and explore its relationships in the
   graph. The list is a search surface, not every stored Block. Some rich renderers need a
   compatible browser Extension; an Agent can use the CLI's `get_text` to read Core-resolved text.
3. Bookmark the app. A new browser/device needs its own connection. **Export** omits the secret and
   is not an info-base backup.

![Info Base graph centered on one Block and its direct relationships](/images/client-web/info-base-graph.png)

_Open a result's neighborhood to move from one Block to the information directly related to it._

## Use your information from a terminal or AI tool

Keep `inkcre-cli recall 'your clue' --mode lexical` available wherever you work. A terminal-based
assistant you trust can use the installed CLI and named connection. For example:

> Use my InKCre personal connection to find articles I saved about distributed systems. Read the
> matches and cite their original links. Do not change my sources or data.

The connection has owner authority; only give it to a tool you trust. Its model provider may receive
the content it reads.

## Connect a Sink to ChatGPT

A Sink exposes InKCre capabilities to an external tool. Follow
[Connect ChatGPT through MCP](/guide/sinks/chatgpt) to create the MCP Sink, run Secure MCP Tunnel,
add the ChatGPT connection, and verify a real retrieval. It explains the separate credentials and
what must keep running; no CLI `sink` command is required.

For another MCP host that can send a Bearer PAT directly, the
[Core MCP Sink reference](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/mcp-sink.md)
owns the endpoint and authentication contract.

These paths make your saved information available on demand. They do not configure proactive
notifications or a daily briefing.

Next: [Organize Your Information](/guide/organization), or use
[Troubleshooting](/guide/troubleshooting) when a workflow fails.
