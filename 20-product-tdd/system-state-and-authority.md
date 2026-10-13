# System State And Authority

## Purpose

Record durable ownership of authoritative state across units and distinguish it from derived state.

## Current Baseline

- This file is initialized as a scaffold.
- Populate only cross-unit state authority that is stable and expensive to rediscover.

## Shared Database Authority

- PostgreSQL is authoritative for shared persisted InKCre state.
- The `inkcre` schema is the versioned protocol surface admitted to authenticated peers.
- `core-py` currently owns migrations and the executable lifecycle contract; this is schema
  authority, not request-path or product-tier authority over other peers.
- Production rows are operational recovery data and must never be reproduced as development
  seed.
- Input validation belongs at the accepting boundary. A normal record read does not reapply
  business input validation or require the corresponding runtime schema to be loaded. An execution
  path may restore persisted representations into its language's types; it need not repeatedly
  revalidate values already restored by that owner. Runtime capability checks remain separate
  from the authority of saved records.

## Extension Installation Authority

- 一个部署对一个 Extension 保持一个逻辑身份、共享配置和业务状态。不同运行端通过各自的能力共同参与该业务，持久数据不归某个执行节点所有。
- 精确原生分发版本和启用意图属于 `Peer × Extension` 的持久参与记录。同一插件可以在不同 Peer 使用不同版本；一个 Peer 的选择不改变其他 Peer，也不建立部署全局包版本。
- 实际加载版本、运行成功、失败与重启需求是对应宿主报告的运行事实，不能从安装选择、启用意图或过期 lease 推断。
- 配置编辑 schema 保留其精确分发来源；它是选定运行端的编辑说明，不改变共享配置权威，也不证明其他分发理解同一写入。
- 安装选择与 client-scoped permission、当前运行活动分别记录。具体发布、参与和历史迁移遵循 [Extension 分发发布与 Peer 参与契约](extension-release-and-installation.md)。
- Validated extension configuration is deployment-scoped durable state. External protocol
  profiles or credentials projected from that configuration do not create an InKCre User or
  tenant authority.

## Info-Base Graph Authority

- Persisted blocks and relations are authoritative graph state.
- A block record may carry inline content or an opaque pointer to storage-backed actual bytes.
- Storage-backed bytes are subordinate to the block that holds their pointer; the storage
  backend does not become an information or MIME authority. Storage bytes may change without
  changing the block row, so row timestamps are not a universal content-freshness signal.
- Resolver-solved values, retrieval indexes, embeddings, and native protocol responses are
  derived projections, not additional authoritative graph state.
- AI providers/models and embedding profiles are deployment-scoped execution and vector-space
  contracts. Profile-scoped Block/Relation embedding records are rebuildable application
  support; their timestamps express database-row compatibility rather than universal
  storage-byte freshness.
- Block lexical records are rebuildable application support owned by lexical retrieval. Their
  label/text/search projection is Block-local and derived; faithful media text and
  Organization-authored interpretation become authoritative only as ordinary graph Blocks
  and Relations before later lexical maintenance observes them.
- Block row timestamps describe persistence. Source-authored creation or update time remains
  a content fact owned by the relevant canonical contract.

## Source Incremental State Authority

- Conditional request validators belong to the configured request URL that produced them.
- Admission watermarks and cursors belong to the exact source graph identity that produced
  them; source state retains enough scope reference to reject unsafe reuse after identity or
  configuration changes.
- Incremental state is collection execution authority, not information identity and not
  authoritative graph content.

## Deployment Owner Context

- One InKCre deployment is one owner context; the product does not currently define tenants,
  terminal users, or per-row user ownership.
- Technical runtime participants are Peers and are presented as Peers wherever a person manages
  their identity, configuration, liveness, or capabilities. `Client` remains valid only for an
  actual application or protocol-native role. Identities named by an external source or
  compatibility protocol keep their native boundary meaning and must not silently become
  shared-system principals.
