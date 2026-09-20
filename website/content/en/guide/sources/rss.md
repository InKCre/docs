---
title: RSS and Atom
description: Install the RSS collector and collect your first feed.
---

# RSS and Atom

Before you start, [connect the CLI](/guide/connect-cli) to your instance.

Choose a publication you already read and copy its **RSS or Atom feed URL**. Its normal homepage URL
is not usually a feed URL. Look for an RSS/Subscribe link on the publication.

## Enable the collector

Install the RSS Extension on Core, then enable it:

```sh
inkcre-cli extension install inkcre/rss --version 0.2.0
inkcre-cli extension enable inkcre/rss
inkcre-cli source types
```

Version `0.2.0` is a published Python release for Core Host `0.2.x`. For a different Host version,
check the [RSS release listing](https://registry.inkcre.dev/v1/extensions/inkcre/rss) for a
published release with a compatible `python.host_sdk_version`. Do not guess a version or use
`latest`. If already installed, inspect `inkcre-cli extension get inkcre/rss` before changing it.

The type list should contain `extensions.rss.rss.Source` and `extensions.rss.atom.Source`. The Web
app's Extensions switch controls its browser runtime; it does not enable this Core collector.

## Add and run the source

1. Create `feed.json` in your local working folder:

   ```json
   {
     "nickname": "My first feed",
     "config": {
       "feed_url": "https://YOUR-PUBLICATION/FEED",
       "fetch_full_text": false,
       "download_enclosures": false
     }
   }
   ```

   Replace the URL. These first-run settings collect feed content without extra article fetches or
   attachment downloads.

2. Create the Source, choosing the matching feed format:

   ```sh
   inkcre-cli source create --type extensions.rss.rss.Source --input feed.json
   ```

   For Atom, use `extensions.rss.atom.Source`. Record the returned Source `id`.

3. [Run a Collection](/guide/collect) using that Source ID. The guide shows the collection command,
   how to wait for its separate Job ID, and what to inspect if it fails.

**Checkpoint:** the collection Job finished. A feed exposes only what its publisher currently
provides; success does not mean its entire historical archive was imported.

Next: [Find what you saved](/guide/search), then [schedule collection](/guide/schedules).
