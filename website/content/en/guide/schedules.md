---
title: Schedule Collection
outline: false
description: Keep information sources current with explicit collection schedules.
---

# Schedule Collection

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

This schedule only collects from the Source. It does not maintain a search index or run
Organization. Configure [retrieval maintenance separately](/guide/organization) if you want newly
collected items to become searchable without a manual maintenance Job.

Next: [Organize Your Information](/guide/organization), or [Connect More Sources](/guide/sources).

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

This five-field schedule means “at minute zero of every hour.” Create it once. Inspect its returned
Cron ID with `inkcre-cli cron get ID`; `last_job` identifies the Job to check. Pause it with
`inkcre-cli cron disable ID`. Replace `ID` with the actual number. Your terminal may be closed, but
Core must run. Sleeping hosts miss occurrences and do not automatically catch up.

Collection does not update search indexes or run Organization. Continue with
[Organize Your Information](/guide/organization), or [Add More Sources](/guide/sources).

</template>
</InterfaceGuide>
