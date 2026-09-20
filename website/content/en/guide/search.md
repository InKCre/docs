---
title: Find What You Saved
description: Index collected information and retrieve it by remembered words.
---

# Find What You Saved

You need a connected CLI and at least one completed collection. If you have not collected anything
yet, start with [your first source](/guide/first-source).

Collection and indexing are separate. Create a lexical-index maintenance Job after collection to
enable search by remembered words, without an AI provider:

```sh
inkcre-cli job create --type core.feature_retrieval.lexical.maintain.v1 --input-json '{"parameters":{}}'
```

Use its returned Job ID with `inkcre-cli job wait JOB_ID --for 30s`, replacing `JOB_ID` with the
number. Check its status and `state` for indexed records and diagnostics. Maintenance processes a
bounded batch; repeat if you imported more than one batch can index.

Copy a distinctive phrase from an item your source collected and search:

```sh
inkcre-cli recall 'A phrase from your saved item' --mode lexical
```

Read a returned Block's content and relationships, replacing `123` with that Block's ID:

```sh
inkcre-cli resolver invoke block:123 --method get_text
inkcre-cli graph neighborhood block:123
```

**Checkpoint:** you can retrieve a real item you recognize and see its source relationships. You
have completed the first loop: source → saved information → information you can use.

This first form of organization comes from the source: feed items belong to feeds, GitHub
repositories can belong to Lists, and mail has sender and mailbox relationships. It does not mean
InKCre has already summarized, tagged, or reorganized everything with AI.

Next: [Keep collecting and searching](/guide/schedules).
