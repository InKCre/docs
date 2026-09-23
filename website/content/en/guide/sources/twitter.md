---
title: Twitter / X Bookmarks
outline: false
description: Authorize an X account and collect its bookmarked posts.
---

# Twitter / X Bookmarks

This guide uses the official X API to collect your own bookmarks. Start with a
[connected interface](/guide/connect), a Core Host SDK `0.3.x` instance with a public HTTPS URL, and
an X account containing a recent bookmark whose text you recognize.

You also need an X developer app with OAuth 2.0 user authorization and access to the required API
endpoints. API access can incur charges; check your app's access and billing before starting. The
[X Bookmarks documentation](https://docs.x.com/x-api/posts/bookmarks/introduction) owns provider
requirements. An app-only bearer token is not a substitute for authorizing your account.

<InterfaceGuide>
<template #web>

## Use the Twitter setup wizard

The browser-side Twitter Extension provides a visual **Setup** wizard. You do not need the OAuth
script when that wizard is available with a compatible Core Extension.

Use `inkcre/twitter` version `0.4.1` with Core Host SDK `0.3.x` and a compatible Web Host. Both
Hosts use the same installed version: Core runs the Python collector, while the browser loads the
setup wizard from that release's Module Federation distribution. If browser enablement reports a
missing distribution, check the release publication and Registry configuration. Do not downgrade to
`0.3.0`: its Python package targets Core Host `0.1.x`.

### 1. Open Setup

1. [Prepare the Extension](/guide/extensions) on Core with name `inkcre/twitter` and version
   `0.4.1`, then enable it on Core.
2. In **Extensions**, choose **Enable…** on `inkcre/twitter`, select **This browser**, confirm, and
   click **Setup**.
3. Choose your online Core Peer in the wizard. Enable Twitter there if prompted. Core handles the
   callback and collection; browser enablement alone is insufficient.

![Twitter setup wizard showing the account-connection step](/images/client-web/twitter-setup.png)

_The wizard keeps preparation, account connection, Source selection, and review as separate steps._

### 2. Authorize your X account

1. Copy the callback URL displayed by the wizard. In your X developer app's authentication settings,
   configure OAuth 2.0 for a confidential web-app client, and register that URL exactly.
2. Enter the OAuth **Client ID** and **Client Secret** in the wizard—not the API Key/Secret. Save
   the application (**Save OAuth App**, or **Save application** in newer layouts).
3. Choose **Create authorization link**, then **Open X authorization**. Approve the intended X
   account in the new tab and return to the wizard. It observes the authorization result.
4. Verify the connected handle before continuing. Complete authorization within ten minutes.

Authorization is Extension-wide: all Twitter bookmark Sources in the deployment use this account.
Replacing the OAuth application can disconnect it; read the reset confirmation before proceeding.
Never paste your InKCre JWT secret into X. Keep provider credentials and authorization links
private.

### 3. Set up collection

1. Choose an existing **Bookmark Source**, or enter a nickname and choose **Create Bookmark
   Source**. Do not create another Source if the one you want already exists.
2. Choose **Collect bookmarks daily at**. The time is interpreted in Core's timezone, not
   necessarily your browser's timezone. Choose **Continue**.
3. Review the handle, Source and schedule, then explicitly choose **Start collecting bookmarks**.

The final action enables the schedule **and submits an immediate collection Job**. It does not mean
that Job has finished. Open the Source's Jobs in client-web, [inspect the run](/guide/collect), then
[index and search](/guide/search) for a recent bookmark. Do not add a second collection schedule
after using the wizard.

To disconnect later, stop its collection schedule first, then use **Disconnect** in the wizard's
account step. You can separately revoke the app in X. Neither action removes collected information.

</template>
<template #cli>

## 1. Enable the Core Extension

```sh
inkcre-cli extension install inkcre/twitter --version 0.4.1
inkcre-cli extension enable inkcre/twitter
inkcre-cli source types
```

Look for `extensions.twitter.bookmark.Source`. If already installed, inspect
`inkcre-cli extension get inkcre/twitter` before changing it. Check the
[release listing](https://registry.inkcre.dev/v1/extensions/inkcre/twitter) for other Host versions.
This CLI / Agent procedure does not require a browser-side Twitter Extension.

## 2. Connect your X account

Authorization belongs to the **Extension**, not an individual Source. All Twitter bookmark Sources
in this deployment use the connected account. Do not switch accounts to create a second user's
Source: that changes the account used by existing Sources too.

Prefer the visual wizard when a compatible browser release is available. For your Agent using this
path, the CLI does not expose OAuth setup commands. The following local script calls its
authenticated setup API. Use the Python environment from [Connect the CLI](/guide/connect-cli),
which already supplies `httpx` and `PyJWT`.

Save this as `connect-twitter.py`, then run `python connect-twitter.py`. It first prints the exact
callback URL. In your X app's user authentication settings, enable OAuth 2.0, choose a confidential
web-app client that provides a Client ID and Client Secret, and register that callback URL exactly.
Keep the script open while doing this. Use the OAuth Client ID/Secret, not API Key/Secret. See
[X's OAuth app settings](https://docs.x.com/fundamentals/authentication/oauth-2-0/authorization-code)
if you cannot find those fields.

```python
import getpass
import time

import httpx
import jwt

core_url = input("Core HTTPS URL: ").strip().rstrip("/")
if not core_url.startswith("https://"):
    raise ValueError("Use your trusted Core HTTPS URL, not PostgREST")
secret = getpass.getpass("InKCre JWT_SECRET: ")
if not secret:
    raise ValueError("JWT_SECRET is required")

with httpx.Client(timeout=30) as client:
    def request(method, path, **kwargs):
        issued = int(time.time()) - 5
        token = jwt.encode(
            {"role": "authenticated", "iss": "inkcre-peer", "aud": "inkcre-api",
             "iat": issued, "exp": issued + 900},
            secret, algorithm="HS256",
        )
        response = client.request(
            method, core_url + path,
            headers={"Authorization": f"Bearer {token}"}, **kwargs,
        )
        response.raise_for_status()
        return response.json()

    status = request("GET", "/twitter/setup")
    print("Register this callback URL in X:", status["callback_url"])
    if not status["connected"]:
        client_id = getpass.getpass("X OAuth Client ID: ").strip()
        client_secret = getpass.getpass("X OAuth Client Secret: ")
        if not client_id or not client_secret:
            raise ValueError("Both OAuth app credentials are required")
        request("PUT", "/twitter/setup/oauth-app", json={
            "client_id": client_id, "client_secret": client_secret,
        })
        transaction = request("POST", "/twitter/setup/oauth-transactions")
        print("Open this private authorization URL:", transaction["authorize_url"])
        input("Authorize in X; after the callback says connected, press Enter: ")
        result = request("POST", "/twitter/setup/oauth-transaction", json={
            "transaction_id": transaction["id"],
        })
        if result["status"] != "succeeded":
            raise RuntimeError(f"Authorization did not complete: {result['status']}")
        status = request("GET", "/twitter/setup")
    if not status["connected"]:
        raise RuntimeError("Account is not connected; inspect setup status")
    print("Connected account:", status["handle"])
```

Approve the account you intend to collect. The Extension requests `tweet.read`, `users.read`,
`bookmark.read`, and `offline.access` so it can refresh authorization. Complete the browser flow
within ten minutes. Keep credentials and the authorization URL private; never enter `JWT_SECRET`
into X. Account tokens stay in your deployment and are available to its admitted Peers.

If the callback URL is missing or wrong, fix the Core Peer's `http_public_base_url` before
proceeding; it must identify Core's public HTTPS origin, yielding `/twitter/auth/callback`. Starting
a new authorization supersedes the previous pending attempt. A request to replace an already
configured OAuth app may return HTTP 409: do not blindly enable `confirm_account_reset`, because
replacement disconnects the existing account.

## 3. Create and collect a Source

Save `twitter.json`:

```json
{
  "nickname": "My X bookmarks",
  "config": {}
}
```

```sh
inkcre-cli source create --type extensions.twitter.bookmark.Source --input twitter.json
```

Record the returned Source ID. Replace `42` with it and collect:

```sh
inkcre-cli source collect 42 --input-json '{"result_limit":40}'
```

Use the returned Job ID with [Run a Collection](/guide/collect), then
[index and search](/guide/search) for text from a recent bookmark. Once that works, add a
[schedule](/guide/schedules).

</template>
</InterfaceGuide>

**Scope:** an ordinary run reads one page, with `result_limit` from 5 to 100 (default 40), stopping
at the previously seen bookmark when present. This is not a guaranteed archive of all bookmarks,
folders, replies, or unbookmarks. The current `full` option also performs a single page fetch per
Job and does not automatically drain the entire history; do not treat it as a complete backfill.
Collect often enough for your usage and retain another copy of information you cannot afford to
lose.

## If setup or collection fails

- **404 on setup:** check the Core URL and whether this Extension is running on that Core Peer.
- **401:** check your InKCre connection for setup failures; reconnect X if the collection's provider
  authorization has expired or been revoked.
- **402/403 from X:** inspect app access, credits, permissions, and the authorized account.
- **429:** respect the provider's rate limit instead of repeatedly submitting Jobs.
- **Finished but no new items:** check the connected handle and bookmark a new recognizable post.

To stop collection, disable its Cron first. Your Agent can disconnect the stored account using
authenticated `DELETE /twitter/setup/account` using the CLI / Agent request pattern, and separately
revoke the app in X's account settings. Disconnecting does not delete previously collected data. The
alternate `twikit` backend exists, but its account-login mechanics are not this OAuth walkthrough.

Implementation reference:
[Twitter Extension](https://github.com/InKCre/core-py/tree/main/extensions/twitter).
