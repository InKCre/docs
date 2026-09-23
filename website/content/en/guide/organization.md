---
title: Organize Your Information
outline: false
description: Improve information already collected in your InKCre instance.
---

# Organize Your Information

Organization acts on information already in your info-base to make it more useful later. It can
split, merge, link, interpret, or otherwise improve that information. Collection is different: it
brings source information into the info-base and may preserve source-authored relationships while
doing so. Finding information is Application; its indexes and embeddings are derived retrieval
support, not Organization output.

These are independent actions, not mandatory stages. You can collect and retrieve useful information
without running Organization first.

## Before you organize

1. Finish [one collection](/guide/collect) and [retrieve a known item](/guide/search).
2. Choose a concrete improvement, such as interpreting an image or reconsidering one Block in its
   immediate context. Do not run Organization merely to make the graph look tidy.
3. Configure a compatible model provider and Agent for the exact behavior. Organization may send
   selected content to that provider and may incur charges.

The
[Core Organization guide](https://github.com/InKCre/core-py/blob/main/docs/30-unit-tdd/organization.md)
owns the current behavior and configuration contracts. A configured model alone does not schedule or
run Organization.

## Reconsider one Block

For one item that would benefit from additional context or connections, retain its Block ID and ask
your trusted Agent to run:

```sh
inkcre-cli organization ruminate BLOCK_ID
```

The command creates a Job. Observe that Job, then inspect the Block and its neighborhood again.
Rumination is additive and best-effort: it may add ordinary Blocks and Relations, or finish without
writing when the Agent has no useful change. It does not replace or delete the original Block.

## Run Organization automatically

Some Organization behaviors select their own candidates, including media interpretation. They use
ordinary typed Jobs and do not receive a schedule automatically. First use your Agent to verify that
the chosen behavior is configured and available on the online Core Peer. Run it once and inspect its
Job and graph effects before creating a Cron.

For example, a configured media-interpreting instance can run this parameterless Job type:

```sh
inkcre-cli job create --type core.organization.media_interpretation.v1 --input-json '{"parameters":{}}'
```

A finished Job is not a blanket quality verdict. One candidate may produce no useful output, and
already committed effects remain when another candidate fails. Review representative results before
choosing a schedule suitable for your information and provider budget. For example, after the manual
media Job works, schedule the same behavior once each night:

```sh
inkcre-cli cron create --job-type core.organization.media_interpretation.v1 --input-json '{"schedule":"0 3 * * *","job_parameters":{}}'
```

Inspect the returned Cron and its later Jobs. Use a different frequency only when your incoming
media volume and provider budget justify it.

Search indexes and embeddings are retrieval support, not Organization output. Maintain them through
[Find What You Saved](/guide/search#keep-search-current).
