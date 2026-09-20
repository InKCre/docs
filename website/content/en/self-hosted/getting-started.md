---
title: Getting Started
description: Follow the self-hosted path from deployment to collecting and using your information.
---

# Self-Hosted Getting Started

This is the [Self-Hosted](/self-hosted/) path through InKCre: you will operate your own instance.
For the application's What, Why, and How, begin with [Getting Started](/getting-started).

You will use a browser, a text editor, and a few terminal commands. No InKCre development setup or
AI model is needed for the first collection-and-search journey. Each guide below is self-contained
and can also be used with an existing compatible instance.

## 1. Deploy an instance

Choose **one** deployment guide:

- [Render and Neon](/self-hosted/render-neon): fork-based quick deployment on Render.
- [Heroku and Neon](/self-hosted/heroku-neon): the equivalent quick deployment on Heroku.
- [Advanced Self-Hosting](/self-hosted/advanced): initialize PostgreSQL, configure PostgREST, and
  run Core on infrastructure you choose.

Neon and the compute providers are convenience options, not requirements. At the end, retain a ready
Core URL, a PostgREST URL, your private JWT secret, and the Core Peer ID.

## 2. Complete the first collection-and-search loop

Follow these shared user guides in order. If you already have an instance, start here.

1. [Connect the CLI](/guide/connect-cli) and verify authenticated access.
2. [Collect your first source](/guide/first-source), using one public RSS or Atom feed.
3. [Find what you saved](/guide/search): maintain the lexical index, search, and inspect a result.

**Checkpoint:** you can retrieve a real item from your source. Collection and indexing are separate;
neither requires you to set up AI organization first.

## 3. Make it useful day to day

- [Schedule collection and indexing](/guide/schedules) after the manual steps work.
- [Connect more sources](/guide/sources), such as GitHub saves, email, and Telegram messages.
- [Use your information](/guide/daily-use) from the Web app, a terminal, or a trusted assistant.
  This also explains optional AI organization and MCP access.

These paths make information available on demand. They do not configure automatic daily digests or
Telegram/email push notifications. Hosting that sleeps cannot guarantee continuous collection.

If a step fails, use [Troubleshooting](/guide/troubleshooting). For backups, upgrades, and ongoing
hosting responsibilities, return to [Advanced Self-Hosting](/self-hosted/advanced).
