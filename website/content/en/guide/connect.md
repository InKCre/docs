---
title: Connect to Your Instance
outline: false
description: Use the Web app yourself, or connect a trusted Agent through the CLI.
---

# Connect to Your Instance

Use **client-web** for your own day-to-day setup and reading. The **CLI** is primarily an interface
for your trusted Agent. You do not need to configure every interface before starting. The selector
on these guides changes the instructions, not your instance, and keeps your choice while navigating
the site.

<InterfaceGuide>
<template #web>

## Connect the Web app

1. Retain your deployment's **PostgREST URL**, private **JWT secret**, and Core URL.
2. Open [Web app Settings](https://app.inkcre.dev/settings). Only enter your secret into a Web app
   you trust: it grants full deployment authority, not a limited app session.
3. Enter the PostgREST base URL in **PostgreSQL REST URL**, and the secret in **JWT Secret**. Do not
   substitute the Core URL for PostgREST.
4. Keep the generated **Client ID**. It is this browser's identity; do not reuse Core's Peer ID.
   Current Settings registers the browser when you save, so no manual SQL insert is needed.
5. Set **Extension Registry URL** to `https://registry.inkcre.dev`, then choose **Save**. Check the
   **Clients** list for your Core instance and its online state. If it is offline, choose **Wake**
   for that client, then refresh before trying a delegated operation.

![Client-web Settings showing the browser Client ID, Registry URL, and Clients section](/images/client-web/settings-overview.png)

_Settings keeps this browser's identity, Registry URL, and discovered clients together. Labels
follow the language selected in client-web._

The connection belongs to this browser origin. Set up another browser/device separately. An
**Export** excludes the secret and is not a backup of your information.

**Checkpoint:** Settings saves successfully and you can open **Sources**. An empty list is normal
for a new instance; a connection error is not an empty list.

</template>
<template #cli>

## Connect your Agent or terminal

Follow [Connect the CLI](/guide/connect-cli) to install `inkcre-cli`, configure a private named
connection, and verify access. Give that connection only to an Agent you trust with instance
authority. Its model provider may receive the information it reads.

You can ask your Agent to perform a specific operation from a guide, then inspect the resulting
Source or Job in the Web app. Do not share connection files or JWT secrets in public conversations.

</template>
</InterfaceGuide>

Next: [Collect Your First Source](/guide/first-source).
