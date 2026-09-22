---
title: Send or forward messages from Telegram
outline: false
description: Connect a personal Telegram capture inbox to InKCre.
---

# Send or forward messages from Telegram

You need a [connected interface](/guide/connect), a dedicated Telegram bot, and your numeric user
ID.

<InterfaceGuide>
<template #web>

1. Create a dedicated bot with [@BotFather](https://t.me/botfather): send `/newbot`, follow the
   prompts, and retain its token.
2. Obtain your own numeric user ID using
   [Telegram Desktop's data export](https://telegram.org/blog/export-and-more). Open **Settings →
   Advanced → Export Telegram data**, include personal information, and choose JSON. Use
   `personal_information.user_id`, not your `@username` or the bot's ID. Telegram may require
   another-device confirmation or a waiting period.
3. [Prepare the Extension](/guide/extensions): `inkcre/telegram` version `0.3.1` on Core Host SDK
   `0.3.x`. Select the online Core Peer to install and enable it.
4. Open **Sources** and the create-source form. Enter **Nickname** `My Telegram inbox` and choose
   **Type** `extensions.telegram.source.Source`. Paste this into **Config**, replace both values,
   and save/create:

   ```json
   {
     "bot_token": "YOUR-BOT-TOKEN",
     "bound_user_id": 123456789,
     "download_attachments": false
   }
   ```

5. Send a distinctive private message to the bot, then [collect once](/guide/collect). Saved
   messages receive a 👍 reaction. [Index and search](/guide/search) for the text.
6. [Schedule collection](/guide/schedules); `*/5 * * * *` polls every five minutes while Core runs.

Use one bot per Source. This is an inbox, not group/channel history import or a notification
destination. Attachments remain metadata-only unless `download_attachments` is enabled. Telegram
retains updates for a limited time; keep another copy if your instance sleeps.

</template>
<template #cli>

Start with a working instance and a [connected CLI](/guide/connect-cli). The version below targets
Core Host SDK `0.3.x`; check the linked release listing for other Host versions. If already
installed, inspect `inkcre-cli extension get inkcre/telegram` before changing it. Keep credential
files and command output private.

1. Create a dedicated bot with [@BotFather](https://t.me/botfather): send `/newbot`, follow its
   naming prompts, and retain the token. Obtain your own numeric user ID using
   [Telegram Desktop's data export](https://telegram.org/blog/export-and-more): open **Settings →
   Advanced → Export Telegram data**, include personal information, and choose JSON format. In the
   exported JSON, use `personal_information.user_id`, not your `@username` or the bot's ID. Telegram
   may require confirmation from another device or a waiting period.
2. Install and enable the Core Extension:

   ```sh
   inkcre-cli extension install inkcre/telegram --version 0.3.1
   inkcre-cli extension enable inkcre/telegram
   ```

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

4. Send a distinctive text message in a private chat with the bot, then
   [collect the Source ID](/guide/collect). Successfully saved messages receive a 👍 reaction. After
   indexing, search for its text.
5. Add a schedule to forward messages without running the CLI each time. `*/5 * * * *` polls every
   five minutes while Core is awake. Telegram retains updates for a limited time, so a long-sleeping
   instance should not be your only copy.

Use one bot for one Source. This is a capture inbox, not group/channel history import or a
notification destination. Attachments are metadata-only in this example; enable
`download_attachments` when you want their bytes saved too. See the
[Telegram collector](https://github.com/InKCre/core-py/blob/main/extensions/telegram/README.md) and
[published releases](https://registry.inkcre.dev/v1/extensions/inkcre/telegram).

Next: [index and search for a known item](/guide/search), then
[schedule collection](/guide/schedules).

</template>
</InterfaceGuide>
