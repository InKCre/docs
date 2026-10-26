---
title: Build a Source Extension
description:
  Build an independent Python collector and try its wheel in a Core Host SDK 0.3 test deployment.
---

# Build a Source Extension

This is for Python developers adding an integration, not contributors changing Core. Your Extension
lives in its own repository. It runs inside a matching **Core Host SDK 0.3.x** environment because
Source and graph APIs currently import Core's `app.*` modules. Installing the delivery Toolkit alone
does not provide those runtime APIs.

We will collect one JSON document, store its text, and link it to a Source anchor. Repeating an
unchanged response does not add a new snapshot. This deliberately small example has no OAuth,
pagination, custom Resolver, or UI; it is not a general-purpose JSON importer.

## 1. Prepare an isolated test setup

Use Python 3.12 and a separate [Core deployment](/self-hosted/) with disposable data. Connect the
[CLI](/guide/connect-cli) to that instance and ensure it is running Host SDK 0.3.x. Do not use your
personal information store to experiment with trusted in-process code.

Prepare an HTTP endpoint reachable **from Core** that returns this JSON:

```json
{ "id": "note-1", "text": "Notebook verification: blue heron" }
```

For a local-only experiment, save it as `note.json` in a new folder containing no other files and
serve that folder with `python -m http.server 8765 --bind 127.0.0.1`. Its URL is
`http://127.0.0.1:8765/note.json` only when Core runs on that same machine outside a container. A
remote Core needs an endpoint it can actually reach; use a non-sensitive HTTPS fixture under your
control instead of exposing private directories or assuming your laptop's localhost is remote Core.

## 2. Create your own package

Create this layout in a new project directory:

```text
notebook-extension/
  pyproject.toml
  extensions/
    notebook/
      __init__.py
      source.py
```

Do **not** add `extensions/__init__.py`: `extensions` is a shared namespace package. Before
distributing, replace `yourname` with a namespace you control and choose a unique module/entry-point
name to avoid collisions with other installed Extensions.

Save `pyproject.toml`:

```toml
[build-system]
requires = ["setuptools>=80,<81"]
build-backend = "setuptools.build_meta"

[project]
name = "yourname-inkcre-notebook"
version = "0.1.0"
description = "One-document notebook collector for InKCre"
requires-python = ">=3.12,<3.13"
dependencies = ["httpx>=0.28.1,<0.29", "pydantic>=2.10.6,<3"]

[project.entry-points."inkcre.core.extensions"]
notebook = "extensions.notebook:Extension"

[tool.inkcre-extension]
name = "yourname/notebook"
nickname = "Notebook"
host-sdk = "core-py"
host-sdk-version = ">=0.3.0 <0.4.0"

[tool.setuptools.packages.find]
include = ["extensions.notebook*"]
namespaces = true
```

The product coordinate (`yourname/notebook`), Python project name, and module path serve different
purposes. The entry-point name and Extension's `ext_id` must agree. Declare direct dependencies.
When Core installs the wheel, its Python package installer resolves those dependencies from the
deployment's configured package indexes. Installation can therefore change the shared Core Python
environment or fail on an unavailable or incompatible dependency; test the finalized wheel against
the exact Host environment instead of assuming dependency isolation.

Save `extensions/notebook/__init__.py`:

```python
from app.business.extension.main import EmptyConfig, ExtensionBase


class Extension(ExtensionBase[EmptyConfig], ext_id="notebook", config_cls=EmptyConfig):
    @classmethod
    def _init_sources(cls):
        from .source import Source  # Registers the class when the Host starts it.
```

Import-time registration must not connect to the database or fetch provider data. The Host handles
startup and catalog synchronization. No extra HTTP endpoint or scheduler is needed.

## 3. Implement collection

Save `extensions/notebook/source.py`:

