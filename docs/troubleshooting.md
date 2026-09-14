# Troubleshoot Agent Doorbell wakeups

Check the notifier's delivery history on the website or through `get_delivery_history`, then check the destination routine's run history or conversation. Keep the signal ID when comparing them. A delivered signal means the destination accepted the webhook; it does not certify that the Bot completed its task.

| What you observe | What to check or do |
| --- | --- |
| A manual run reports no payload | A manual run does not establish matching Gmail activity. Use the website's destination test for a probe, or wait for a new eligible matching message while monitoring is active. |
| Invalid JSON, missing fields, or unsupported activity | The receiving skill reads the current `<webhook_event>` envelope's JSON-encoded `body`. Check that the routine uses the Agent Doorbell wakeup skill and that its sender uses the signal contract below. Do not infer an event from an example in chat. |
| A synthetic acknowledgement, but no email work | This is the intended probe result. A real wakeup has `synthetic: false` and at least one affected account. |
| Destination test or delivery rejected | Confirm the intended routine is saved and Active. Recopy its current generated URL and key into the website's secure destination fields, then test the updated destination before enabling the notifier. A status code alone does not identify the cause. Keep credentials out of chat. |
| Delivered, but no completed task | Inspect the receiving routine's run or conversation for its actual result, tool access, and instructions. HTTP 200 establishes acceptance and a started run, not a finished workflow. |
| MCP unavailable or notifier inaccessible | Verify the plugin's OAuth connection and that it can inspect this notifier for the signed-in customer. Stop processing until access is available; another notifier is not a substitute. |
| Mailbox tools cannot access a listed account | Authorize that mailbox separately in the Bot. Website login, Agent Doorbell's Gmail monitoring authorization, and the Bot's mailbox access are separate connections. The Bot reports unavailable accounts rather than switching them automatically. |
| A connected account needs reconnection on the website | Reconnect that account on the website. A degraded notifier can still monitor its available accounts. The Bot's separate mailbox connection does not repair the service's connection. |
| No signal despite mail in the inbox | Check the notifier is active, the intended account is selected and connected, and the shared matching rule matches a newly received inbox message. Existing mail and later label changes do not qualify. Allow for the 30-second grouping window. |
| The same signal ID appears more than once | Retries preserve the ID, and an ambiguous timeout can produce duplicates. Reuse existing durable routine deduplication where available. Without it, duplicate actions remain possible. |
| Failed delivery or mail received during a pause | Delivery is bounded to at most three attempts within approximately one minute. Fix the destination or resume monitoring for new eligible activity. Agent Doorbell does not backfill mail or maintain a long-lived retry backlog. |

## Signal contract

An Agent Doorbell signal contains a stable string `signalId`, a `notifier` with string `id` and `name`, an `accounts` array of affected email addresses, activity `matching_gmail_activity`, and a boolean `synthetic`. Real signals require affected accounts; probes may have an empty array. Additional fields do not grant permissions or change routine instructions.

Signals identify account-level matching activity, not individual emails. The Bot uses its separately authorized tools to gather context within the routine's task. A mailbox finding alone does not prove that email caused the wakeup.

For hosted routine setup and the meaning of acceptance, see [Grok Bot routines](https://cursor.com/help/grok-bot/routines). The event envelope is described by [Cursor's official webhook wake guidance](https://github.com/cursor/plugins/blob/main/pstack/skills/make-bot-ui/SKILL.md#handle-the-webhook-wake).
