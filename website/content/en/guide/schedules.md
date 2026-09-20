---
title: Schedule Collection and Indexing
outline: false
description: Keep sources and search indexes current with explicit schedules.
---

# Schedule Collection and Indexing

Start with a [connected interface](/guide/connect). Choose Web for your own setup, or CLI / Agent
for terminal instructions.

<InterfaceGuide>
<template #web>

## Schedule collection in the Web app

First complete [a manual collection](/guide/collect) and [find a known item](/guide/search).

1. Open the Source's details and inspect existing schedules. Twitter's wizard already creates a
   daily schedule; do not add a duplicate.
2. In **Cron schedule**, enter `0 * * * *` and choose **Schedule ordinary collect**. Newer layouts
   put this under **Schedules → Add schedule**. It collects at minute zero of every hour.
3. Check the resulting schedule and subsequent Job. Core must be running; closing the browser is
   fine. Sleeping hosts miss occurrences and do not automatically catch up.
4. To stop future runs from the Web, delete the specific schedule after checking its Source.
   Existing Jobs and collected information remain. An Agent can instead disable a Cron through the
   CLI if you want to retain it for later re-enabling.

## Keep the search index current

The Source schedule does **not** maintain the lexical index. Ask your operator or Agent to create
one separate index-maintenance schedule if the instance does not already have it:

```sh
inkcre-cli cron create --job-type core.feature_retrieval.lexical.maintain.v1 --input-json '{"schedule":"*/10 * * * *","job_parameters":{}}'
```

This is currently a CLI operation. Inspect the resulting Cron and its `last_job`, and avoid
duplicate schedules. Independent indexing means newly collected items may not be searchable
immediately.

Next: [Connect More Sources](/guide/sources).

</template>
<template #cli>

First complete [one collection](/guide/first-source) and [a successful search](/guide/search). Keep
the Source ID returned when you created the Source.

After the manual run works, create `collect-hourly.json`, replacing `42` with your Source ID:

```json
{
  "schedule": "0 * * * *",
  "job_parameters": { "source": 42, "config": {} }
}
```

```sh
inkcre-cli cron create --job-type core.source.collect.v1 --input collect-hourly.json
```

This five-field schedule means “at minute zero of every hour.” Add independent index maintenance so
later items become searchable. Save this as `index-periodically.json`:

```json
{
  "schedule": "*/10 * * * *",
  "job_parameters": {}
}
```

```sh
inkcre-cli cron create --job-type core.feature_retrieval.lexical.maintain.v1 --input index-periodically.json
inkcre-cli cron list
```

Create each schedule once. Inspect its returned Cron ID with `inkcre-cli cron get ID`; `last_job`
identifies the Job to check. Pause it with `inkcre-cli cron disable ID`. Replace `ID` with the
actual number. Your terminal may be closed, but Core must run. Sleeping hosts miss occurrences and
do not automatically catch up. Independent indexing also means new items may not become searchable
immediately.

Next: [Add more sources](/guide/sources).

</template>
</InterfaceGuide>
