---
title: Getting Started
description:
  Understand what InKCre does, why you might use it, and how to start with your information.
---

# Getting Started

InKCre helps you turn information scattered across your tools into a collection you can return to
and use. Start here to understand the experience, then choose how you will access an instance. You
do not need to be an InKCre developer to begin.

## What is InKCre?

InKCre collects information, organizes it in an **info-base**, and makes it available for retrieval
and use in other tools. Think of the info-base as your reusable collection, including connections
between pieces of information rather than only a folder of copies.

For example, you might collect articles from RSS feeds, keep track of saved GitHub repositories, and
capture messages you forward to a Telegram bot. Later, you can find an article from a phrase you
remember, follow its related information, or make it available to a trusted assistant.

These are connected capabilities, not mandatory stages: you can collect and retrieve information
without first configuring AI organization. Extensions provide integrations with different sources
and tools; each integration has its own setup and limits.

## Why use it?

Saving information is useful only if you can find and reuse it. An article in one app, a repository
in another, and a note in a third can become difficult to bring together when you need them.

InKCre gives that information a common home without making its usefulness depend on the original
collector or a single client. You choose the sources that matter, then access the collection from
the Web app, the command line, or connected tools in your workflow. Self-hosting also lets you
choose where the instance runs and where its information is stored.

Start with a concrete need—such as finding useful articles from your subscriptions—rather than
connecting every source at once. One working source and a successful search are a better first
milestone than a large collection you cannot yet use.

## How do I start?

### 1. Choose how to access an instance

An **instance** stores your info-base and runs capabilities such as collection. A **client**, such
as the [Web app](https://app.inkcre.dev/settings), connects to that instance. Opening the Web app
does not create an instance for you.

- **Run your own instance:** choose [Self-Hosted](/self-hosted/). Its
  [Getting Started](/self-hosted/getting-started) guide walks through quick deployment and your
  first collection. [Advanced](/self-hosted/advanced) covers manual deployment and operating it on
  infrastructure you choose.
- **Already have access to an instance:** obtain connection details from the person operating it,
  then follow [Connect the CLI](/guide/connect-cli), [collect a source](/guide/first-source), and
  [connect your everyday tools](/guide/daily-use). Skip the deployment steps. Only connect
  information and tools you are authorized to use with that instance.

This guide does not assume a hosted sign-up service or separate private user accounts inside an
instance. Access arrangements and trust matter; do not treat a shared instance as an isolated
personal account.

### 2. Collect one useful source

Choose [your first source](/guide/first-source); a public RSS feed is an easy starting point. Each
[source guide](/guide/sources) covers its own prerequisites, Extension setup, and first collection.
Once you can retrieve a known item, add personal sources one at a time, with the credentials and
permissions each requires.

### 3. Find and use what you collected

Follow [Find What You Saved](/guide/search) to maintain the search index, search for something you
remember, and open a result. Then [Use Your Information](/guide/daily-use) to connect the Web app or
a tool you already use. These guides work independently of your deployment choice.

AI organization and semantic retrieval are optional next steps with their own provider and
maintenance setup. InKCre does not automatically configure a daily digest or Telegram/email push
notifications: making information available in your tools is distinct from proactively sending it.

## Your next step

If you do not have an instance yet, open [Self-Hosted](/self-hosted/) and choose a deployment path.
If you want to understand or contribute to the implementation, use the
[Developer Guide](/developer/) instead. For the project's values and direction, read
[About InKCre](/about/).
