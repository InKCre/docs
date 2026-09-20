---
title: Prepare an Extension
outline: false
description: Install a collector and enable it on the client that will run it.
---

# Prepare an Extension

Start with a [connected interface](/guide/connect). Your source guide supplies an Extension name, an
exact compatible version, and its Source type. An Extension is installed once in the deployment;
enabled clients share that version and configuration. Only install code you trust with the host's
authority. Do not change a working installation merely to match an example.

<InterfaceGuide>
<template #web>

## Prepare the Core collector

1. Open **Extensions** and look for the name from your source guide.
2. If it is absent, ask your operator or trusted Agent to install the guide's exact **Core** release
   using the CLI instructions. This is currently a one-time prerequisite: **Install New Extension**
   uses the browser Host and requires a browser distribution. Selecting Core below it does not turn
   that form into a Python-package installer. RSS, for example, has only a Python distribution.
3. Refresh the page. In **Control Extension on Client**, select your online **Core** client, then
   turn on the Extension's switch. Enabling only **This browser** does not start a Core collector.
4. If the guide requires Extension-wide settings, open **Edit Config**, enter its configuration
   object, and save. Source account settings belong in **Sources**, unless the guide says otherwise.
5. Open **Sources**, create a Source, and check that its **Type** is available. A listed
   installation alone does not prove that the collector is running.

## Browser Extensions and setup wizards

A browser Extension adds capabilities such as content rendering or a **Setup** wizard. For a release
with compatible Python **and** browser distributions, enable it on Core, then select **This
browser** and enable it there too. Open **Setup** when that button appears.

Do not install a different shared version to obtain a wizard without checking both Hosts. The
[Twitter guide](/guide/sources/twitter) explains the currently published version mismatch.

</template>
<template #cli>

## Install and enable on Core

Use the name and version in your source guide. For example, RSS on Core Host `0.2.x`:

```sh
inkcre-cli extension install inkcre/rss --version 0.2.0
inkcre-cli extension enable inkcre/rss
inkcre-cli source types
```

For an existing installation, inspect `inkcre-cli extension get inkcre/rss` first. Version changes
affect all clients using the installation. Configuration and command output may contain credentials;
keep them private.

</template>
</InterfaceGuide>

Return to [your source's guide](/guide/sources) for its settings and first-run checkpoint.
