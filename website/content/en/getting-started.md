---
title: Getting Started
description:
  Understand what InKCre does, why you might use it, and how to start with your information.
---

# Getting Started

InKCre helps you collect information scattered across your tools, keep it under your control, and
make it available when you or your trusted tools need it. Start here to understand the experience,
then choose how you will access an instance. You do not need to be an InKCre developer to begin.

## What is InKCre?

InKCre collects information from the tools where it already lives and keeps it available beyond the
original source or collector. When it would make that information more useful, InKCre can also
improve what has already been collected. You can then find it yourself or make it available to other
trusted tools.

For example, you might collect articles from RSS feeds, keep track of saved GitHub repositories, and
capture messages you forward to a Telegram bot. Later, you can find an article from a phrase you
remember, follow its related information, or make it available to a trusted assistant.

Collection, Organization, and Application are connected capabilities, not mandatory stages. A
collector may preserve source relationships without performing Organization, and you can retrieve
information without first configuring an AI provider. Extensions add integrations with different
sources and tools; each has its own setup and limits.

## Why use it?

Saving information is useful only if you can find and reuse it. An article in one app, a repository
in another, and a note in a third can become difficult to bring together when you need them.

InKCre keeps that information available without making its usefulness depend on the original
collector or a single client. You choose the sources that matter, then use the information from the
Web app, the command line, or connected tools in your workflow. Self-hosting also lets you choose
where the instance runs and where its information is stored.

Start with a concrete need—such as finding useful articles from your subscriptions—rather than
connecting every source at once. One working source and a successful search are a better first
milestone than a large collection you cannot yet use.

## How do I start?

### 1. Choose how to access an instance

An **instance** stores your collected information and runs capabilities such as collection. A
**client**, such as the [Web app](https://app.inkcre.dev/settings), connects to that instance.
Opening the Web app does not create an instance for you.

- **Run your own instance:** choose [Self-Hosted](/self-hosted/). Its
  [setup guide](/self-hosted/setup) walks through quick deployment before you rejoin this journey.
  [Custom Self-Hosting](/self-hosted/custom) covers a step-by-step deployment on infrastructure you
  choose.
- **Already deployed your instance:** reuse the connection details you retained, then
  [connect the Web app](/guide/connect), [prepare an Extension](/guide/extensions), and
  [collect a source](/guide/first-source). Skip the deployment steps.

This guide assumes one user-owned deployment. InKCre is not a hosted sign-up service or a multi-user
account system; keep its instance authority on devices and tools you trust.

### 2. Collect one useful source

Choose [your first source](/guide/first-source); a public RSS feed is an easy starting point. Each
[source guide](/guide/sources) covers its own prerequisites, Extension setup, and first collection.
Once you can retrieve a known item, add personal sources one at a time, with the credentials and
permissions each requires.

### 3. Find what you collected

Follow [Find What You Saved](/guide/search) to maintain the search index, search for something you
remember, and open a result. Finding a real item completes the linear Getting Started path,
independently of your deployment choice.

Model-assisted Organization and semantic retrieval are optional next steps with their own provider
and maintenance setup. InKCre does not automatically configure a daily digest or Telegram/email push
notifications: making information available in your tools is distinct from proactively sending it.

## Your next step

If you do not have an instance yet, open [Self-Hosted](/self-hosted/) and choose a deployment path.
After the first-use path works, continue with the User Guide's formal chapters for
[more sources](/guide/sources), [collection schedules](/guide/schedules),
[Organization and retrieval maintenance](/guide/organization), and
[browsing or connecting applications to your information](/guide/daily-use). You can also return to
[Self-Hosted](/self-hosted/) for deployment operations and customization. If you want to understand
or contribute to the implementation, use the [Developer Guide](/developer/) instead. For the
project's values and direction, read [About InKCre](/about/).
