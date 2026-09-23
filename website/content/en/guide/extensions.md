---
title: Prepare an Extension
outline: false
description: Install a collector and enable it on the Peer that will run it.
---

# Prepare an Extension

Start with a [connected interface](/guide/connect). Your source guide supplies an Extension name,
version, and Source type. An Extension is installed once in the deployment; enabled Peers share its
version and configuration. Only install code you trust with the host's authority. Do not change a
working installation merely to match an example.

<InterfaceGuide>
<template #web>

## Prepare the Core collector

1. Open **Extensions** in the Web app and choose **Browse Registry**. Search for the Extension named
   in your source guide, open its details, and select that guide's exact version. The Registry page
   shows its Core and Web distributions. Choose **Install in** your Web app, check the Extension and
   version on the returned page, then choose **Install**. This does not require a Peer selection or
   start the Extension.
2. Back in **Extensions**, under **Run on Peer**, select your online **Core** Peer; the selector
   shows each Peer's name and application version. Turn on the Extension's switch. A Python
   collector such as RSS runs on Core, not **This browser**.
3. If the guide requires Extension-wide settings, open **Edit Config** and save them. Source account
   settings belong in **Sources**, unless the guide says otherwise.
4. Open **Sources**, create a Source, and check that its **Type** is available. An installed entry
   alone does not prove that the collector is running.

If enablement fails, check that the selected Peer is online and that this release includes a
compatible distribution for it. Do not switch to **This browser** as a workaround for a Python-only
collector.

For an existing installation at another version, use **Change Version** only after checking both
Hosts and disabling every Peer using it. Version and configuration are shared across the deployment.

## Browser Extensions and setup wizards

A browser Extension adds capabilities such as content rendering or a **Setup** wizard. For a release
with compatible Python **and** browser distributions, enable it on Core, then select **This
browser** and enable it there too. Open **Setup** when that button appears.

Do not install a different shared version to obtain a wizard without checking both Hosts. The
[Twitter guide](/guide/sources/twitter) walks through its paired Core and browser setup.

</template>
<template #cli>

## Install and enable on Core

Use the name and version in your source guide. For example, RSS on Core Host SDK `0.3.x`:

```sh
inkcre-cli extension install inkcre/rss --version 0.2.1
inkcre-cli extension enable inkcre/rss
inkcre-cli source types
```

For an existing installation, inspect `inkcre-cli extension get inkcre/rss` first. Version changes
affect all Peers using the installation. Configuration and command output may contain credentials;
keep them private.

</template>
</InterfaceGuide>

Return to [your source's guide](/guide/sources) for its settings and first-run checkpoint.
