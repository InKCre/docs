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
4. Keep the generated **Peer ID**. It is this browser's identity; do not reuse Core's Peer ID.
   Choose your language, then select **Save**. No manual database setup is needed.
5. Open **Peers**. Confirm that **This browser** and Core appear with their application versions.
   Use **Refresh** after Core starts if its state has not updated yet.
6. To use the public Extension Registry, select **Edit Config** on **This browser**, set
   `extension_registry_url` to `https://registry.inkcre.dev`, and save.

![Client-web Settings showing the connection fields and browser Peer ID](/images/client-web/settings-overview.png)

_Settings stores this browser's connection and language. Peer-specific configuration lives under
Peers._

![Client-web Peers showing the current browser and Core with their versions and states](/images/client-web/peers-overview.png)

_Peers shows the runtimes connected to this deployment. Edit a Peer when configuration belongs to
that runtime._

The connection belongs to this browser origin. Set up another browser/device separately. An
**Export** includes the URL, Peer ID, JWT secret, and language so another browser can restore this
experience. Keep the file private. It is not a backup of your information.

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

Next: [Choose Your First Source](/guide/first-source).
