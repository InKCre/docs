# Graph Navigation Retrieval Contract

## Purpose

Define the shared semantics of graph-navigation retrieval across peer implementations and
InfoBase views. Graph navigation reads persisted Blocks and Relations as graph authority. It
does not resolve content，rank semantic similarity，maintain an index，or own presentation、
layout、camera or route state.

## Read Model

- `GraphModel` is the presentation-neutral read result. It contains existing Blocks and
  Relations and is distinct from producer-oriented graph forms.
- Every returned Relation is endpoint-closed：both referenced Blocks appear in the same
  `GraphModel`. A disappearing or dangling Relation is omitted from an otherwise successful
  neighborhood result rather than exposing an unusable edge.
- Persisted Relation direction and content are returned unchanged. Query direction controls
  admissible traversal，not the meaning or orientation of stored graph facts.
- Retrieval does not include labels，Resolver output，solved content，preview data，layout or
  camera hints. Consumers obtain those through their respective owners.

## Neighborhood Operations

- A Block neighborhood returns the focal Block plus a bounded page of incident Relations and
  their endpoints. Missing focal returns no result；an isolated focal succeeds with a graph
  containing one Block and no Relations.
- Direction is `in`，`out` or `both`. Optional Relation contents are exact-match filters.
- Relation pages use persisted Relation identity descending with an exclusive continuation
  cursor. `both` remains one public incident-page abstraction even when an implementation
  queries incoming and outgoing branches separately.
- A Relation neighborhood returns that Relation and exactly its two endpoint Blocks. Missing
  or no-longer-closed authority returns no result.
- Random Block selection is a primitive for choosing an initial focal entity. Empty authority
  returns no Block；the contract makes no distribution-quality promise.

## Bounded Path Operation

- Path retrieval finds a shortest admissible Block-to-Block path within explicit hop and
  explored-Block budgets. Direction and exact Relation-content filters apply during traversal.
- A found result contains an endpoint-closed `GraphModel` plus aligned ordered Block and
  Relation identity paths. `from == to` is a valid zero-hop path.
- `not_found` means the admissible reachable graph was exhausted. `limit_reached` means a
  budget prevented that proof. Implementations do not hide this distinction through retries
  or silently broaden the query.
- When several equal-hop shortest paths exist，any valid shortest path is acceptable. The
  contract does not promote an incidental database or traversal tie-break into product truth.
- If persisted rows change before final assembly and the candidate path no longer validates，
  the operation fails as an ordinary retrieval/validation error. It does not fabricate a path
  outcome or claim snapshot isolation.

## Peer And Presentation Boundary

- Python，web and future peers may implement these operations directly against shared graph
  authority. Graph navigation does not require synchronous Peer delegation or a database RPC.
- InfoBase views consume retrieval results but do not define retrieval semantics. Graph views
  may progressively realize a focal neighborhood；List or future views may use the same read
  capability differently.
- Preview and solved-content presentations may consume the same Resolver-owned solved-content
  authority，but remain separate presentation contracts. Preview is bounded and
  interaction-free；solved content may support focused reading and business interaction.
- Block and Relation inspectors are entity-local. Application routing/history remains owned by
  the client application，while a Graph view may realize those destinations as a navigation
  host.

## Shared Acceptance Corpus

[`graph-navigation-retrieval.corpus.json`](graph-navigation-retrieval.corpus.json) owns stable
topology aliases，persisted Relation direction/content，scenario inputs and semantic assertions.
Runtime database identities，one arbitrary equal-shortest path，private query counts and UI
geometry are deliberately absent. Every peer runner resolves aliases only inside its
acceptance harness.

## Explicit Non-Goals

- generic N-hop/pattern query language，full-graph loading or community analysis
- semantic/lexical ranking，Resolver-local graph access or retrieval-driven graph mutation
- hidden retry，snapshot claims，path ranking or equal-path tie-break API
- presentation layout，camera，scene cache，node sizing or application navigation state
- graph-navigation Peer capability，inbound protocol or database RPC
