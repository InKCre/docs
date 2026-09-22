---
title: Connect ChatGPT through MCP
description: Use the InKCre MCP Sink and Secure MCP Tunnel to retrieve your information in ChatGPT.
---

# Connect ChatGPT through MCP

A **Sink** makes InKCre capabilities available to another tool. This guide connects the MCP Sink to
ChatGPT through OpenAI's Secure MCP Tunnel, so you can ask ChatGPT to find and read information from
your instance. It is an on-demand connection, not a scheduled digest or notification service.

The connection follows this path:

```text
ChatGPT → OpenAI Secure MCP Tunnel → your running tunnel-client → InKCre MCP Sink
```

The tunnel client must be able to reach Core. It can run on your computer or another machine you
operate; it does not have to run beside Core. Keep it running whenever ChatGPT needs the connection.

## Before you start

- Have a working instance and complete [a known-item search](/guide/search) first. Retain its Core
  URL and private JWT secret.
- Install the CLI environment from [Connect the CLI](/guide/connect-cli). The setup example below
  uses its installed Python dependencies because the CLI does not yet have a `sink` command.
- Confirm that your ChatGPT account/workspace permits developer-mode MCP connections and that you
  can access [Platform Tunnels](https://platform.openai.com/settings/organization/tunnels).
  Availability and UI labels depend on OpenAI's rollout and workspace policy; check the current
  [developer-mode requirements](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)
  if an option is missing.

Connecting authorizes ChatGPT to use the Sink's exposed capabilities and receive returned content.
Only connect an instance whose information you intend to share with that ChatGPT account/workspace.
The Sink PAT is not a per-user data-isolation boundary. Keep the tunnel machine and its credentials
under your control; someone who obtains the PAT can invoke the Sink if they can reach its endpoint.

Keep these credentials distinct:

| Value                         | Purpose                                                   | Where it belongs                                                            |
| ----------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| InKCre `JWT_SECRET`           | Signs administrator requests to create and enable a Sink. | Local setup only; never enter it into ChatGPT or tunnel settings.           |
| MCP Sink PAT                  | Admits calls to this MCP endpoint.                        | Sink configuration and the tunnel client's downstream Authorization header. |
| OpenAI tunnel runtime API key | Lets the client use the provisioned tunnel.               | Tunnel client; not the Sink config.                                         |

## 1. Create and enable the MCP Sink

Create a new random PAT in your password manager and save it. Do not reuse `JWT_SECRET` or an OpenAI
key. If you already have an enabled MCP Sink and its PAT, reuse them and skip this step.

In a private local folder, save this as `create-mcp-sink.py`. Activate the CLI's Python environment
and run `python create-mcp-sink.py`. The prompts hide both secrets; nothing is stored in the script.

```python
import getpass
import time

import httpx
import jwt

core_url = input("Core HTTPS URL: ").strip().rstrip("/")
if not core_url.startswith("https://"):
    raise ValueError("Use your trusted Core HTTPS URL, not the PostgREST URL")
secret = getpass.getpass("InKCre JWT_SECRET: ")
pat = getpass.getpass("New MCP Sink PAT from your password manager: ")
if not secret or not pat:
    raise ValueError("Both credentials are required")
issued = int(time.time()) - 5
token = jwt.encode(
    {"role": "authenticated", "iss": "inkcre-peer", "aud": "inkcre-api",
     "iat": issued, "exp": issued + 900},
    secret, algorithm="HS256",
)
with httpx.Client(timeout=30, headers={"Authorization": f"Bearer {token}"}) as client:
    created = client.post(f"{core_url}/sinks", json={
        "type": "core.mcp.v1", "nickname": "ChatGPT", "config": {"pat": pat},
    })
    created.raise_for_status()
    sink_id = created.json()["id"]
    print(f"Created Sink ID: {sink_id}; retain this ID before continuing.")
    enabled = client.post(f"{core_url}/sinks/{sink_id}/enable")
    enabled.raise_for_status()
    print(f"MCP endpoint: {core_url}/sinks/{sink_id}/mcp")
```

Save the printed Sink ID and MCP endpoint. Enabling applies to the Core Peer you contacted. Append
the Sink path to the Core base URL, not the PostgREST URL.

If a request times out or enabling fails, inspect the existing Sink before repeating creation: the
first write may already have succeeded. You can use authenticated `GET /sinks` and
`POST /sinks/{id}/enable` with the same short-lived Bearer JWT pattern. Do not publish a Sink
management response; it can contain configuration credentials. The authoritative API and lifecycle
details are in
[MCP Sink Operations](https://github.com/InKCre/core-py/blob/main/docs/40-deployment/mcp-sink.md).

## 2. Provision a tunnel and install its client

1. Open [Platform Tunnels](https://platform.openai.com/settings/organization/tunnels) in the
   organization associated with your ChatGPT account/workspace. Create a tunnel and retain its
   `tunnel_id`. If tunnel creation is unavailable, ask the organization administrator for access.
2. Obtain a runtime API key whose principal can **Read** and **Use** that tunnel. Creating tunnels
   needs **Manage** permission; do not use an admin API key for the long-running client.
3. Download the supported `tunnel-client` for your operating system from the Tunnels page, extract
   it, and place the executable on your `PATH`. Verify `tunnel-client --version` in a terminal.

The
[official tunnel onboarding guide](https://github.com/openai/tunnel-client/blob/master/docs/onboarding.md)
owns account setup, downloads, and permissions. Keep the tunnel in the organization/workspace that
your ChatGPT session can access; an otherwise healthy tunnel in another account will not appear.

## 3. Start the tunnel client

The following commands use **Bash** on macOS/Linux or in WSL on Windows. Run `bash` first if your
terminal uses another shell. Enter secrets at the hidden prompts instead of pasting them into
commands saved in shell history:

```bash
read -r -s -p 'MCP Sink PAT: ' INKCRE_MCP_PAT; printf '\n'
export INKCRE_MCP_AUTHORIZATION="Bearer $INKCRE_MCP_PAT"
unset INKCRE_MCP_PAT
read -r -s -p 'OpenAI tunnel runtime API key: ' CONTROL_PLANE_API_KEY; printf '\n'
export CONTROL_PLANE_API_KEY

tunnel-client run \
  --control-plane.tunnel-id='YOUR-TUNNEL-ID' \
  --control-plane.api-key='env:CONTROL_PLANE_API_KEY' \
  --mcp.server-url='https://YOUR-CORE-HOST/sinks/YOUR-SINK-ID/mcp' \
  --mcp.extra-headers='Authorization: env:INKCRE_MCP_AUTHORIZATION' \
  --mcp.discovery-extra-headers='Authorization: env:INKCRE_MCP_AUTHORIZATION' \
  --health.listen-addr='127.0.0.1:8080'
```

Replace the tunnel ID and server URL before running. The environment value contains the complete
`Bearer <PAT>` header value: the `env:` reference does not add the Bearer prefix. Both header flags
are needed because discovery/probes and regular calls reach the protected Sink separately. See the
[tunnel configuration reference](https://github.com/openai/tunnel-client/blob/master/docs/configuration.md).

Wait until the tunnel client reports that it is ready. Its local diagnostics UI is available from
the loopback address shown in its output. If port 8080 is occupied, choose another loopback port in
the command. Keep this listener local; do not expose its UI as the MCP endpoint. Core must remain
reachable too, including when hosted on a sleeping plan.

## 4. Add the connection in ChatGPT

1. In ChatGPT, enable **Developer mode** in **Settings → Security and login**. Some workspace
   interfaces expose it through Apps settings instead; follow the linked developer-mode help for
   your account if the labels differ.
2. Open [ChatGPT Plugins](https://chatgpt.com/plugins), select the add button, and name the
   connection `InKCre`. Under **Connection**, choose **Tunnel** and select your tunnel or enter its
   ID.
3. Create the connection and review its discovered tools. If your interface offers **Scan Tools**,
   run it. Expect InKCre tools such as `inkcre_recall` and `inkcre_read_blocks`, not the tunnel
   client's embedded demo tools. Do not paste the InKCre JWT secret into ChatGPT.
4. Start a new chat using **Try in chat**, or select InKCre in the message's tools menu.

These steps follow OpenAI's
[connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt). This is a private
developer-mode connection, not publication in a public plugin directory.

## 5. Verify a real retrieval

Choose an item that you already found with the CLI and ask:

> Use InKCre to search for “[a distinctive phrase from my saved item]” using lexical retrieval. Read
> the most relevant result, summarize it, and cite its original source. Do not change my data.

Confirm that ChatGPT actually calls InKCre tools, reads the expected item, and grounds its answer in
that content. A plausible answer without a tool call is not a connection test. Select InKCre again
for a later message that needs new retrieval; do not assume selection persists across messages.

The previous InKCre acceptance exercised real ChatGPT tool calls through this tunnel path. It did
**not** establish automatic Skill import or proactive use: the server's `use-inkcre` Skill was
readable by an MCP client, but the tested ChatGPT scan did not import it. Treat discovered tools and
a successful real task as the checkpoint, not the presence of a Skill. Semantic retrieval separately
requires an embedding configuration; an unavailable semantic mode does not invalidate lexical
results.

## Troubleshooting and stopping access

| Symptom                                    | What to check                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Tunnel is not selectable                   | Match the Platform organization and ChatGPT account/workspace; verify tunnel permissions. |
| Sink responds `401`                        | Check the PAT and complete Bearer prefix in both runtime and discovery headers.           |
| Sink responds `404`                        | Check Sink ID, Core origin, and whether it is enabled on that Peer.                       |
| Local tunnel readiness fails               | Inspect its local UI/logs, runtime-key permissions, and reachability of Core.             |
| Tools appear but ChatGPT does not use them | Attach InKCre to that message and request a known-item retrieval explicitly.              |
| Search finds nothing                       | Repeat the CLI search and index maintenance from [Find What You Saved](/guide/search).    |

Refresh the ChatGPT connection after changing server tool metadata, then test in a new chat.
Stopping `tunnel-client` interrupts this tunnel path; closing its terminal or sleeping its host does
the same. Remove the connection from ChatGPT when no longer needed. To revoke the endpoint itself,
you can call authenticated `POST /sinks/{id}/disable`; disable before deleting a Sink. For a leaked
PAT, rotate the Sink config and update the tunnel environment before restarting it. Never disable
PAT authentication just to make discovery pass.
