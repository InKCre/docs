# Semantic Retrieval And Peer Capability Contract

## Purpose

Define the shared semantics for semantic retrieval, the minimum focal-block organization
path that improves its granularity, and synchronous capability delegation between
heterogeneous runtime Peers. Unit repositories still own framework classes, route mounting,
database queries, scheduler wiring, and provider-specific configuration.

## Information And Derived Authority

```text
Block + Resolver text --------+
                              +-> Embedding Profile -> derived records -> ranked retrieval
directed Relation projection -+
```

- Blocks and Relations remain information authority. Retrieval returns those existing
  entities with score metadata; it does not create transient chunks or generated answers.
- An AI provider names one protocol/dialect configuration. An AI model names one
  provider-native model and its effective typed capabilities. An embedding profile names one
  mutable vector-space contract: model plus required dimensions.
- Block/Relation embedding records belong to exactly one profile and are rebuildable
  application support. A deployment config may select a default profile, while an individual
  request may select another explicitly.
- Editing or deleting a profile may leave an explicitly detectable dangling deployment
  selection. The use owner validates that reference when executing; generic configuration
  mechanics do not take over the profile lifecycle.

## Semantic Projection

- A Block participates only through its exact Resolver's text projection. A retrieval owner
  must not fall back to reading raw `block.content`, even when that value happens to be text.
- A Resolver also provides a bounded Block-local label. The label identifies its friendly
  semantic kind and a concise name; it does not traverse relations or materialize graph state.
- A Relation's input expresses direction as `from-label`, relation payload, and `to-label`.
  Relation payload alone is not treated as the complete meaning, and Resolver IDs are not
  injected into the semantic text.
- Unsupported or meaningless projection makes that candidate unavailable. It does not stop
  the rest of a maintenance scan and does not become authored empty content.

## Maintenance And Freshness

- Candidate maintenance is explicit and separate from retrieval. It scans bounded,
  deterministic pages, projects current candidates, calls the embedding provider outside a
  long database transaction, and writes only a complete valid provider batch.
- Retrieval never repairs missing or stale records as a hidden read effect.
- A Block record is compatible only when its profile, dimension, Block row, and record
  timestamps agree. A Relation record additionally depends on the two endpoint Block row
  timestamps.
- These checks are best-effort database-row freshness. Storage-backed bytes may change
  without updating a Block row, so the contract does not claim universal content freshness.
- Periodic execution may call the same maintenance operation, but it does not create a second
  indexing path, generic job table, retry contract, or dirty-state authority.

## Ranked Retrieval

- A natural-language query uses one explicit or deployment-default embedding profile.
- Local execution embeds the query, performs exact cosine comparison against fresh compatible
  Block and Relation records, merges both entity kinds into one stable global order, and
  applies the caller's small result bound, optional threshold, and entity-kind filter.
- The result contains the selected profile, metric, real entities, and scores. MVP has no
  pagination, ANN/HNSW index, cross-profile fusion, answer generation, or Chat product
  behavior.
- Quality acceptance uses graph state produced through ordinary source, storage, resolver,
  organization, and persistence boundaries. Human-readable aliases remain test-harness
  references resolved to actual entity IDs; they are not production data contracts.

## Focal-Block Rumination

- Rumination is one organization approach, not the definition of organization or a collection
  stage. It starts only from an explicit request naming one existing focal Block.
- The Agent receives Resolver text and a bounded snapshot of the focal Block's direct
  Relations. It may discover selected Resolver draft schemas, request a non-persisting graph
  draft, and submit one ordinary graph command.
- Tool input validation belongs to the Agent runtime and each Tool's typed schema. Resolver
  code owns its draft input and conversion; info-base owns graph normalization and persistence.
- The focal Block and its existing graph remain unchanged. No meaningful write, inability to
  understand, or an Agent decision to finish without a Tool call completes without mutation.
