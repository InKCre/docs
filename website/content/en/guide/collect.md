---
title: Run a Collection
description: Execute one Source collection and distinguish its Source ID from its Job ID.
---

# Run a Collection

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
