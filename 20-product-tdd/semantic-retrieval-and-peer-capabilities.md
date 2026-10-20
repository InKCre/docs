# Semantic Retrieval And Peer Capability Contract

## Purpose

Define the shared semantics for semantic retrieval, the minimum focal-block organization
path that improves its granularity, and capability delegation and browser credential handoff between
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
- Exact typed Jobs may call the same maintenance operation, and Cron may create those Jobs as
  ordinary commands. This does not create a second indexing path, retry contract, or
  dirty-state authority.

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
- One Peer row owns its runtime application version, a validated full
  capability-advertisement snapshot, and one lease expiry. Each advertisement contains an exact
  capability ID plus an inbound interface whose exact protocol ID owns its parameter schema.
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
- `core.feature_retrieval.lexical.v1`;
- `core.organization.rumination.v1`;
- `core.extension.management.v1`;
- `extensions.mail.mime_part.materialize.v1`.

## 浏览器凭据交接协议 V1

`core.peer.protocol.browser-form.v1` 供需要浏览器顶层导航的显式凭据交接使用。业务能力拥有接收路由及后续会话语义，Host/Auth 拥有目标校验、Peer JWT 签发和表单传输。广告参数为：

```json
{"method":"POST","path":"/business/session","credential_field":"token"}
```

参数对象只接受上述三个字段，`method` 固定为 `POST`。`path` 是相对于 Peer 公共基址及其路径前缀追加的路由，最长 2048 字符，各段只能包含 ASCII 字母、数字、下划线和短横线，遵守 `^(?:/[A-Za-z0-9_-]+)+$`；不接受查询、fragment、点段、双斜线或百分号编码。`credential_field` 指定表单中承载凭据的字段，遵守 `^[A-Za-z][A-Za-z0-9_-]{0,63}$`，且不能是 `action`、`enctype`、`method`、`requestSubmit`、`submit` 或 `target`，避免遮蔽浏览器表单属性。

调用者只提交明确选择的 Peer 与精确 capability ID。Host 按数据库时间确认该 Peer 的 live lease，并读取该能力的有效广告；不替换成其他 Peer，也不执行自动重试。Host 从该 Peer 的 `http_public_base_url` 派生目标，要求 HTTPS、无 userinfo/query/fragment，保留已有路径前缀并追加广告 path。业务 UI 不能把任意 URL 或待签 JWT 传入这条路径。

仅在显式调用时，Host/Auth 内部签发新鲜的现有 Peer JWT，通过 `application/x-www-form-urlencoded`、`target=_top` 的 POST 表单将其放入 `credential_field`。原始 JWT 不返回业务 UI，也不进入 URL。调用结果最多说明导航已发起，即 `initiated`；它不证明远端建立会话、Cookie 被浏览器接受或业务操作成功。业务需要通过自己的完成页面或会话检查确认后续结果。

这是一条导航交接合同，不使用 HTTP V1 的请求／响应 envelope。接收能力自行决定是否兑换同类会话 JWT、Cookie、有效期和续签；通用 Host 不吸收这些业务政策。

## Runtime Authentication And Advertisement

- Peer HTTP 使用 [Peer Database Runtime Contract](peer-database-runtime-contract.md#jwt-contract) 的共享 `HS256` JWT：role 为 `authenticated`，issuer 为 `inkcre-peer`，audience 为 `inkcre-api`，必需 `iat`/`exp`，部署持有至少 32 字节的签名秘密。签发默认有效期属于签发者配置，接收端不把它作为最大寿命。
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
- graph-navigation retrieval, answer generation, or Chat InKCre behavior
- transient chunk/segment persistence, ANN/HNSW, pagination, or cross-profile score fusion