```python
import httpx
from pydantic import BaseModel, ConfigDict, Field, HttpUrl

from app.business.info_base.commands import persist_stars
from app.business.info_base.resolver import TextResolver
from app.business.source import SourceBase, SourceManager
from app.persistence.source.uow import source_uow
from app.schemas.info_base.relation import RelationModel
from app.schemas.job import JobModel


class SourceConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")
    url: HttpUrl


class Note(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    id: str = Field(min_length=1)
    text: str = Field(min_length=1, max_length=100_000)


class Source(SourceBase[SourceConfig], config_cls=SourceConfig):
    """Save changes to one user-selected JSON document as text snapshots."""

    async def collect(self, job: JobModel, config: BaseModel) -> None:
        source_config = await self.get_config()
        url = str(source_config.url)
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(url)
            response.raise_for_status()
        note = Note.model_validate(response.json())
        snapshot = {"url": url, **note.model_dump()}

        async with source_uow() as uow:
            source = await uow.sources.get(self._id, lock=True)
            if source is None:
                raise ValueError("Source was deleted")
            if SourceConfig.model_validate(source.config) != source_config:
                raise ValueError("Source config changed during collection; run again")
            if (source.state or {}).get("last_snapshot") == snapshot:
                return
            anchor = await SourceManager.ensure_block_async(source, uow)
            block = await persist_stars(TextResolver.create_graph(note.text), uow.graph)
            if anchor.id is None or block.id is None:
                raise RuntimeError("Persisted Block has no ID")
            await uow.graph.relations.fetchsert(
                RelationModel(from_=anchor.id, to_=block.id, content="snapshot")
            )
            # shortcut: one snapshot only; use native-ID reconciliation for a multi-item feed.
            source.state = {**(source.state or {}), "last_snapshot": snapshot}
            await uow.sources.save(source)
```

HTTP and input errors fail the Job instead of reporting a false success. Network I/O finishes before
the database transaction. The anchor, text, relation, and state commit together; state is not
advanced if persistence fails. URL participates in snapshot identity so changing the endpoint does
not reuse the old endpoint's state. The built-in text Resolver makes the saved text readable and
indexable.

This is a snapshot collector: a changed text creates another snapshot. Text identity is
content-based, so A→B→A reuses the original A Block and relation instead of creating a third one.
Changing only the response `id` updates Source state but does not add another graph snapshot because
this deliberately small example does not model native identity. It neither reconciles a whole remote
collection nor deletes earlier snapshots. The endpoint is selected by the user, not exposed as a
public URL-fetching API. For a real service, add its authentication, bounded response handling,
native identity, pagination, rate limits, and incremental state according to that service's
contract.

Source configuration is long-lived input, Source state remembers progress, and Job parameters/state
belong to one execution. Use `collect_config_cls` for typed per-run options and
`backfill_config_cls` plus `backfill()` only when you actually implement a historical collection
mode. Keep indexing and organization separate from collection.

## 4. Build and finalize the wheel

In the project directory, create a build environment. The Toolkit is a delivery tool, not a runtime
Source SDK:

```sh
python3.12 -m venv .venv
. .venv/bin/activate
python -m pip install build 'inkcre-extension-toolkit[cli] @ https://github.com/InKCre/ext-reg/releases/download/toolkit-v0.5.0/inkcre_extension_toolkit-0.5.0-py3-none-any.whl'
python -m build --wheel --outdir dist/raw
inkcre-ext python wheel finalize --project pyproject.toml --wheel dist/raw/yourname_inkcre_notebook-0.1.0-py3-none-any.whl --output-dir dist/final
```

On Windows, activate with `.venv\Scripts\Activate.ps1`. If you renamed the project, substitute the
actual wheel filename. Finalization adds the installed `.dist-info/inkcre-extension.json` metadata
required by Core. Keep raw and finalized output separate; ship the finalized wheel.

## 5. Try a private preview without publisher credentials

Save `preview.json` beside `pyproject.toml`:

```json
{
  "schema_version": 1,
  "distributions": [
    {
      "kind": "python",
      "producer": "pyproject.toml",
      "artifact": "dist/final/yourname_inkcre_notebook-0.1.0-py3-none-any.whl"
    }
  ]
}
```

For Core running on the same machine, build and serve the preview in a separate terminal:

```sh
inkcre-ext preview build --inventory preview.json --public-origin http://127.0.0.1:8766 --output dist/registry
```

The generated API uses extensionless paths and supplies `_redirects` rewrites. Plain
`python -m http.server` does not apply them and returns 404. Save this local-only server as
`serve-preview.py` beside `preview.json`, then run `python serve-preview.py`:

```python
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

root = Path("dist/registry")
routes = dict(line.split()[:2] for line in (root / "_redirects").read_text().splitlines())


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        return super().translate_path(routes.get(path.split("?", 1)[0], path))


ThreadingHTTPServer(
    ("127.0.0.1", 8766), partial(Handler, directory=str(root))
).serve_forever()
```

For remote Core, publish **only** the generated `dist/registry` directory to an isolated static
HTTPS origin that honors `_redirects` and `_headers` (or equivalent rules), and use that origin as
`--public-origin`. Keep it available for installation and restart. This facade contains only the
supplied releases; it is not a mirror of the public Registry.

In the terminal with your CLI, inspect `inkcre-cli peer get self` and
`inkcre-cli config get extension.registry`. Record the prior setting (a missing config is normal). A
Peer-level `extension_registry_url` override takes precedence; use a test Peer without an override
or adjust that override. On this **isolated test instance only**, set the deployment Registry
origin, replacing the URL if Core is remote:

