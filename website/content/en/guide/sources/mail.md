---
title: Email over IMAP
outline: false
description: Connect your IMAP mailbox to InKCre.
---

# Email over IMAP

You need a [connected interface](/guide/connect) and IMAP credentials for your mailbox.

<InterfaceGuide>
<template #web>

1. Find your provider's IMAP hostname and enable IMAP if required. Obtain an app-specific password
   where supported. An ordinary password cannot replace an unsupported authentication method.
2. [Prepare the Extension](/guide/extensions): `inkcre/mail` version `0.3.2` on Core Host SDK
   `0.3.x`. Follow the Registry-to-Web installation steps, then use **Enable…** on the installed
   Extension to select your online Core Peer.
3. Open **Sources** and the create-source form. Use **Nickname** `My mail` and **Type**
   `extensions.mail.source.Source`.
4. In the **Form** tab, set **Protocol** to `imap`. Under **Parameters**, enter the hostname, port
   `993`, TLS security, username, and app password. Turn **Ordinary mark as seen** off and leave
   **Synchronize deletions** off, then create the Source.

5. Send yourself a test message **after creating the Source**, then [collect once](/guide/collect).
   Ordinary collection begins with new mail; an empty result does not prove authentication failed.
   Inspect the Job's mailbox diagnostics. These settings preserve unread state.
6. To collect older mail, open the Source's new-collection Job dialog, select **Historical
   backfill**, and enter a small date range as its run Config:

   ```json
   { "since": "2026-09-01", "before": "2026-09-08" }
   ```

Choose dates appropriate to your mailbox. The start is included and the end excluded. Observe that
Job, then [index and search](/guide/search) for a known email. This collector does not send mail or
generate email digests. Keep credentials and diagnostics private.

![A collected email opened in Info Base with content, attachments, and related messages](/images/client-web/mail-content.png)

_After indexing, open a collected message from Info Base to read its content and follow related
mail._

</template>
<template #cli>

Start with a working instance and a [connected CLI](/guide/connect-cli). The version below targets
Core Host SDK `0.3.x`; check the linked release listing for other Host versions. If already
installed, inspect `inkcre-cli extension get inkcre/mail` before changing it. Keep credential files
and command output private.

1. Find your provider's IMAP hostname and enable IMAP if required. Obtain an app-specific password
   where supported. Accounts requiring an unsupported authentication method cannot be connected by
   substituting an ordinary login password.
2. Install and enable the Core Extension:

   ```sh
   inkcre-cli extension install inkcre/mail --version 0.3.2
   inkcre-cli extension enable inkcre/mail
   ```

3. Save `mail.json`, replacing the host and credentials:

   ```json
   {
     "nickname": "My mail",
     "config": {
       "protocol": "imap",
       "parameters": {
         "host": "YOUR-IMAP-HOST",
         "port": 993,
         "security": "tls",
         "username": "YOUR-MAIL-LOGIN",
         "password": "YOUR-APP-PASSWORD"
       },
       "ordinary_mark_as_seen": false,
       "synchronize_deletions": false
     }
   }
   ```

   ```sh
   inkcre-cli source create --type extensions.mail.source.Source --input mail.json
   ```

4. Send yourself a test email **after creating the Source**, then [collect its ID](/guide/collect).
   Ordinary collection starts with new mail; an empty first run does not imply login failed. Inspect
   mailbox diagnostics even if the Job finishes. This example preserves unread state; the
   collector's default would mark ordinary collected mail as seen.
5. For older mail, request a small explicit backfill. Replace `42` with the Mail Source ID and
   choose dates for your mailbox:

   ```sh
   inkcre-cli source backfill 42 --input-json '{"since":"2026-09-01","before":"2026-09-08"}'
   ```

   The start date is included and the end date excluded. Observe the Job and index afterward. This
   collector does not send mail or create email digests.

See the
[Mail configuration](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/mail-extension.md)
and [published releases](https://registry.inkcre.dev/v1/extensions/inkcre/mail).

Next: [index and search for a known item](/guide/search), then
[schedule collection](/guide/schedules).

</template>
</InterfaceGuide>
