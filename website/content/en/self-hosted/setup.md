---
title: Set Up a Self-Hosted Instance
description: Deploy your own instance, then join the shared user journey for collection and use.
---

# Set Up a Self-Hosted Instance

This [Self-Hosted](/self-hosted/) guide gives you an instance that you operate. For the
application's What, Why, and linear first-use journey, begin with
[Getting Started](/getting-started).

You will use the Web app for interactive setup. Your trusted Agent can handle the remaining
terminal-only operations, such as installing Core collectors and scheduling indexing. No InKCre
development setup or AI model is needed for the first collection-and-search journey. Each guide
below is self-contained and can also be used with an existing compatible instance.

## 1. Deploy an instance

Choose **one** deployment guide:

- [Render and Neon](/self-hosted/render-neon): fork-based quick deployment on Render.
- [Heroku and Neon](/self-hosted/heroku-neon): the equivalent quick deployment on Heroku.
- [Custom Self-Hosting](/self-hosted/custom): initialize PostgreSQL, configure PostgREST, and run
  Core on infrastructure you choose.

Neon and the compute providers are convenience options, not requirements. At the end, retain a ready
Core URL, a PostgREST URL, your private JWT secret, and the Core Peer ID.

## 2. Complete the first collection-and-search loop

Follow these shared user guides in order. If you already have an instance, start here.

1. [Connect to your instance](/guide/connect), using the Web app or the CLI for your Agent.
2. [Collect your first source](/guide/first-source); a public RSS or Atom feed is a simple starting
   point.
3. [Find what you saved](/guide/search): maintain the lexical index, search, and inspect a result.

**Checkpoint:** you can retrieve a real item from your source. Collection and indexing are separate;
neither requires you to set up Organization first.

## 3. Continue through the User Guide

Finding a real item completes the linear Getting Started journey. Continue with the separate User
Guide chapters that match your needs:

- [Schedule collection](/guide/schedules).
- [Organize information and maintain retrieval support](/guide/organization).
- [Browse and use your information](/guide/daily-use), including CLI, Agent, and Sink connections.
- [Connect more sources](/guide/sources), such as GitHub saves, email, and Telegram messages.
- [Custom Self-Hosting](/self-hosted/custom) for more infrastructure choices and manual operations.

These paths make information available on demand. They do not configure automatic daily digests or
Telegram/email push notifications. Hosting that sleeps cannot guarantee continuous collection.

If a step fails, use [Troubleshooting](/guide/troubleshooting).
