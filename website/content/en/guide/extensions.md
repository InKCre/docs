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

1. Open **Extensions**. In **Control Extension on Client**, select your online **Core** client.
2. Look for the name from your source guide. If it is absent, enter its **Extension Name** and exact
   **Version** in **Install New Extension**, then select **Install Extension**. The selected Core
   validates the Python release; Python-only collectors such as RSS do not need a browser package.
3. Turn on the Extension's switch while Core is still selected. Installation alone does not start
   it. Enabling only **This browser** does not start a Core collector.
4. If the guide requires Extension-wide settings, open **Edit Config**, enter its configuration
   object, and save. Source account settings belong in **Sources**, unless the guide says otherwise.
5. Open **Sources**, create a Source, and check that its **Type** is available. A listed
   installation alone does not prove that the collector is running.

![Client-web Extensions showing installation fields, client selection, and enabled Extensions](/images/client-web/extension-management.png)

_Select Core before installing or enabling a collector; select This browser only for browser-side
capabilities._

An offline client cannot validate an installation. If installation fails, keep your entered name and
version, read the error, and check the selected client and release compatibility before trying
again. An older Core may need an update to support installation through this Web control. Do not
switch to **This browser** as a workaround for a Python-only collector.

For an existing installation at another version, use **Change Version** only after checking both
Hosts and disabling every client using it. Version and configuration are shared across the instance.

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
affect all clients using the installation. Configuration and command output may contain credentials;
keep them private.

</template>
</InterfaceGuide>

Return to [your source's guide](/guide/sources) for its settings and first-run checkpoint.
