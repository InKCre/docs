# Cross-Unit Contracts

## Purpose

Record durable data and behavior contracts that span more than one unit repository.

## Current Baseline

- This file is initialized as a scaffold.
- Add only contracts that cannot be safely inferred from one unit's code alone.

## Peer Database Runtime Contract

- All units that directly operate shared persisted state consume the canonical
  [Peer Database Runtime Contract](peer-database-runtime-contract.md).
- The contract owns database protocol admission, peer principals, lifecycle semantics,
  readiness, JWT claims, and portable acceptance. Unit repositories own only their
  implementation and provider-specific deployment mechanics.

## 跨 Peer 可观测性契约

[跨 Peer 可观测性契约](observability-contract.md)拥有部署/Peer 观测身份、标准传播、持久 Job 提交关联、AI 诊断与内容边界。遥测不接管业务状态或协议准入；各 Unit 与部署 owner 分别交付采集、存储和查询实现。

## Extension State Contract

[Extension 分发发布与 Peer 参与契约](extension-release-and-installation.md)拥有独立原生发布坐标、部署共享业务状态、Peer 精确安装选择，以及启用意图和实际运行的区别。插件拥有业务与数据兼容，各 Unit 分别拥有构建发布流程和宿主执行边界。

## Extension Documentation Hosting Contract

- Author-built static documentation, exact native Release identity and historical scope compatibility, conditional whole-site
  corrections, snapshot-origin isolation, and consumer discovery follow the
  [Extension Documentation Hosting Contract](extension-documentation-hosting.md).
- Registry owns hosting and executable API details; authors own site content and structure.
  Documentation does not become an installable Distribution or alter Host lifecycle authority.

## Info-Base Ownership Contract

- Collection, organization, application, graph authority, resolver/storage composition, and
  extension protocol authentication are owned by the
  [Knowledge Capability Contract](knowledge-capability-contract.md).
- Sources and extensions may propose graph data, but info-base owns persisted graph insertion.
- Embedding generation may be triggered during ingestion, but embeddings remain derived
  application support rather than source-owned or info-base-owned authority.
- Generic one-shot Jobs and Crons, Source graph anchors, writable-Storage selection,
  source graph/materialization patterns, and info-base navigation/solved-content boundaries
  are owned by the same Knowledge Capability Contract.

## Semantic Retrieval And Peer Capability Contract

- Semantic projection, profile-scoped derived records, explicit maintenance, ranked result
  semantics, focal-block rumination, exact capability discovery, and synchronous Peer
  delegation are owned by the
  [Semantic Retrieval And Peer Capability Contract](semantic-retrieval-and-peer-capabilities.md).
- Peer discovery and invocation remain separate. The generic Peer layer sees exact capability
  identities and opaque protocol payloads; each business capability keeps its typed request,
  result, and local execution semantics.

## Feature Retrieval And Media Interpretation Contract

- Block-local lexical projection，derived-record maintenance，explainable ranked results，
  multimodal AI content parts，faithful Resolver text materialization，system-driven media
  interpretation and List-host navigation are owned by the
  [Feature Retrieval And Media Interpretation Contract](feature-retrieval-and-media-interpretation.md).
- Resolver materialization and Organization may add graph facts，but the lexical retrieval
  owner alone maintains lexical records。Exact synchronous retrieval uses the generic Peer
  protocol without giving PeerManager the query or result meaning。

## Graph Navigation Retrieval Contract

- Endpoint-closed graph read models，bounded Block/Relation neighborhoods，shortest-path
  outcomes，random focal selection and presentation separation are owned by the
  [Graph Navigation Retrieval Contract](graph-navigation-retrieval.md).
- Peer implementations may query shared graph authority directly. InfoBase views realize
  navigation and presentation without becoming the owner of retrieval semantics.
