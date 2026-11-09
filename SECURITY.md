# Your GitHub token's security

*[Version française](SECURITE.md)*

GD Pocket needs a GitHub token to read and send your scripts. Here is how it is used and how to protect it.

## A limited token
Create a *fine-grained* token on GitHub: <https://github.com/settings/personal-access-tokens/new>
- limited to **only the repositories** you want to edit with GD Pocket;
- with only the **Contents: Read and write** permission;
- with an **expiration date**.

## Where it is kept
Only **on your device**, in the app's storage (localStorage). It is only sent to `api.github.com`, over HTTPS.

## What the app never does
No GD Pocket server, no account, no analytics, no ads. The code is public and can be checked in this repository. The “🐞 Report a problem” form never includes the token.

## Lost or sold phone
Revoke the token on GitHub (Settings › Developer settings › Personal access tokens), then create a new one.

## Expiration
Create a new token and paste it in Settings › 🔑 Tokens › Replace: every repository using it is updated.

## Limits
On a shared or unlocked device, anyone opening the app can use the token. One token per device lets you revoke just one.

## Reporting a vulnerability
Open an issue in [Issues](https://github.com/LutiinBlack/gd-pocket/issues) without including any token or private information.
