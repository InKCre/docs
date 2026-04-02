# Submodule Operations

## Scope

This document defines the operating protocol for unit repositories that mount this shared docs repository at `docs/_shared/`.

## SOP: Shared Doc Update

1. Make doc changes in `InKCre/docs` and merge/push first.
2. In the unit repository, run `git submodule update --init --recursive docs/_shared`.
3. Move submodule pointer to the required source commit.
4. Verify shared paths and local paths do not overlap.
5. Commit only the pointer bump in the unit repository.

## SOP: Consumer-Only Change

- Do not modify files under `docs/_shared`.
- Keep submodule pointer unchanged unless the task explicitly requires a shared-doc update.

## Agent Skill Contract

An agent operating in a unit repository should:

- detect whether target files are under `docs/_shared`
- block direct edits under `docs/_shared`
- enforce update order: source push first, pointer update second
- verify pointer target commit is reachable from `InKCre/docs` remote
- use the canonical skill at `.agents/skills/edit-shared-docs/`; repo-root unit wrappers should only delegate to that source

## CI Guard Contract (Unit Repos)

- verify `.gitmodules` URL points to `InKCre/docs`
- verify submodule pointer commit exists on source remote
- verify no local docs are accidentally moved under `docs/_shared`
