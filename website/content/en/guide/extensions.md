---
title: Prepare an Extension
outline: false
description: Install a collector and enable it on the Peer that will run it.
---

# Prepare an Extension

Start with a [connected interface](/guide/connect). Your source guide supplies an Extension name,
version, and Source type. Extension identity and configuration are shared, but each Peer selects its
own native Distribution and exact version. Only install code you trust with the host's authority. Do
not change a working installation merely to match an example.

<InterfaceGuide>
<template #web>

## Prepare the Core collector

1. Open **Extensions** in the Web app and choose **Browse Registry**. Search for the Extension named
   in your source guide and select the Python Distribution's exact version. Choose **Install in**
   your Web app. On the returned page, verify the coordinate/version, select the online **Core** in
   **Peer**, and choose **Install**. This selects a version for that Peer; it does not enable it.
2. Back in **Extensions**, find Core's row under **Used on Peers**. Wait for any managed restart,
   refresh its status, then choose **Enable** in that row. A Python collector such as RSS runs on
   Core, not **This browser**.
3. If the guide requires Extension-wide settings, open **Edit Config** and save them. Source account
   settings belong in **Sources**, unless the guide says otherwise.
4. Open **Sources**, create a Source, and check that its **Type** is available. An installed entry
   alone does not prove that the collector is running.

If enablement fails, check that the affected Peer is online and that this release includes a
compatible distribution for it. Do not choose **This browser** as a workaround for a Python-only
collector.

For an existing selection, use **Change Version** or **Remove** in the target Peer's row after
disabling it. Other Peers retain their selections; shared configuration and collected information
remain. **Documentation** opens links for that Peer's exact native release.

## Browser Extensions and setup wizards

A browser Extension adds capabilities such as content rendering or a **Setup** wizard. For a release
with compatible Python **and** browser distributions, select a compatible Module Federation release
in **This browser**'s row and enable it there. Open **Setup** when that button appears.

Python and Module Federation versions are independent; equal version numbers are not a compatibility
test. Check each Host's SDK range and the Extension's shared business contract. The
[Twitter guide](/guide/sources/twitter) walks through its paired Core and browser setup.

</template>
<template #cli>

## Select and enable on Core

Use the name and version in your source guide. For example, RSS on Core Host SDK `0.3.x`:

```sh
inkcre-cli extension select inkcre/rss --distribution python --version 0.2.1
# If selection reports a restart, wait for connection check to succeed before enabling.
inkcre-cli extension enable inkcre/rss
inkcre-cli source types
```

For an existing selection, inspect `inkcre-cli extension status inkcre/rss` first. Use
`--peer PEER_ID` to target another Peer; omission targets the connected Core. Disable that Peer
before changing or removing its selection with `extension unselect`. Configuration and command
output may contain credentials; keep them private.

</template>
</InterfaceGuide>

Return to [your source's guide](/guide/sources) for its settings and first-run checkpoint.
