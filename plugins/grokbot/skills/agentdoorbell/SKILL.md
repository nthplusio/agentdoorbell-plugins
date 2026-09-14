---
name: agentdoorbell
description: Set up Agent Doorbell, inspect Gmail notifiers and delivery history, change matching rules, or pause and resume monitoring. Use when the user asks to connect Agent Doorbell or manage its notifiers.
---

# Agent Doorbell

Use the Agent Doorbell MCP connection for notifier management. For an incoming wake-up, read `../agentdoorbell-wakeup/SKILL.md`.

## Connect and inspect

1. Disclose that hosted Agent Doorbell access is invitation-only. Use the configured MCP connection and complete browser OAuth with the invited customer. Request `notifiers:read`, plus `notifiers:manage` for edits; refresh access may require `offline_access`. Keep access tokens out of chat.
2. Call `list_notifiers` and identify the intended notifier. Read it with `get_notifier` using its exact ID before editing. Resolve ambiguous names with the customer. Inspect existing routines in the intended hosted Grok Bot through available client capabilities or ask the customer to review them; establish whether the intended notifier and routine can be reused before creating either.
3. For setup, follow the website sequence below. For an existing notifier management request, use the tools under Manage. Confirm the returned state; an accepted webhook does not establish that its routine finished.

## Set up the website and routine

1. Open `https://agentdoorbell.com/app`. The customer signs in with their invited email, then separately authorizes each Gmail account they intend to monitor. Website login does not authorize Gmail or select the mailboxes. Completion: the intended connected accounts are listed and any required reconnection is resolved.
2. In the intended hosted Grok Bot, open the existing routine or create one if needed. Under **When to run**, select **Webhook**. Include the Agent Doorbell wakeup skill in the routine instructions alongside the customer's authorized task. Synthetic signals must acknowledge their signal ID and stop without mailbox inspection or outbound messages. Real mailbox work needs separately authorized mailbox tools. Completion: the customer has identified the exact receiving routine and its task.
3. Save the routine, set it to **Active**, and reopen it to retrieve its generated webhook URL and key. Use documented client capabilities only; the manual routine editor remains the fallback. Enter credentials directly into Agent Doorbell's secure website destination fields, never chat, skill text, or plugin configuration. See the [official routine instructions](https://cursor.com/help/grok-bot/routines) if the host's controls differ.
4. Reuse the intended notifier or create it inactive on the website. Select one or more connected accounts and its one destination. Configure the shared matching rule before enabling; an empty rule matches all eligible new inbox mail. For an existing destination change, pause first, save the new URL and key, and retest. Creation, account selection, Gmail authorization, and destination changes are website operations, outside these MCP tools.
5. Send the website's synthetic test after acknowledging that it wakes the Bot. Check delivery history and the receiving routine's acknowledgement of the same signal ID. Acceptance means the webhook accepted the request, not that the Bot completed a workflow. Completion: the current destination is tested and the receiving run acknowledged the synthetic signal without mailbox work.
6. Enable monitoring on the website (or resume an existing tested notifier with management consent), and confirm its returned state. Monitoring starts fresh without replaying prior mail. Report any selected account requiring reconnection and any unresolved delivery issue instead of claiming setup is complete.

If the test fails, check that the intended routine is saved and active. For rejected credentials, direct the customer to pause, replace credentials in the website, and retest before enabling. For accounts needing reconnection, use the website's Google authorization flow; a degraded notifier can continue monitoring healthy accounts. Keep secrets out of diagnostics. A manual dry run without a webhook payload is not a connectivity test.

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
