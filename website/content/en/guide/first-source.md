---
title: Collect Your First Source
description: Choose a source and complete your first collection and search.
---

# Collect Your First Source

Start with a working instance and a [connected CLI](/guide/connect-cli). You do not need to connect
every account at once: choose one small source with an item you will recognize.

## Choose your first source

[RSS or Atom](/guide/sources/rss) is a useful first choice because a public feed needs no account
credentials. If you prefer your own saved information, start with
[GitHub Stars](/guide/sources/github), [email](/guide/sources/mail),
[Telegram](/guide/sources/telegram), or [Twitter / X bookmarks](/guide/sources/twitter). Each guide
includes its own prerequisites and setup.

An **Extension** supplies a collector implementation; a **Source** is one configured use of it. For
example, install the RSS Extension once, then create one Source per feed. Installing it does not
automatically enable it or collect anything. Enable the collector on Core, not only in the Web app.

## Complete the first loop

1. Follow your chosen source's guide to enable its Extension and create the Source. Retain the
   returned **Source ID**.
2. [Run a Collection](/guide/collect) and wait for the returned **Job ID** to finish. These are
   different IDs: the Source persists across runs; each Job represents one run.
3. [Find What You Saved](/guide/search): maintain the lexical index and search for a known item.
4. Only after that works, [schedule collection and indexing](/guide/schedules).

**Done means you retrieved a real item**, not just that installation or a Job succeeded. A
successful empty collection may be normal; each source guide explains what is eligible for
collection.

Next: [Connect More Sources](/guide/sources), or [Use Your Information](/guide/daily-use).
