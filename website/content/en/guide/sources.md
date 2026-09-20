---
title: Connect More Sources
description: Connect GitHub, email, Telegram, and other supported sources.
---

# Connect More Sources

These instructions use an already [connected CLI](/guide/connect-cli). Follow the
[first-source walkthrough](/guide/first-source) once to learn how Source IDs and collection Jobs
work.

For each new source: enable its Core Extension, create the Source, collect once, inspect the Job,
run index maintenance, and search for a known item. Only then add a schedule.

The versions below are published releases for Core Host `0.2.x`. Check the linked release listings
and your running type's `--schema` when versions differ. Source files and command output may contain
account credentials; do not publish them.

## GitHub Stars and Lists

1. Create a personal access token for the account whose Stars and Lists you want to collect,
   following
   [GitHub's token instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
   Its account and permissions determine which data is visible.
2. Enable the Extension:

   ```sh
   inkcre-cli extension install inkcre/github --version 0.3.0
   inkcre-cli extension enable inkcre/github
   ```

3. Save `github.json` with your token:

   ```json
   {
     "nickname": "My GitHub saves",
     "config": { "github_token": "YOUR-GITHUB-TOKEN" }
   }
   ```

   ```sh
   inkcre-cli source create --type extensions.github.stars.Source --input github.json
   ```

4. Collect the returned Source ID using the [first-source procedure](/guide/first-source). After
   indexing, search for a repository you starred. Each run synchronizes current Stars and Lists; it
   is not a code backup or a full GitHub activity archive.

See the [GitHub collector](https://github.com/InKCre/core-py/blob/main/extensions/github/README.md)
and [published releases](https://registry.inkcre.dev/v1/extensions/inkcre/github).

## Email over IMAP

1. Find your provider's IMAP hostname and enable IMAP if required. Obtain an app-specific password
   where supported. Accounts requiring an unsupported authentication method cannot be connected by
   substituting an ordinary login password.
2. Install and enable `inkcre/mail` version `0.3.0`, using the two Extension commands above with
   `inkcre/mail` in place of `inkcre/github`.
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

4. Send yourself a test email **after creating the Source**, then collect its ID. Ordinary
   collection starts with new mail; an empty first run does not imply login failed. Inspect mailbox
   diagnostics even if the Job finishes. This example preserves unread state; the collector's
   default would mark ordinary collected mail as seen.
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

## Send or forward messages from Telegram

1. Create a dedicated bot with [@BotFather](https://t.me/botfather): send `/newbot`, follow its
   naming prompts, and retain the token. Obtain your own numeric user ID using
   [Telegram Desktop's data export](https://telegram.org/blog/export-and-more): open **Settings →
   Advanced → Export Telegram data**, include personal information, and choose JSON format. In the
   exported JSON, use `personal_information.user_id`, not your `@username` or the bot's ID. Telegram
   may require confirmation from another device or a waiting period.
2. Install and enable `inkcre/telegram` version `0.3.0` with the same Extension commands.
3. Save `telegram.json`, replacing the token and example user ID:

   ```json
   {
     "nickname": "My Telegram inbox",
     "config": {
       "bot_token": "YOUR-BOT-TOKEN",
       "bound_user_id": 123456789,
       "download_attachments": false
     }
   }
   ```

   ```sh
   inkcre-cli source create --type extensions.telegram.source.Source --input telegram.json
   ```

4. Send a distinctive text message in a private chat with the bot, then collect the Source ID.
   Successfully saved messages receive a 👍 reaction. After indexing, search for its text.
5. Add a schedule to forward messages without running the CLI each time. `*/5 * * * *` polls every
   five minutes while Core is awake. Telegram retains updates for a limited time, so a long-sleeping
   instance should not be your only copy.

Use one bot for one Source. This is a capture inbox, not group/channel history import or a
notification destination. Attachments are metadata-only in this example; enable
`download_attachments` when you want their bytes saved too. See the
[Telegram collector](https://github.com/InKCre/core-py/blob/main/extensions/telegram/README.md) and
[published releases](https://registry.inkcre.dev/v1/extensions/inkcre/telegram).

Add more RSS/Atom subscriptions with one Source per feed. Memos-compatible capture is also available
through a separately configured
[Memos Extension](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/memos-extension.md).
An arbitrary service or browser account is not automatically a supported Source; check for a
collector before assuming its history can be imported.

Next: [Use your information](/guide/daily-use).
