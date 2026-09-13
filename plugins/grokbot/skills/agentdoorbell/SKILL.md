---
name: agentdoorbell
description: Set up Agent Doorbell, inspect Gmail notifiers and delivery history, change matching rules, or pause and resume monitoring. Use when the user asks to connect Agent Doorbell or manage its notifiers.
---

# Agent Doorbell

Use the Agent Doorbell MCP connection for notifier management. For an incoming wake-up, read `../agentdoorbell-wakeup/SKILL.md`.

## Connect and inspect

1. Use the configured Agent Doorbell MCP server. The hosted pilot endpoint is `https://agentdoorbell.com/mcp`. Complete the client's provider OAuth connection with the user; authentication happens in the browser. Request `notifiers:read`, plus `notifiers:manage` when management is wanted. Refresh access may require `offline_access`. Never ask the user to paste an access token into chat.
2. Call `list_notifiers` and identify the user's intended notifier. Call `get_notifier` with its exact `id` before editing. If names are ambiguous, ask which one.
3. If no notifier exists, direct the user to `https://agentdoorbell.com` (or the configured operator's website) to connect Gmail, create a notifier, choose accounts and a rule, and configure/test/activate its destination. These setup operations belong to the website. The MCP connection cannot create notifiers or authorize Gmail.
4. Confirm the requested operation using the returned state. For troubleshooting, call `get_delivery_history`; an accepted webhook does not establish that the receiving routine finished.

## Manage

Use only the tools exposed by the connected server:

- `list_notifiers`: list owned notifiers and selected account identities.
- `get_notifier` with `{ "id": "..." }`: inspect current configuration and state.
- `get_delivery_history` with `{ "id": "..." }`: inspect signal and attempt history.
- `update_notifier_rule` with `{ "id": "...", "rule": { ... } }`: replace the entire shared rule, prospectively. Read the current rule first and preserve conditions the user did not ask to change. Conditions are `senderAddresses`, `senderDomains`, `recipients`, and `subjectTexts`; each is an array. Omitted/empty arrays remove that condition. All configured condition types must match; alternatives inside a type use OR. Addresses/domains are exact; subject matching is literal and case-insensitive. An entirely empty rule matches all eligible new inbox mail.
- `pause_notifier` with `{ "id": "..." }`: stop future monitoring and cancel unsent work. An already dispatched request cannot be recalled.
- `resume_notifier` with `{ "id": "..." }`: start from current Gmail history. It requires connected selected accounts and a tested current destination; paused mail is not replayed.

If management returns an insufficient-scope challenge, reconnect through OAuth with management consent. If an account needs reconnection or the destination needs testing, send the user to the website. Keep Gmail tokens and destination keys in their secure setup flows.

## Routine destination

Agent Doorbell sends an authenticated HTTPS POST to the destination configured on the website. Use the actual routine's generated webhook URL and key. A plugin installation grants notifier tools; it does not by itself create a webhook trigger. The Cursor automation webhook is the working pilot receiver. Use its native incoming payload context; avoid invented template variables or API routes.

The Bot needs separate, authorized mailbox access to inspect mail. Check which mailbox that connection can access before promising work across multiple accounts. Finish by reporting the notifier's actual state, changes made, and any account or delivery issue that remains.
