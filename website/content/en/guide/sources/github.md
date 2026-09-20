---
title: GitHub Stars and Lists
description: Connect your GitHub saves to InKCre.
---

# GitHub Stars and Lists

Start with a working instance and a [connected CLI](/guide/connect-cli). The version below targets
Core Host `0.2.x`; check the linked release listing for other Host versions. If already installed,
inspect `inkcre-cli extension get inkcre/github` before changing it. Keep credential files and
command output private.

1. Create a personal access token for the account whose Stars and Lists you want to collect,
   following
   [GitHub's token instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
   Its account and permissions determine which data is visible.
2. Enable the Extension:

   ```sh
   inkcre-cli extension install inkcre/github --version 0.3.0
   inkcre-cli extension enable inkcre/github
   ```

3. Save `github.json` with your token:

   ```json
   {
     "nickname": "My GitHub saves",
     "config": { "github_token": "YOUR-GITHUB-TOKEN" }
   }
   ```

   ```sh
   inkcre-cli source create --type extensions.github.stars.Source --input github.json
   ```

4. Collect the returned Source ID using [Run a Collection](/guide/collect). After indexing, search
   for a repository you starred. Each run synchronizes current Stars and Lists; it is not a code
   backup or a full GitHub activity archive.

See the [GitHub collector](https://github.com/InKCre/core-py/blob/main/extensions/github/README.md)
and [published releases](https://registry.inkcre.dev/v1/extensions/inkcre/github).

Next: [index and search for a known item](/guide/search), then
[schedule collection](/guide/schedules).
