---
title: Collect Your First Source
description: Install the RSS collector and collect your first feed.
---

# Collect Your First Source

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

3. Collect it. Replace `42` with your Source ID:

   ```sh
   inkcre-cli source collect 42 --input-json '{}'
   ```

4. The response contains a **Job ID**, different from the Source ID. Replace `17` with it:

   ```sh
   inkcre-cli job wait 17 --for 30s
   ```

   Look for `status: finished`. If still `pending` or `running`, observe again rather than creating
   another collect job. If `failed`, inspect `inkcre-cli job get 17 --json` and its diagnostics.
   Ending observation does not stop the Job.

**Checkpoint:** the collection Job finished. A feed exposes only what its publisher currently
provides; success does not mean its entire historical archive was imported.

Next: [Find what you saved](/guide/search).
