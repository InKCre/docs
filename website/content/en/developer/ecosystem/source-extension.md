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
purposes. The entry-point name and Extension's `ext_id` must agree. Declare direct dependencies;
Core checks them against its existing environment and will not fetch arbitrary missing dependencies
while enabling your Extension. A new dependency may require a custom Core image.

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
            # ponytail: remembers one snapshot; use native-ID reconciliation for a multi-item feed.
            source.state = {**(source.state or {}), "last_snapshot": snapshot}
            await uow.sources.save(source)
```

HTTP and input errors fail the Job instead of reporting a false success. Network I/O finishes before
the database transaction. The anchor, text, relation, and state commit together; state is not
advanced if persistence fails. URL participates in snapshot identity so changing the endpoint does
not reuse the old endpoint's state. The built-in text Resolver makes the saved text readable and
indexable.

This is a snapshot collector: a changed response creates another snapshot; returning to older text
can create another one too. It neither reconciles a whole remote collection nor deletes earlier
snapshots. The endpoint is selected by the user, not exposed as a public URL-fetching API. For a
real service, add its authentication, bounded response handling, native identity, pagination, rate
limits, and incremental state according to that service's contract.

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
python -m pip install build 'inkcre-extension-toolkit[cli] @ https://github.com/InKCre/ext-reg/releases/download/toolkit-v0.2.1/inkcre_extension_toolkit-0.2.1-py3-none-any.whl'
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
python -m http.server 8766 --bind 127.0.0.1 --directory dist/registry
```

For remote Core, publish **only** the generated `dist/registry` directory to an isolated static
HTTPS origin you control and use that origin as `--public-origin`. Keep it available for
installation and restart. This facade contains only the supplied releases; it is not a mirror of the
public Registry.

In the terminal with your CLI, inspect `inkcre-cli peer get self` and
`inkcre-cli config get extension.registry`. Record the prior setting (a missing config is normal). A
Peer-level `extension_registry_url` override takes precedence; use a test Peer without an override
or adjust that override. On this **isolated test instance only**, set the deployment Registry
origin, replacing the URL if Core is remote:

```sh
inkcre-cli config replace extension.registry --schema-id extension.registry.config.v1 --input-json '{"extension_registry_url":"http://127.0.0.1:8766"}'
inkcre-cli extension install yourname/notebook --version 0.1.0
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

Stop any test Crons, disable/uninstall the test Extension, restore the prior Registry configuration
(delete the config only if it did not exist before), and stop the fixture/preview servers when done.
Removing the Extension does not itself erase collected graph data. For iteration, use a new release
version, disable all enabled Peers, and restart Core when replacing already-imported code; do not
overwrite published bytes or treat disable/re-enable as Python module reload.

## Deliver your integration

Keep the package in your own repository. To distribute through a Registry, obtain permission for
your namespace, prepare the exact release association, upload the finalized wheel, and publish the
release using the [Extension Toolkit](https://github.com/InKCre/ext-reg/tree/main/toolkit). Users
then install your exact coordinate/version and follow your source-specific setup guide. The static
preview is a development path, not authorization to publish to `registry.inkcre.dev`.

For larger collectors, study the
[RSS implementation](https://github.com/InKCre/core-py/tree/main/extensions/rss) for incremental
reconciliation and the
[Source runtime](https://github.com/InKCre/core-py/blob/main/app/business/source/main.py) for
current signatures. The
[native distribution contract](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/native-extension-distribution.md)
owns Host installation, dependency admission, restart, and release rules. Pin and test the Host
compatibility you declare; a working example is not a promise that every `app.*` API is stable.
