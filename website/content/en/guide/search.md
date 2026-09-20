---
title: Find What You Saved
outline: false
description: Index collected information and retrieve it by remembered words.
---

# Find What You Saved

Start with a [connected interface](/guide/connect). Choose Web for your own setup, or CLI / Agent
for terminal instructions.

<InterfaceGuide>
<template #web>

## Find information in the Web app

First finish [one collection](/guide/first-source).

1. Ask your operator or trusted Agent to run lexical-index maintenance after collection. This is
   currently a CLI operation, not a button in the Web app:

```sh
inkcre-cli job create --type core.feature_retrieval.lexical.maintain.v1 --input-json '{"parameters":{}}'
inkcre-cli job wait JOB_ID --for 30s
```

Replace `JOB_ID` with the returned number. Inspect its state and diagnostics; maintenance handles a
bounded batch, so a larger import can need another run. An [index schedule](/guide/schedules) avoids
needing this manual step for every collection.

2. Open **Info Base** in client-web. Enter a distinctive phrase from the collected item and search.
3. Select a result, inspect its details, use **View content** where supported, and follow its graph
   relationships. Some content needs a compatible browser Extension for rich rendering; an Agent can
   also retrieve Core-resolved text through the CLI.

**Checkpoint:** you found a real item and its source relationships. Collection and indexing are
separate; an AI key is not required for lexical search. Source-derived relationships do not mean
that InKCre has automatically summarized or reorganized everything with AI.

Next: [Schedule Collection and Indexing](/guide/schedules).

</template>
<template #cli>

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

</template>
</InterfaceGuide>
