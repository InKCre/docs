---
title: Use Your Information
description: Connect the Web app and everyday tools, with optional Organization.
---

# Use Your Information

Start with a working instance and [a successful search](/guide/search). Retain your Core URL,
PostgREST URL, and private JWT secret. If someone else operates the instance, ask them to authorize
your access rather than assuming you may connect a browser Peer.

## Read and explore in the Web app

First [connect the Web app](/guide/connect). Current Settings generates and registers the browser's
own Client ID; do not manually create a Peer or reuse Core's identity.

1. Open **Info Base** and search for the phrase that worked in the [search guide](/guide/search).
2. Select a result, use **View content** where supported, and explore its relationships in the
   graph. The list is a search surface, not every stored Block. Some rich renderers need a
   compatible browser Extension; an Agent can use the CLI's `get_text` to read Core-resolved text.
3. Bookmark the app. A new browser/device needs its own connection. **Export** omits the secret and
   is not an info-base backup.

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

## Organize information when it improves later use

Once collection and reading work, follow [Organize Your Information](/guide/organization) to choose
one concrete improvement, configure the required Agent, run a best-effort Organization Job, and
inspect its graph effect. That guide also keeps lexical and semantic retrieval maintenance separate
from Organization. An LLM API key alone does not enable every capability.

Next: [Troubleshooting](/guide/troubleshooting).
