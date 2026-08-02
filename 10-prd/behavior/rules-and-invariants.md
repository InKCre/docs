# Rules And Invariants

## Info-base is the shared memory center

- rationale: reusable product memory must stay authoritative for collected and organized information.
- violation impact: source-native objects or extension tables become competing information authorities.
- linked claim(s): organize information in one reusable info-base

## Multiple runtimes may operate around the same info-base

- rationale: one running node should not become the only valid participant in the system.
- violation impact: product behavior would collapse into a single-runtime assumption.
- linked claim(s): organize information in one reusable info-base

## Source, info-base, and sink remain separate responsibilities

- rationale: collection, authoritative memory, and downstream use should not blur into one uncontrolled surface.
- violation impact: ownership boundaries and future extensibility erode.
- linked claim(s): collect external information into reusable units; expose info-base information for retrieval and downstream use

## Collection, organization, and application are actions rather than information states

- rationale: collection can construct a graph, organization acts on an existing info-base to improve use, and application may consume information without a mandatory organization stage.
- violation impact: implementation sequencing is mistaken for product meaning and capability ownership becomes circular.
- linked claim(s): collect external information into reusable units; organize information in one reusable info-base; expose info-base information for retrieval and downstream use

## Extensions add capability by registration and lifecycle hooks

- rationale: capability growth should preserve core ownership boundaries.
- violation impact: extensions could bypass durable product contracts.
- linked claim(s): collect external information into reusable units; expose info-base information for retrieval and downstream use

## Resolver interpretation and storage retrieval remain distinct

- rationale: resolver interpretation may combine hydrated block content with local relations, while storage only turns the block's opaque pointer into actual bytes.
- violation impact: block semantics become harder to reason about and downstream use loses clarity.
- linked claim(s): organize information in one reusable info-base; expose info-base information for retrieval and downstream use

## Exact source evidence outranks heuristic duplicate reduction

- rationale: stable native identity can justify reconciliation, while content fingerprints and time cutoffs provide weaker and less stable guarantees.
- violation impact: uncertain external information may overwrite the wrong graph state or a heuristic may be misrepresented as identity.
- linked claim(s): collect external information into reusable units; reliably collect RSS and Atom feeds

## Source-authored facts and semantic enrichment remain separate

- rationale: fetched full text and downloaded enclosure bytes can improve use without becoming authority for what a feed authored.
- violation impact: enrichment failure would corrupt primary collection semantics and provenance would be lost.
- linked claim(s): reliably collect RSS and Atom feeds; expose info-base information for retrieval and downstream use

## One deployment is one owner context

- rationale: runtime peers and external protocol identities should not silently create an unplanned terminal-user or tenant domain.
- violation impact: compatibility projections become accidental row ownership or access-control authority.
- linked claim(s): accept memo-like capture through familiar clients; organize information in one reusable info-base
