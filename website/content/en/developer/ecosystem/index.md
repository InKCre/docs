---
title: Ecosystem Developers
description: Add integrations to InKCre without contributing to its core implementation.
---

# Ecosystem Developers

Build an integration for your own workflow or distribute it to other InKCre users. You do not need
to contribute it to the Core repository. Start with the boundary your integration needs:

| Goal                                               | Integration path                                                                                                              |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Collect from a service InKCre does not support yet | [Build a Source Extension](/developer/ecosystem/source-extension)                                                             |
| Ship a browser Extension from your own repository  | [Publish a Web Extension](/developer/ecosystem/publish-web-extension)                                                         |
| Use existing information from ChatGPT              | [Connect the MCP Sink](/guide/sinks/chatgpt)                                                                                  |
| Build a new runtime around the shared info-base    | Read the [Peer architecture](/developer/architecture); this requires the admitted database protocol, not arbitrary SQL access |
| Change InKCre's own runtime or product behavior    | Follow [Contributing](/developer/contributing)                                                                                |

## What an Extension supplies

A Source contributes Collection by mapping external information into the info-base. A Resolver
derives use-facing meaning from stored content and required context. A Sink exposes capabilities to
another tool. An Extension packages one or more capabilities for a compatible Host; not every
integration needs all three or a custom browser interface.

A Peer selects an exact Extension distribution and version and records whether it should be enabled.
Python uses a wheel with an `inkcre.core.extensions` entry point. Browser Extensions have their own
Module Federation builds and can publish either a manifest with separate assets or a single script.

The Source tutorial targets **Core Host SDK 0.3.x**. Its Python programming interfaces currently
import Core modules; they are not an independent, universally stable Source SDK. The Extension
Toolkit builds delivery metadata and preview registries; it does not run collectors or replace Core.

## Trust and delivery

An admitted Extension is trusted in-process code, not sandboxed user content. A malicious package
could access the runtime's information and credentials. Users must review what they install;
Registry publication is not proof of isolation. Use a separate test deployment and non-sensitive
fixtures during development, with its own database and credentials.

Package identity, Host compatibility, dependencies, and immutable releases are part of delivering a
usable integration. Keep your own package, tests, release history, and user setup guide in your
repository. You can publish a Web Extension through GitHub Releases using your repository token. If
you use a Registry for distribution, its operator grants namespace and publishing access.

Continue with [Build a Source Extension](/developer/ecosystem/source-extension).