```sh
inkcre-cli config replace extension.registry --schema-id extension.registry.config.v1 --input-json '{"extension_registry_url":"http://127.0.0.1:8766"}'
inkcre-cli extension select yourname/notebook --distribution python --version 0.1.0
```

Selecting records this Peer's exact Distribution/version and applies the wheel, which may restart
Core. If the receipt reports `restart_required`, wait until `inkcre-cli connection check` succeeds
again before enabling it:

```sh
inkcre-cli extension enable yourname/notebook
inkcre-cli source types
```

Confirm `extensions.notebook.source.Source` appears. Save `notebook.json`, using the fixture URL
reachable from Core:

```json
{
  "nickname": "Notebook test",
  "config": { "url": "http://127.0.0.1:8765/note.json" }
}
```

```sh
inkcre-cli source create --type extensions.notebook.source.Source --input notebook.json
```

## 6. Verify behavior before distributing

1. [Collect](/guide/collect) using the returned Source ID and wait for the Job to finish.
2. [Index and search](/guide/search) for `Notebook verification: blue heron`; read the text and
   inspect its Source relation.
3. Collect the same fixture again. Confirm no second snapshot was added.
4. Change the fixture's text, collect again, and confirm a new snapshot is readable.
5. Make the fixture return invalid JSON. The Job must fail without advancing Source state; fix the
   fixture and confirm a later run succeeds.

This is a small runnable acceptance journey against your actual wheel and Host, not just an import
test. Do it on the disposable instance before inviting others to install your code. The example does
not provide complete multi-item reconciliation or guarantee ordering of overlapping fetches; avoid
overlapping runs and design that policy before using it as a multi-item collector.

Stop any test Crons, disable the test Extension and cancel this Peer's selection with
`inkcre-cli extension unselect yourname/notebook`, restore the prior Registry configuration (delete
the config only if it did not exist before), and stop the fixture/preview servers when done.
Cancelling selection does not erase shared configuration or collected graph data. For iteration, use
a new release version, disable the target Peer, and restart Core when replacing already-imported
code; do not overwrite published bytes or treat disable/re-enable as Python module reload.

## Deliver your integration

Keep the package in your own repository. The public Registry path requires a namespace and publisher
token issued by its operator; a successful private preview does not grant either one. After
receiving them, create `release.json` from the same project metadata and immutable source revision
used to build the finalized wheel:

```json
{
  "nickname": "Notebook",
  "version": "0.1.0",
  "python": {
    "entry_point": {
      "group": "inkcre.core.extensions",
      "name": "notebook",
      "object": "extensions.notebook:Extension"
    },
    "host_sdk": "core-py",
    "host_sdk_version": ">=0.3.0 <0.4.0",
    "project": "yourname-inkcre-notebook",
    "source_repository": "https://github.com/yourname/notebook-extension",
    "source_revision": "<full-commit-sha>"
  }
}
```

Prepare the Python association, upload the finalized wheel through the Registry's PyPI-compatible
endpoint, and publish that same version. Install Twine in the build environment and provide the
token through environment variables rather than committing it or writing it into a project
configuration:

```sh
python -m pip install twine
export INKCRE_EXTENSION_REGISTRY_URL=https://registry.inkcre.dev
# Inject INKCRE_EXTENSION_REGISTRY_TOKEN through your trusted secret manager.

inkcre-ext prepare-release --namespace yourname --name notebook --distribution python --request release.json
TWINE_REPOSITORY_URL="$INKCRE_EXTENSION_REGISTRY_URL/legacy/" \
  TWINE_USERNAME=__token__ \
  TWINE_PASSWORD="$INKCRE_EXTENSION_REGISTRY_TOKEN" \
  python -m twine upload dist/final/yourname_inkcre_notebook-0.1.0-py3-none-any.whl
inkcre-ext publish-release --namespace yourname --name notebook --distribution python --version 0.1.0
```

Published coordinates and wheel bytes are immutable; repair mistakes with a new version. Users then
install the exact coordinate/version and follow your source-specific setup guide.

For larger collectors, study the
[RSS implementation](https://github.com/InKCre/impl-py/tree/main/extensions/rss) for incremental
reconciliation and the
[Source runtime](https://github.com/InKCre/impl-py/blob/main/app/business/source/main.py) for
current signatures. The
[native distribution contract](https://github.com/InKCre/impl-py/blob/main/docs/40-deployment/first-party-extension-distribution.md)
owns Host installation, dependency admission, restart, and release rules. Pin and test the Host
compatibility you declare; a working example is not a promise that every `app.*` API is stable.
