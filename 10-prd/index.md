# InKCre PRD

This PRD follows one-way derivation:

Drivers -> Behavior -> Domain Structure

## Scope Of This PRD Package

This package records shared product truth for InKCre: product purpose, observable behavior, business vocabulary, and derived domain boundaries.

## Files

- glossary: `glossary.md`
- drivers:
  - `_drivers/market-and-user-pressures.md`
  - `_drivers/business-and-service-objectives.md`
  - `_drivers/hard-constraints.md`
  - `_drivers/operational-realities.md`
- behavior:
  - `behavior/claims.md`
  - `behavior/capabilities.md`
  - `behavior/workflows.md`
  - `behavior/rules-and-invariants.md`
  - `behavior/scope.md`
- domain structure:
  - `domain-structure/derived-boundaries.md`
  - `domain-structure/cross-domain-interactions.md`

## Guardrails

- product truth stays here; implementation mechanics stay out
- business vocabulary lives in `glossary.md`
- derived boundaries must not push new obligations upstream into drivers or behavior
