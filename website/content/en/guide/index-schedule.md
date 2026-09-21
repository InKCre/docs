---
title: Schedule Index Maintenance
outline: false
description: Keep the lexical search index current independently from collection and organization.
---

# Schedule Index Maintenance

Index maintenance makes existing info-base content available to lexical search. It is application
support: it does not collect information and it does not organize or author meaning in the
info-base.

First complete [one collection](/guide/collect) and [a successful search](/guide/search). Ask your
operator or trusted Agent to check whether the instance already has an index-maintenance schedule;
create only one if it does not:

```sh
inkcre-cli cron create --job-type core.feature_retrieval.lexical.maintain.v1 --input-json '{"schedule":"*/10 * * * *","job_parameters":{}}'
```

This five-field schedule runs every ten minutes while Core is available. Inspect the returned Cron
and its `last_job`; maintenance processes a bounded batch, and the Job carries its own result and
diagnostics. Avoid duplicate schedules. Sleeping hosts miss occurrences and do not automatically
catch up.

To pause future maintenance while keeping the Cron record, run:

```sh
inkcre-cli cron disable ID
```

Replace `ID` with the actual Cron ID. Pausing index maintenance does not stop collection or remove
stored information. Likewise, a [collection schedule](/guide/schedules) does not maintain this
index.

Next: [Connect More Sources](/guide/sources), or [Use Your Information](/guide/daily-use).
