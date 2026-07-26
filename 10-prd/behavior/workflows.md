# Workflows

## Workflow: Collection

- actor: source capability or extension-provided source
- trigger: a collection run starts or external data is received
- normal flow: source gathers external data, product records collect-job lifecycle, and reusable blocks or relations are produced for the info-base
- exception flow: collection execution may fail without redefining source type or source instance semantics
- observable outcome: new or updated reusable information units exist for later organization and use

## Workflow: Organization

- actor: info-base authority
- trigger: collected information is admitted into reusable product memory
- normal flow: the product normalizes information into blocks and relations, while storage and resolver roles remain distinct
- exception flow: raw content may remain external and be retrieved later through storage
- observable outcome: organized graph state exists for linking, interpretation, and reuse

## Workflow: Retrieval And Use

- actor: sink capability or downstream workflow
- trigger: downstream use needs information, indexing, embedding, or retrieval from the info-base
- normal flow: sink reads organized information, uses resolver output as needed, and serves downstream workflows
- exception flow: downstream use may depend on deferred raw-content retrieval without transferring authority away from the info-base
- observable outcome: organized information is available for retrieval, indexing, RAG, or other downstream usage
