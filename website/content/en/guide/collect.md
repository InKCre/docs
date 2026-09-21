---
title: Run a Collection
outline: false
description: Execute one Source collection and distinguish its Source ID from its Job ID.
---

# Run a Collection

Start with a [connected interface](/guide/connect). Choose Web for your own setup, or CLI / Agent
for terminal instructions.

<InterfaceGuide>
<template #web>

## Collect in the Web app

1. Open **Sources** and select the Source you created.
2. Open its new-collection Job dialog (**New Job**, or **New task** in newer layouts).
3. Select ordinary collection and leave run **Config** as `{}`, unless your source guide supplies
   other options. Confirm once. This configuration applies to the run, not the Source's saved
   account settings.
4. Open the resulting Job from the Source's Jobs list. Wait for **finished**; refresh its details
   while it remains pending/running. Read **State** and **Logs**, including source-specific
   diagnostics.
5. If creation could not be confirmed, check the Jobs list before submitting again. A timeout does
   not prove the first request did nothing.

The Source ID persists across runs; each run has its own Job ID. A successful empty collection can
be normal. Do not repeatedly create Jobs to work around a provider error.

Next: [index and search](/guide/search), then [schedule collection](/guide/schedules).

</template>
<template #cli>

First create a Source using [its setup guide](/guide/sources). Keep the returned Source ID.

1. Replace `42` with that Source ID and run:

   ```sh
   inkcre-cli source collect 42 --input-json '{}'
   ```

   The empty object uses that collector's default run options. Source-specific options belong to the
   individual guide; they are not a replacement for the Source's saved account configuration.

2. The response contains a new **Job ID**. Replace `17` with it:

   ```sh
   inkcre-cli job wait 17 --for 30s
   ```

3. Look for `status: finished`. If still `pending` or `running`, observe the same Job again. Ending
   observation does not cancel it. If it failed, inspect:

   ```sh
   inkcre-cli job get 17 --json
   ```

Read source-specific diagnostics even after success. Do not repeatedly create Jobs to work around a
provider error or an observation timeout; fix the reported cause first. Review output for private
information before sharing it.

Next: [index and search for a known item](/guide/search), then [schedule](/guide/schedules).

</template>
</InterfaceGuide>
