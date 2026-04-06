# Shared Ref Operations

## Scope

This document defines the operating protocol for Spoke repositories that mount this Hub repo at `docs/_shared/`.

## SOP: Shared Doc Update

1. Capture the local pressure in the active Spoke task packet.
2. Make shared doc changes in `InKCre/docs` and push first.
3. In the Spoke repository, run `git submodule update --init --recursive docs/_shared`.
4. Move the shared ref to the required Hub commit.
5. Validate path boundaries and pointer reachability.
6. Commit only the isolated shared-ref bump in the Spoke repository.

## SOP: Consumer-Only Change

- Do not modify files under `docs/_shared/`.
- Keep the shared ref unchanged unless the task explicitly requires a shared-doc update.

## Agent Skill Contract

An agent operating in a Spoke repository should:

- detect whether target files are under `docs/_shared/`
- block direct edits under `docs/_shared/`
- enforce update order: Hub push first, Spoke ref update second
- verify pointer target commit is reachable from the Hub remote
- use the canonical skill at `00-meta/skills/edit-svc-shared-docs/`
- treat `.agents/skills/edit-svc-shared-docs/` in Spoke repos as a thin wrapper only

## Commit Boundary Rule

Never mix these in one commit:

- Hub durable doc edits
- Spoke shared-ref bumps
- Spoke-local code or local-doc changes

## CI Guard Contract (Spoke Repos)

- verify `.gitmodules` URL points to `InKCre/docs`
- verify submodule pointer commit exists on source remote
- verify no Spoke-local docs are accidentally moved under `docs/_shared/`
