# InKCre Product Glossary

## info-base

- canonical business meaning: the shared memory center that stores and links reusable information units.
- user-visible or business lifecycle language: a durable base for organizing and reusing collected information.
- notes on ambiguity with framework terms: this is a product term, not a framework memory-layer term.

## block

- canonical business meaning: one persisted information unit in the info-base.
- user-visible or business lifecycle language: the reusable unit created, linked, and later retrieved by the product.
- notes on ambiguity with framework terms: do not confuse with code blocks or UI blocks.

## relation

- canonical business meaning: a directed semantic link between two blocks whose payload states the relation meaning required by its owning contract.
- user-visible or business lifecycle language: reusable context that connects information units.
- notes on ambiguity with framework terms: this is domain graph vocabulary, not a transport or ORM relation term; a payload grammar does not imply one universal relation-type registry.

## resolver

- canonical business meaning: a component that interprets a block's hydrated content together with its local graph context into usable meaning under an exact contract version.
- user-visible or business lifecycle language: the interpretation layer that turns stored graph context into text or meaning for use.
- notes on ambiguity with framework terms: resolver is product/domain vocabulary here, even if implementations differ per unit.

## storage

- canonical business meaning: a component that turns an opaque pointer held by a block into actual bytes; a writable storage also owns pointer serialization and its supported byte lifecycle.
- user-visible or business lifecycle language: the access and lifecycle path to actual content behind a reusable information unit.
- notes on ambiguity with framework terms: storage here is not the same as a specific database or bucket implementation.

## source

- canonical business meaning: an origin-facing capability or integration surface that gathers information from an external system or compatible client.
- user-visible or business lifecycle language: the collection-facing side of the product.
- notes on ambiguity with framework terms: this is a product capability, not a package or module name.

## sink

- canonical business meaning: a capability that retrieves or indexes info-base content for downstream usage.
- user-visible or business lifecycle language: the retrieval and downstream-use side of the product.
- notes on ambiguity with framework terms: do not overload this with logging infrastructure or use it as a synonym for every application capability.

## extension

- canonical business meaning: an installable capability that adds source, resolver, storage, sink, or bounded protocol behavior.
- user-visible or business lifecycle language: a pluggable way to extend the product without forking the core.
- notes on ambiguity with framework terms: this is product vocabulary, not only a Python packaging concept.

## client

- canonical business meaning: a user-facing application through which a person interacts with InKCre or a compatible product protocol.
- user-visible or business lifecycle language: the app or interface a person uses.
- notes on ambiguity with framework terms: technical architecture uses `peer` for runtime nodes; product, marketing, landing, and other non-technical material may continue to say client where that is what a person experiences.

## peer

- canonical business meaning: one running node that participates in a deployment around the shared info-base and may provide or consume capabilities.
- user-visible or business lifecycle language: normally hidden behind the product's clients and deployment.
- notes on ambiguity with framework terms: peer equality describes shared authority and participation, not identical execution ability; one interaction may still have caller/provider or client/server roles.

## job

- canonical business meaning: one typed, one-shot execution request and its lifecycle record.
- user-visible or business lifecycle language: a tracked run that a capable peer may claim and execute.
- notes on ambiguity with framework terms: a job records one attempt; it does not promise source completeness, retry itself, or become an information state.

## cron

- canonical business meaning: a recurring policy that creates a job for a due occurrence.
- user-visible or business lifecycle language: a schedule for starting future runs.
- notes on ambiguity with framework terms: cron creates commands but does not execute their business behavior; missed occurrences remain missed unless a person separately starts a run.

## collection

- canonical business meaning: the action of persisting source-specific information into the info-base as one block or a graph of blocks and relations.
- user-visible or business lifecycle language: bringing information into InKCre so it remains available for later action.
- notes on ambiguity with framework terms: collection is not a state carried by information, and not every collection access mode has a Job.

## backfill

- canonical business meaning: an explicit collection intent over a caller-specified historical range.
- user-visible or business lifecycle language: bringing older source information into InKCre on demand.
- notes on ambiguity with framework terms: backfill is collection, not a separate capability or a synonym for an ordinary incremental run; its exact boundaries remain source-specific.

## organization

- canonical business meaning: an action over information already in the info-base whose goal is to improve later use.
- user-visible or business lifecycle language: maintaining, splitting, merging, or linking existing information when that makes it more useful.
- notes on ambiguity with framework terms: breakdown, merge, and linking are known operations, not an exhaustive definition; indexing belongs to application support.

## application

- canonical business meaning: an action that obtains useful results from the info-base, including feature, semantic, and graph-navigation retrieval.
- user-visible or business lifecycle language: finding or navigating information and its context.
- notes on ambiguity with framework terms: an application capability may use a sink, index, embedding, or resolver projection without transferring graph authority.

## feature retrieval

- canonical business meaning: retrieving information from observable features that do not require semantic-similarity ranking or an already-materialized graph path.
- user-visible or business lifecycle language: finding something from a clue remembered about it.
- notes on ambiguity with framework terms: lexical and future perceptual retrieval are feature-retrieval families; graph-navigation owns facts already expressed as graph structure, and hybrid retrieval composes rather than redefines the primitive capabilities.

## lexical retrieval

- canonical business meaning: feature retrieval over a block's bounded textual projection, including labels, literal fragments, terms, document text, faithful media text, and explicit interpretations.
- user-visible or business lifecycle language: finding an information unit by a word, phrase, identifier, filename, transcript, subtitle, OCR clue, or description.
- notes on ambiguity with framework terms: lexical retrieval returns existing blocks; it is not Chat, answer generation, recursive graph indexing, or a promise of language-specific tokenization.

## memo-like capture

- canonical business meaning: low-friction collection of thoughts, surrounding events, and small pieces of information through a memo client or collector.
- user-visible or business lifecycle language: recording a memo wherever the person is, using a familiar client backed or collected by InKCre.
- notes on ambiguity with framework terms: it is a collection surface, not a browser for the wider info-base; backend compatibility and collector ingestion are separate access modes.
