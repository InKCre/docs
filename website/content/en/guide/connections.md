---
title: Manage Connections
description: Save named connections, switch instances, and keep each interface's target clear.
---

# Manage Connections

Save a connection for each instance you use, such as Personal, Work, or Test. Each interface keeps
its own list and current choice on your device. Reopening it restores that choice. Saving a
connection in the Web app does not configure the Mac app, browser extension, or CLI.

The procedures below describe versions with saved connections. If your interface has only a single
address field, update it before following the multiple-connection steps. The Mac app is currently
available as a development build.

## Web app

First-time setup is covered in [Connect the Web App](/guide/connect). To add another instance:

1. Open **Settings**, then select **Add connection** under **Connection**.
2. Enter a **Connection name**, **PostgREST URL**, and **JWT signing secret** for that instance.
3. Select **Save and use connection**. The app checks the candidate before saving it as current.
4. Open **Sources** or **Peers** and confirm that you are viewing the intended instance.

To switch back, choose a saved name in **Current connection**. Switching uses its saved settings and
Peer identity; you do not need to enter them again. To rename or update the current entry, edit its
fields and select **Save and use connection**. Use **Add connection** when the target should remain
a separate entry.

A failed connection check or save keeps the previously saved selection. If background participation
was stopped during the attempt, use **Retry** or save a working connection to resume it. A failed
switch does not prove that the old background runtime is still running.

Under **Backup and restore**, **Export** saves all connections, the current choice, and language.
**Import** replaces the browser's list with the imported list and selects its current connection
after validation. Older single-connection backups remain accepted. Export the current list before
importing if you need to keep it. Protect backup files: they contain every saved JWT secret and
restore browser configuration, not the contents of an instance.

## Mac app

1. Open **Settings** with `⌘,` and choose **连接** (Connection).
2. Select **添加连接…** (Add connection). Enter a name, PostgreSQL host, port, database, runtime
   role, and database password. The optional Web address is used to open shared information in a
   browser.
3. Keep TLS certificate verification enabled for remote databases, then select **保存** (Save).
4. Choose the saved name in **当前连接** (Current connection) to switch later. The main window's
   Peer page provides the same selector. Use **编辑连接…** (Edit connection) to update the current
   entry.

Mac uses native PostgreSQL and a dedicated admitted runtime role. Its password stays in macOS
Keychain; a Web JWT secret is not a database password. Saving selects the connection and starts a
background check, so a saved entry alone does not confirm connectivity. Inspect the Peer page for
connection errors.

Existing single-connection settings retain their identity and Keychain reference. Switching back
reuses that identity. Changing the database or runtime role creates a new connection while keeping
the previous entry available.

Switching clears the foreground directory selection and loads the chosen instance. Already queued
Capture submissions and existing local-directory monitors keep their original targets. They may
continue writing there. To stop a directory's monitoring, switch to its original connection and
pause or remove it separately.

## Browser extension

Open the extension's options page. Under **连接** (Connection), select **添加连接** (Add
connection), enter **连接名称** (Connection name) and **API 地址** (API address), then select
**保存并使用连接** (Save and use). Choose a saved name in **当前连接** (Current connection) to
switch. Editing the fields and saving updates the current entry. Other open extension pages observe
the saved choice.

These entries store the extension's existing compatible HTTP(S) API addresses. Use the endpoint
supported by that extension version; PostgREST and native PostgreSQL addresses are not substitutes.
Saving an address does not check that the remote API is available or change the extension's request
protocol. An existing single API address is retained as the first named entry.

## CLI and trusted Agents

The CLI already supports named connections to the Core REST API. Follow
[Connect the CLI](/guide/connect-cli) for installation and initial setup. To add Work alongside
Personal, create a private `work-connection.json` with Work's Core `base_url` and `jwt_secret`, then
run:

```sh
inkcre-cli connection set work --input work-connection.json
inkcre-cli connection list
inkcre-cli connection use work
inkcre-cli connection check
```

`connection use` changes the saved default. To use Personal for just one command without changing
that default:

```sh
inkcre-cli --connection personal connection check
```

Remove the temporary input file when finished and protect the saved
`~/.inkcre/cli/connections.json`, which contains credentials. Connection selection configures the
CLI only; it does not retarget the server it contacts.

## Keep targets distinct

Switching does not move or merge information between instances, cancel work already submitted, or
retarget work with a saved destination. Check the current name and address before submitting new
information. Each interface uses its own protocol and credentials even when it reaches the same
information.

Saved connections are recommended for Peers that people interact with directly. A fixed service
process, such as the `impl-py` server deployed for one instance, normally uses its deployment
configuration and does not need an interactive connection switcher. Its CLI is a separate interface
with its own local connection list.
