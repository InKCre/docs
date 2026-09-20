---
title: Email over IMAP
description: Connect your IMAP mailbox to InKCre.
---

# Email over IMAP

Start with a working instance and a [connected CLI](/guide/connect-cli). The version below targets
Core Host `0.2.x`; check the linked release listing for other Host versions. If already installed,
inspect `inkcre-cli extension get inkcre/mail` before changing it. Keep credential files and command
output private.

1. Find your provider's IMAP hostname and enable IMAP if required. Obtain an app-specific password
   where supported. Accounts requiring an unsupported authentication method cannot be connected by
   substituting an ordinary login password.
2. Install and enable the Core Extension:

   ```sh
   inkcre-cli extension install inkcre/mail --version 0.3.0
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
