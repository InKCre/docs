---
title: Troubleshooting
description: Check deployment, connection, collection, and retrieval problems.
---

# Troubleshooting

Use the symptom below to find the next check. Keep credentials out of logs or screenshots you share.

| What you observe                         | What to check next                                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Deployment workflow missing              | Enable Actions in your fork and check that it is up to date with upstream `main`.                              |
| Core slow or offline                     | Start it from your hosting dashboard, then choose **Refresh** in Peers. Inspect host logs if it stays offline. |
| Client returns `401`                     | Check endpoint and secret. Anonymous PostgREST `401` is expected; authenticated `401` is not.                  |
| Source type absent                       | Install a compatible Extension and enable it on Core, not only in the Web app.                                 |
| Job stays pending                        | Confirm Core is awake and its collector enabled. Job creation only confirms acceptance.                        |
| Collection finished but search empty     | Confirm the source exposed the item; run lexical maintenance and inspect diagnostics.                          |
| CLI works but Web cannot find a provider | Refresh Peers and check that the browser and Core have different Peer IDs.                                     |
| An old Peer remains in the list          | Stop it, refresh Peers until offline, then choose **Delete Peer**. Its Extension enablement is cleared.        |
| Old mail missing                         | Ordinary collection starts with new mail. Request a historical backfill.                                       |
| Truncated content or no attachment bytes | First-run examples avoid extra downloads. Check the collector's settings.                                      |
| Request outcome uncertain                | Read the Job or resulting data before repeating a write; a lost response does not prove nothing happened.      |

Keep hosting and connection credentials in your password manager. Review your database's
backup/restore options and hosting usage before collecting irreplaceable information. A fork, a
Settings export, and a source account are not backups of your information.
