---
title: Connect the CLI
description: Connect the command-line tool to an existing InKCre instance.
---

# Connect the CLI

You need a ready Core URL and the instance's private JWT secret from your deployment. Keep the
secret private; it grants full deployment authority, not a limited app session.

The CLI is primarily for your trusted Agent, and also supports manual terminal use. For your own
interactive setup, start with [Connect to Your Instance](/guide/connect) and choose the Web app. The
CLI connects over HTTPS; it does not run another server on your computer.

1. Install [Python](https://www.python.org/downloads/) 3.12 or later if needed. Check
   `python --version` in a terminal; use `python3` if that is your system's command name.
2. Create a local environment:

   ```sh
   python -m venv .venv
   ```

   Activate it with `source .venv/bin/activate` on macOS/Linux, or `.venv\Scripts\Activate.ps1` in
   Windows PowerShell. Then install the published CLI:

   ```sh
   python -m pip install inkcre-cli
   inkcre-cli --help
   ```

3. In a local folder outside any Git repository, use a text editor to create `connection.json`:

   ```json
   {
     "base_url": "https://YOUR-CORE-HOST",
     "jwt_secret": "YOUR-SAVED-JWT-SECRET"
   }
   ```

   Replace both values, preserving the quotes. Use the Core base URL without an endpoint path. This
   file contains a credential; keep it private.

4. From that folder, save and check the connection:

   ```sh
   inkcre-cli connection set personal --input connection.json
   inkcre-cli connection use personal
   inkcre-cli connection check
   ```

   Both readiness and the authenticated read should succeed. You can remove the temporary
   `connection.json` afterward: the CLI retains it at `.inkcre/cli/connections.json` in your home
   directory. Protect that file too.

**Checkpoint:** `connection check` can read your instance. For `401`, check the secret; for a
connection failure, check the Core URL and wake Core from Web app Settings. In later terminal
sessions, reactivate the environment before using `inkcre-cli`.

The [CLI reference](https://github.com/InKCre/core-py/blob/main/cli/README.md) owns command details.
`--help` explains a command; `--schema` on input-taking commands shows the configuration accepted by
your running instance.

Next: [Collect your first source](/guide/first-source).
