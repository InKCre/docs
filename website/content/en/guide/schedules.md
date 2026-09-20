---
title: Schedule Collection and Indexing
description: Keep sources and search indexes current with explicit schedules.
---

# Schedule Collection and Indexing

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
