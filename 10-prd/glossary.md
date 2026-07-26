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

- canonical business meaning: a directed, typed link between two blocks.
- user-visible or business lifecycle language: reusable context that connects information units.
- notes on ambiguity with framework terms: this is domain graph vocabulary, not a transport or ORM relation term.

## resolver

- canonical business meaning: a component that interprets a block and its local graph context into usable meaning.
- user-visible or business lifecycle language: the interpretation layer that turns stored graph context into text or meaning for use.
- notes on ambiguity with framework terms: resolver is product/domain vocabulary here, even if implementations differ per unit.

## storage

- canonical business meaning: a component that retrieves raw content when content is not inline in the block record.
- user-visible or business lifecycle language: the access path to raw content behind a reusable information unit.
- notes on ambiguity with framework terms: storage here is not the same as a specific database or bucket implementation.

## source

- canonical business meaning: a capability that gathers data from external systems.
- user-visible or business lifecycle language: the collection-facing side of the product.
- notes on ambiguity with framework terms: this is a product capability, not a package or module name.

## sink

- canonical business meaning: a capability that retrieves or indexes info-base content for downstream usage.
- user-visible or business lifecycle language: the retrieval and downstream-use side of the product.
- notes on ambiguity with framework terms: do not overload this with logging or event-sink infrastructure terminology.

## extension

- canonical business meaning: an installable capability that adds source, resolver, or sink behaviors.
- user-visible or business lifecycle language: a pluggable way to extend the product without forking the core.
- notes on ambiguity with framework terms: this is product vocabulary, not only a Python packaging concept.

## client

- canonical business meaning: one running node in a multi-runtime deployment.
- user-visible or business lifecycle language: a product participant that can run capabilities around the shared system.
- notes on ambiguity with framework terms: client here is a runtime node, not necessarily an HTTP client.

## collect job

- canonical business meaning: one execution lifecycle record for source collection.
- user-visible or business lifecycle language: the tracked run state of a collection execution.
- notes on ambiguity with framework terms: this is a product execution record, not a generic background-job abstraction.
