# Unit Topology

## Purpose

Define cross-unit technical boundaries and ownership so changes do not leak responsibilities.

## Current Baseline

- This file is initialized as a scaffold.
- Add stable cross-unit boundaries only after they are confirmed by at least one real integration change.

## Database Peer Topology

- `impl-py`, `impl-ts`, `impl-swift`, and future units are peer nodes; frontend/backend hierarchy is not
  part of the durable topology.
- Native PostgreSQL and PostgREST are transports over one admitted database protocol, not
  separate semantic authorities.
- Every authenticated peer may operate the complete admitted protocol surface. Different
  transports and deployments still use distinct login principals and secret custody.
- Migration authority, runtime capability, HTTP authentication, and anonymous access remain
  separate trust boundaries.
- Peer equality does not imply identical execution ability. A business facade may execute
  locally on a capable Peer or delegate one exact synchronous capability to another live
  Peer without turning the deployment into a fixed frontend/backend hierarchy.
- `inkcre/capture` 是 first-party extension，拥有跨平台的材料、采集图与收入语义。Mac 原生分发在本 Peer 内完成采集、持久待办、构图与共享写入；Host/Core 提供通用运行和数据库能力。
- `inkcre/local-files` 拥有目录来源、文件位置引用、正文与持续更新合同。具备文件访问能力的分发直接收入，读取分发解释已存正文，不要求执行 Peer 在线；见[本地文件合同](local-files-contract.md)。
- Mac 使用 PostgreSQL 原生协议，Web 按浏览器运行能力使用 PostgREST；传输选择不划分 Peer 业务权威。仓库维护位置不构成运行时流水线。具体语义见[Capture Extension 合同](capture-contract.md)。
- Shared actors，assets，trust boundaries and proportional security classification use the
  [Security Boundary Model](security-boundary-model.md)。Each Unit still owns its executable
  admission，rendering，runtime and deployment mechanics。

## Knowledge Capability Topology

- The [Knowledge Capability Contract](knowledge-capability-contract.md) owns the shared
  collection, organization, application, graph, resolver, storage, and extension-protocol
  boundaries.
- A unit may implement more than one capability, but that does not merge their authority:
  collection proposes source-derived graph changes, info-base owns persisted graph state,
  resolver interprets hydrated content and relations, storage owns byte access mechanics, and
  application owns derived retrieval support.
- Extension lifecycle and extension-owned protocol authentication are runtime capability
  boundaries, not a terminal-user or graph-ownership boundary.
- Semantic retrieval and synchronous capability delegation use the shared
  [Semantic Retrieval And Peer Capability Contract](semantic-retrieval-and-peer-capabilities.md).
- Lexical feature retrieval，multimodal AI content transport，faithful media materialization，
  Organization media interpretation and List-host navigation use the shared
  [Feature Retrieval And Media Interpretation Contract](feature-retrieval-and-media-interpretation.md).
- Endpoint-closed graph neighborhoods，bounded shortest paths and InfoBase-view separation use
  the [Graph Navigation Retrieval Contract](graph-navigation-retrieval.md).
