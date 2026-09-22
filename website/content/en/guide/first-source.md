---
title: Choose Your First Source
description: Choose one small information source for your first collection.
---

# Choose Your First Source

Start with a working instance and a [connected Web app or Agent](/guide/connect). The guides default
to Web instructions, with a CLI / Agent alternative. You do not need to connect every account at
once: choose one small source with an item you will recognize.

[RSS or Atom](/guide/sources/rss) is a useful first choice because a public feed needs no account
credentials. If you prefer your own saved information, start with
[GitHub Stars](/guide/sources/github), [email](/guide/sources/mail),
[Telegram](/guide/sources/telegram), or [Twitter / X bookmarks](/guide/sources/twitter). Each guide
includes its own prerequisites and setup.

An **Extension** supplies a collector implementation; a **Source** is one configured use of it. For
example, install the RSS Extension once, then create one Source per feed. Installing it does not
automatically enable it or collect anything. [Prepare the Extension](/guide/extensions) on Core,
then configure the Source in the Web app. Select the online Core Peer when installing a Python-only
collector; the browser does not need to run that Extension itself.

## Continue the first loop

1. [Prepare the Extension](/guide/extensions) named by your source guide.
2. Return to that guide to create the Source.
3. [Run a Collection](/guide/collect) and wait for its Job to finish.
4. [Find What You Saved](/guide/search) and open a known item.

![The client-web Sources page showing saved Sources and their collection actions](/images/client-web/sources-overview.png)

_Each row is one configured Source. Open it to inspect configuration and history, or run a manual
collection from the row._

**Done means you retrieved a real item**, not just that installation or a Job succeeded. A
successful empty collection may be normal; each source guide explains what is eligible for
collection.

After you find a real item, Getting Started is complete.
