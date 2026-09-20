# Extension Documentation Hosting

## Purpose And Ownership

This contract defines how Extension authors, Registry, developer tooling, and consuming Hosts
exchange hosted documentation. Registry owns the executable HTTP contract and hosting mechanics;
this document owns the boundaries that those implementations must preserve.

Authors build a static site with their chosen tools. Registry accepts and serves the resulting
files without running builds, interpreting document structure, or rewriting HTML and JavaScript.
Navigation, search, localization, themes, and interface-specific instructions belong to the
author's site. Documentation is not an executable Extension Distribution and cannot make a Release
installable by itself.

## Identity And Document Ownership

A documentation set belongs to one Extension name, one exact Release version, and one scope:

| Scope | Meaning | First-party source owner |
| --- | --- | --- |
| `global` | Extension-wide concepts, workflows, and limits across channels | `core-py` |
| `python` | Python Distribution operation and configuration | The Python producer in `core-py` |
| `module-federation` | Web Distribution interfaces and behavior | The MF producer in `client-web` |

These are separate, optional sites, not inheritance or override layers. Registry does not merge
them. A channel-specific set requires the corresponding Distribution association on that Release;
global documentation does not require a Web Distribution. Web, CLI, and Agent instructions are
reader interfaces, not additional Distribution channels.

First-party sites share a template maintained in `InKCre/docs`, with producer repositories using
an explicit template revision. This does not require ecosystem authors to adopt that template or
its static-site generator. The main documentation site owns application onboarding, self-hosting,
and cross-Extension guidance; detailed Extension instructions retain one source owner rather than
being copied into each consuming site.

## Discovery And Consumption

Registry exposes documentation discovery separately from Release installation metadata. Consumers
ask their configured Registry for the exact installed Release and receive the available scopes,
stable entry addresses, current content identities, update times, and publication provenance.
Adding documentation must not invalidate existing strict Release consumers.

An absent scope is genuinely absent. Consumers may explicitly offer global documentation instead
of a missing channel site, but must not silently substitute another scope or version. Page paths
inside a site remain an agreement between its author and consumers, not Registry-defined content
semantics. Consumers follow Registry-provided entry addresses rather than constructing content
hostnames or assuming documentation shares the management origin.

## Publication And Corrections

Publishing a set uploads a complete static bundle and identifies its entry file. Registry validates
the bundle's paths, entry, file types, and resource bounds; it does not accept server-side execution
or author-defined server configuration. Detailed archive, routing, MIME, and error contracts belong
to Registry's executable API and local documentation.

Namespace publication authority also controls that namespace's documentation. Creating a set
requires a conditional create; replacing it requires the observed current entity tag. Only after
all files are available may Registry atomically move that set's entry to the new snapshot. A failed
upload or conflicting replacement leaves the previous entry intact. Clients resolve uncertain
responses by reading the resulting content identity before retrying the same candidate.

Documentation can be corrected without a new Extension Release. There is no separate documentation
semantic version, automatic inheritance between Releases, or many-to-many applicability mapping.
Updating one scope does not update another or mutate Python/MF artifacts. Snapshot content is
immutable; its identity serves integrity and resource consistency, not a second author-managed
version scheme.

Previously published snapshots remain available while their owning Release permits public reads,
so an already opened page can finish loading its original resources. Each public snapshot remains
bound to its exact Release and scope even when underlying byte storage is deduplicated.

## Static Content Boundary

Each snapshot is served at the root of its own content origin, separate from Registry management
and from other snapshots. A stable Release/scope entry selects the current snapshot; navigation and
assets within that site continue to use that snapshot. This prevents mixed-version assets and
separates script, browser storage, and Service Worker authority. Separate URL directories on one
origin do not satisfy this boundary.

Content origins do not expose publication APIs or receive Registry publication credentials or
shared authentication cookies. Registry controls response headers and MIME handling; uploaded
files cannot supply server headers or override host routing. Registry UI must not execute author
content within its management origin, and links to hosted sites sever opener access.

The serving topology must support root-relative static assets without rewriting the author's build.
When an author needs an absolute hostname during a build, tooling may reserve an opaque snapshot
address before computing the final content digest. An address can never be rebound to different
bytes. Concrete domain, DNS, TLS, and storage deployment choices remain Registry-owned.

## Release Lifecycle

Documentation may be prepared alongside a preparing Release, but preparing content is not public.
Published Releases expose their documentation normally. Yanked Releases retain exact-version
documentation, and Registry entry surfaces identify that withdrawal; documentation corrections do
not restore the Release's recommendation or installability.

Blocked Releases expose neither discovery, stable entries, nor current or historical snapshot
files. Publishers cannot bypass a block by correcting documentation. Lifecycle checks apply before
cache revalidation, and private object storage must not offer an unguarded public bypass.

These rules govern new network responses, not copies already downloaded by a reader or stored by
an author's Service Worker. Hosting does not promise remote deletion of offline content. First-party
templates do not enable offline Service Workers.
