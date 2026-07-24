# Product Glossary

## Scope

This glossary contains product/domain terms only. Implementation-specific terms belong to local AGENTS or unit-local alignment notes.

## Core Terms

- `info-base`: the shared memory center that stores and links reusable information units.
- `block`: one persisted information unit in the info-base.
- `relation`: a directed, typed link between two blocks.
- `resolver`: a component that interprets blocks and local graph context into usable meaning.
- `storage`: a component that retrieves raw content when content is not inline in the block record.
- `source`: a capability that gathers data from external systems.
- `sink`: a capability that retrieves/indexes info-base content for downstream usage.
- `extension`: an installable capability that adds source, resolver, or sink behaviors.
- `client`: one running node in a multi-runtime deployment.
- `collect job`: one execution lifecycle record for source collection.

## Naming Rule

Do not mix product terms with language-specific identifiers in this file.