- Repeated runs are independent and may add duplicates. MVP has no collection hook, periodic
  scan, run record, checkpoint, retry, rollback, freshness proof, or Agent-wide exactly-once
  layer.

## Peer Discovery And Delegation

```text
business facade
  -> local execution when available
  -> otherwise Peer delegation by exact capability ID
       -> live eligible Peer + advertised inbound interface
       -> protocol-specific outbound
       -> provider business inbound
       -> non-delegating local execution
```

- Runtime Peers are equal participants around shared database authority but may implement
  different executable capabilities. Caller/provider or client/server describes one
  interaction edge, not a fixed deployment hierarchy.
- One Peer row owns a validated full capability-advertisement snapshot and one lease expiry.
  Each advertisement contains an exact capability ID plus an inbound interface whose exact
  protocol ID owns its parameter schema.
- Discovery exposes support and Peer liveness. Readiness is internal to the business service
  and never becomes advertisement metadata. Lease evaluation uses database time; the lease
  owner chooses its TTL because always-on and scale-to-zero deployments differ.
- The generic Peer manager keeps capability payloads opaque. A business owner maps its typed
  request/result to a protocol payload and exposes a matching inbound that invokes an
  explicitly non-delegating local path.
- Candidate selection excludes the caller, expired leases, malformed inbounds, and protocols
  for which the caller has no outbound. An optional exact Peer target disables alternate-Peer
  selection without changing capability semantics.
- Generic failover is allowed only before dispatch or after exact protocol proof that
  execution did not occur. Once execution may have happened, an unknown outcome stops rather
  than being replayed. Business-specific replay safety requires its own future contract.

## Peer HTTP Protocol V1

The exact protocol ID is `core.peer.protocol.http.v1`. An advertisement parameter object
contains an HTTP method and absolute URL. Each one-shot call uses a normalized envelope:

```text
request  = { query?: map<lowercase name, string[]>,
             headers?: map<lowercase name, string[]>,
             body?: JSON value }
response = { status: integer,
             headers: map<lowercase name, string[]>,
             body?: JSON value }
```

- Query, headers, and body may coexist. The protocol owns JSON wire encoding, peer JWT
  Authorization, authority/framing fields, hop-by-hop exclusions, and the exact
  non-execution response marker.
- The business capability owns the typed payload codec and response interpretation. Peer HTTP
  does not learn semantic-retrieval, organization, or extension-management meaning.
- Binary/streaming or long-lived sessions require another exact protocol version. MVP does
  not add a generic `/capabilities/{id}/invoke` route or generic delegation job.

The first admitted exact capability IDs are:

- `core.semantic_retrieval.v1`;
- `core.organization.rumination.v1`;
- `core.extension.management.v1`;
- `extensions.mail.mime_part.materialize.v1`.

## Runtime Authentication And Advertisement

- Peer HTTP uses the shared `HS256` token contract with role `authenticated`, issuer
  `inkcre-peer`, audience `inkcre-api`, required `iat`/`exp`, a 24-hour maximum lifetime, and
  deployment-owned secret material of at least 32 bytes.
- A capability is advertised only after its inbound is registered and routable. Withdrawal
  precedes runtime unmount/close. Ordinary Peer-row updates do not imply liveness.
- The deployment owns each Peer identity and runtime config, including the public base URL
  from which absolute HTTP inbound URLs are projected. Delivery must wait until the exact
  expected capability snapshot and live lease are visible; application readiness alone does
  not prove discovery convergence.

## Explicit Non-Goals

- generic service registry, capability invocation endpoint, or delegation job
- readiness discovery, routing weights, priorities, stickiness, or circuit breakers
- persistent Agent Thread/checkpoint storage or Agent-owned exactly-once execution
- feature retrieval, graph-navigation retrieval, answer generation, or Chat InKCre behavior
- transient chunk/segment persistence, ANN/HNSW, pagination, or cross-profile score fusion
