---
title: Publish a Web Extension
description: Package a Module Federation Extension and publish it from your GitHub repository.
---

# Publish a Web Extension

The Web App installs Module Federation Extensions from your public GitHub repository. Each version
records its build and SDK requirements in one GitHub Release. Add the `inkcre-extension` repository
topic for discovery, and keep setup instructions in `docs/user/` beside the Extension's
`package.json`. Users can also install by entering the repository URL.

## Choose a release format

| Format     | Use it when                                                                         | What gets published                                                                                                                                     |
| ---------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `manifest` | The Extension has multiple assets or benefits from loading resources on demand.     | A ZIP in the Release and a manifest at an exact, browser-readable static URL. The publishing tool serves the files from your repository using jsDelivr. |
| `script`   | The Extension fits in one modest download, including styles and other build assets. | One classic JavaScript attachment in the Release. The Web App loads that attachment directly.                                                           |

Choose one format per version. To switch formats, publish a new version. A publisher with its own
static origin can use the `manifest_url` path in the
[release contract](https://github.com/InKCre/docs/blob/main/20-product-tdd/extension-release-and-installation.md).

## Build and publish

Use the Extension's normal build to produce a directory containing `mf-manifest.json`, its remote
entry and the runtime files they reference. The
[Mail Vite configuration](https://github.com/InKCre/impl-ts/blob/main/extensions/mail/vite.config.ts)
shows a build with the root `.` exposure and shared Host SDK. Declare the identity and SDK range in
the same `package.json` used by the build:

```json
{
  "name": "my-notes-extension",
  "version": "0.1.0",
  "inkcre": {
    "name": "yourname/notes",
    "module_federation": { "host_sdk_version": ">=0.4.2 <0.5.0" }
  }
}
```

Save a workflow in `.github/workflows/publish-extension.yml`. The example uses npm for the build.
Keep the install and build commands you use in your own repository if they differ.

```yaml
name: Publish Web Extension
on: workflow_dispatch
permissions:
  contents: write
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: InKCre/impl-ts/.github/actions/publish-extension@a672aae934652d2cfbb3a77aa27e218c2813a123
        with:
          package: package.json
          artifact-directory: dist/web
          format: manifest
          token: ${{ github.token }}
```

Set `format: script` for the single-attachment route. The workflow uses your repository token to
publish to that same repository. The tool derives the version and Release tag from `package.json`,
binds the Release to the source commit, and uses that commit to locate `docs/user/`. Run the
workflow on the commit that you want to publish.

## Check a build locally

Run the publish tool in preparation mode to inspect the attachment and Release description without a
publishing token. Clone the tool once, check out the same ref used by the workflow, and install its
locked dependencies.

```sh
git clone https://github.com/InKCre/impl-ts.git ../inkcre-publisher
git -C ../inkcre-publisher checkout a672aae934652d2cfbb3a77aa27e218c2813a123
npm ci --prefix ../inkcre-publisher/.github/actions/publish-extension --ignore-scripts
node ../inkcre-publisher/.github/actions/publish-extension/cli.mjs \
  --repository yourname/notes-extension --package package.json \
  --artifact-directory dist/web --format script --prepare-only --output /tmp/notes-release
```

Run the command from your Extension's checked-out repository. Use a fresh output directory and
change `--format` to `manifest` to inspect the ZIP and static tree instead. For script releases, the
whole attachment is downloaded before the Web App can start the Extension. Choose `manifest` if the
script output is large or the build needs separately fetched assets.

After publishing, open **Extensions → Browse GitHub repositories**, enter your repository URL and
choose the exact Web release. Install it, enable it, and reopen the app to verify that it loads the
same version.
