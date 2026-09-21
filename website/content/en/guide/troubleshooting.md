---
title: Troubleshooting
description: Check deployment, connection, collection, and retrieval problems.
---

# Troubleshooting

Use the symptom below to find the next check. Keep credentials out of logs or screenshots you share.

| What you observe                         | What to check next                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Deployment workflow missing              | Enable Actions in your fork and check that it is up to date with upstream `main`.                         |
| Core slow or offline                     | Open Core `/readyz`; inspect host logs if it stays unready. PostgREST may sleep separately.               |
| Client returns `401`                     | Check endpoint and secret. Anonymous PostgREST `401` is expected; authenticated `401` is not.             |
| Source type absent                       | Install a compatible Extension and enable it on Core, not only in the Web app.                            |
| Job stays pending                        | Confirm Core is awake and its collector enabled. Job creation only confirms acceptance.                   |
| Collection finished but search empty     | Confirm the source exposed the item; run lexical maintenance and inspect diagnostics.                     |
| CLI works but Web cannot find a provider | Check Core readiness and that browser and Core Peer IDs differ.                                           |
| Old mail missing                         | Ordinary collection starts with new mail. Request a historical backfill.                                  |
| Truncated content or no attachment bytes | First-run examples avoid extra downloads. Check the collector's settings.                                 |
| Request outcome uncertain                | Read the Job or resulting data before repeating a write; a lost response does not prove nothing happened. |

Keep hosting and connection credentials in your password manager. Review your database's
backup/restore options and hosting usage before collecting irreplaceable information. A fork, a
client configuration export, and a source account are not backups of your info-base.
