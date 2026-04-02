# Cross-Unit Contracts

## Purpose

Record durable data and behavior contracts that span more than one unit repository.

## Current Baseline

- This file is initialized as a scaffold.
- Add only contracts that cannot be safely inferred from one unit's code alone.

## Extension State Contract

- `installed`, `enabled`, and `running` are different states and must not be collapsed into one concept.
- `installed` means the deployment has the extension package and its persisted installation record.
- `enabled` means a specific client is allowed to run that extension.
- `running` means the current runtime has actually started that extension and applied its runtime side effects.
- Starting or stopping an extension is not a pure flag flip; it changes runtime capabilities and API surface for that client.
