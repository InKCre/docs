---
title: Memos-Compatible Capture
outline: false
description: Write notes into InKCre from a supported Memos client.
---

# Memos-Compatible Capture

Start with a [connected interface](/guide/connect). Choose Web for your own setup, or CLI / Agent
for terminal instructions.

<InterfaceGuide>
<template #web>

## Configure in the Web app

This is a write-in capture endpoint, **not** an importer for an existing Memos server. It implements
a bounded Memos `0.29.1` API subset; the previously accepted client is MoeMemos Android `2.0.4`.

1. Ask your operator or Agent to install `inkcre/memos` version `0.2.0` for Core Host `0.2.x`,
   following [Prepare an Extension](/guide/extensions). Configure it before enabling it.
2. Generate a dedicated token in your password manager: the literal prefix `memos_pat_` followed by
   exactly **32 random ASCII letters or digits**. Save it securely. Never use your JWT secret.
3. Open **Extensions → inkcre/memos → Edit Config** and save:

```json
{ "personal_access_token": "YOUR-GENERATED-MEMOS-PAT" }
```

4. Select Core under **Control Extension on Client** and enable Memos.
5. In the supported Memos client's server/account setup, enter `https://YOUR-CORE-HOST/memos` and
   the dedicated token. Do not use PostgREST or append `/api/v1`.
6. Write a distinctive note, refresh the client, and reopen it. Then
   [index and search](/guide/search) for the same text in InKCre.

There is no Source to create or collection schedule: the client writes notes directly. Index
maintenance remains separate. Other client versions may use unsupported endpoints.

To disconnect, remove the account from the client and rotate or clear the Extension's token.
Disabling the Core Extension withdraws its routes; neither action erases saved notes.

</template>
<template #cli>

This is a capture endpoint for notes you write, **not** an importer for an existing Memos server. It
implements a bounded Memos `0.29.1` API subset; the previously accepted client is MoeMemos Android
`2.0.4`. Other clients or versions may use unsupported endpoints.

## 1. Configure the Extension

Start with a [connected CLI](/guide/connect-cli) and a Core HTTPS URL. Install the Core Host `0.2.x`
release, or inspect `inkcre-cli extension get inkcre/memos` if already installed:

```sh
inkcre-cli extension install inkcre/memos --version 0.2.0
```

Generate a dedicated PAT and save it in your password manager. Its required format is `memos_pat_`
followed by exactly 32 ASCII letters or digits. For example, run locally:

```sh
python -c 'import secrets, string; print("memos_pat_" + "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32)))'
```

In a private folder, save `memos.json`, replacing the placeholder with that PAT:

```json
{
  "personal_access_token": "YOUR-GENERATED-MEMOS-PAT"
}
```

```sh
inkcre-cli extension config update inkcre/memos --input memos.json
inkcre-cli extension enable inkcre/memos
```

The update response can contain the PAT; keep both it and the file private. This token authorizes
the Memos interface, not general Core administration. Never substitute `JWT_SECRET`.

## 2. Connect the client and write a note

1. In the supported client's server/account setup, use `https://YOUR-CORE-HOST/memos` as the server
   address and the PAT as its access token. Do not use your PostgREST URL or append `/api/v1`.
2. Write a short note with distinctive text, such as “Memos capture verification orchid”.
3. Refresh the client's list and reopen the note to confirm it was saved.
4. [Maintain the index and search](/guide/search) for the same text from InKCre.

There is no `source create` or collection Cron for this path: saving in the client sends the note
directly to InKCre. Schedule index maintenance if you want new notes searchable without a manual
run. The supported subset includes notes, attachments, and comments, not full Memos administration,
social features, or browsing the entire InKCre info-base.

## Disconnect or troubleshoot

If login fails, verify the `/memos` server prefix, PAT format, and running Core Extension. An
unsupported client endpoint can fail even with valid credentials; use the pinned client/API pairing
before diagnosing the instance itself.

Remove the account from the client and rotate or clear `personal_access_token` to revoke the old
credential. Disable the Extension to withdraw its routes. These actions do not erase stored notes.

See the [release listing](https://registry.inkcre.dev/v1/extensions/inkcre/memos) and the
[Memos runtime contract](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/memos-extension.md).

</template>
</InterfaceGuide>
