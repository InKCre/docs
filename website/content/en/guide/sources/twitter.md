---
title: Twitter / X Bookmarks
description: Authorize an X account and collect its bookmarked posts.
---

# Twitter / X Bookmarks

This guide uses the official X API to collect your own bookmarks. Start with a
[connected CLI](/guide/connect-cli), a Core Host `0.2.x` instance with a public HTTPS URL, and an X
account containing a recent bookmark whose text you recognize.

You also need an X developer app with OAuth 2.0 user authorization and access to the required API
endpoints. API access can incur charges; check your app's access and billing before starting. The
[X Bookmarks documentation](https://docs.x.com/x-api/posts/bookmarks/introduction) owns provider
requirements. An app-only bearer token is not a substitute for authorizing your account.

## 1. Enable the Core Extension

```sh
inkcre-cli extension install inkcre/twitter --version 0.4.0
inkcre-cli extension enable inkcre/twitter
inkcre-cli source types
```

Look for `extensions.twitter.bookmark.Source`. If already installed, inspect
`inkcre-cli extension get inkcre/twitter` before changing it. Check the
[release listing](https://registry.inkcre.dev/v1/extensions/inkcre/twitter) for other Host versions.
This procedure does not require a browser-side Twitter Extension.

## 2. Connect your X account

Authorization belongs to the **Extension**, not an individual Source. All Twitter bookmark Sources
in this deployment use the connected account. Do not switch accounts to create a second user's
Source: that changes the account used by existing Sources too.

The CLI does not expose this Extension's OAuth setup commands. The following local script calls its
authenticated setup API. Use the Python environment from [Connect the CLI](/guide/connect-cli),
which already supplies `httpx` and `PyJWT`. If someone else operates Core, ask them to perform
setup; do not ask them to share their signing secret.

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
into X. Account tokens stay in the deployment, whose operator and admitted Peers are trusted.

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

To stop collection, disable its Cron first. An operator can disconnect the stored account using
authenticated `DELETE /twitter/setup/account` with the same request pattern above, and separately
revoke the app in X's account settings. Disconnecting does not delete previously collected data. The
alternate `twikit` backend exists, but its account-login mechanics are not this OAuth walkthrough.

Implementation reference:
[Twitter Extension](https://github.com/InKCre/core-py/tree/main/extensions/twitter).
