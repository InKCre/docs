---
title: Connect More Sources
description: Choose an independent setup guide for each information source.
---

# Connect More Sources

Use the guide for the information you want to bring into InKCre. Each page starts from a working
instance and a [connected interface](/guide/connect); you do not need to complete the RSS tutorial
first.

Choose **Web app** for your own setup or **CLI / Agent** for terminal instructions. The choice
follows you between guide pages. Shared prerequisites and source limitations apply to both. The
[Extension guide](/guide/extensions) distinguishes browser setup from Core installation and calls
out operations that still need an operator or Agent.

| What you want to collect                     | Setup guide                                      | What you need                            |
| -------------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| Articles from a publication                  | [RSS and Atom](/guide/sources/rss)               | A feed URL                               |
| Saved repositories and Lists                 | [GitHub Stars and Lists](/guide/sources/github)  | A GitHub personal access token           |
| New or historical mail                       | [Email over IMAP](/guide/sources/mail)           | IMAP access and supported credentials    |
| Text and messages you forward                | [Telegram inbox](/guide/sources/telegram)        | A dedicated bot and your numeric user ID |
| Your bookmarked posts                        | [Twitter / X bookmarks](/guide/sources/twitter)  | An X OAuth app and API access            |
| Notes you write in a Memos-compatible client | [Memos-compatible capture](/guide/sources/memos) | A supported client and a dedicated PAT   |

Memos is a write-in capture interface, not a collector that imports an existing Memos server. An
arbitrary webpage, social account, or service is not automatically a supported Source.

## Add one source at a time

Install and enable its Core Extension, complete any account authorization, create the Source, then
[collect once](/guide/collect). [Index and search](/guide/search) for an item you recognize before
[scheduling](/guide/schedules). More successful Jobs do not by themselves prove that more
information was imported.

The guides use compatible Extension versions for Core Host SDK `0.3.x`. Inspect existing
installations before changing versions and consult the linked Registry release listing for
compatibility. Keep local configuration files, tokens, and management-command output private.

## Build a missing collector

An Extension can add a Source without becoming part of the Core repository. If you know Python and
want to connect another service, follow
[Build a Source Extension](/developer/ecosystem/source-extension). That is the ecosystem developer
path; changing InKCre itself has a separate [contributor guide](/developer/contributing).

Next: [Use Your Information](/guide/daily-use).
