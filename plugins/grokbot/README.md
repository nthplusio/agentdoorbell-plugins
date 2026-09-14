# Agent Doorbell for Grok Bot

Manage your Agent Doorbell notifiers and handle account-level Gmail wake-up signals. This package uses the Cursor plugin format. The hosted OAuth/MCP connection works in the pilot; public marketplace listing and fresh installation acceptance remain pending. Hosted service access is invitation-only.

## Connect

1. Sign in at https://agentdoorbell.com/app using an invited email address. Connect Gmail and configure your notifier on the website.
2. Load this package through your client's supported plugin import. For a Cursor multi-plugin repository import, use `https://github.com/nthplusio/agentdoorbell-plugins`; the marketplace entry resolves to `plugins/grokbot`. A client requesting a standalone plugin directory should receive this directory's contents. Grok Bot's public documentation describes marketplace installation, but does not establish a private/custom repository import path.
3. Keep `NOTIFIER_MCP_URL` set to `https://agentdoorbell.com/mcp` unless using another trusted operator deployment.
4. Complete OAuth login and consent. Read operations require `notifiers:read`; edits also require `notifiers:manage`. Refresh access may require `offline_access`.
5. Ask the agent to list your notifiers and inspect delivery history. Follow the [client acceptance checklist](../../docs/client-acceptance.md).

Do not paste access tokens or routine keys into chat. Plugin installation does not create a routine webhook or grant Gmail access.

## Tools

- `list_notifiers`
- `get_notifier`
- `get_delivery_history`
- `update_notifier_rule`
- `pause_notifier`
- `resume_notifier`

Rule updates replace the shared rule; preserve conditions you did not intend to change. Resuming starts with new activity and does not replay paused mail. Use the website for notifier creation/deletion, account connections and destination changes.

## Skills and wake-ups

`skills/agentdoorbell/SKILL.md` describes setup and management. `skills/agentdoorbell-wakeup/SKILL.md` describes handling the receiving routine's actual POST payload. Synthetic signals acknowledge connectivity and stop. Real signals identify accounts, not individual messages. The receiving agent needs separate authorization to inspect those mailboxes and perform the user's task.

The plugin does not automatically register a webhook trigger. Configure the routine's actual generated webhook URL/key on the website and test that destination. Delivery history reports transport acceptance separately from agent completion.

See the [reviewer setup](https://github.com/nthplusio/agentdoorbell-plugins/blob/main/docs/reviewer-setup.md) and [troubleshooting guide](https://github.com/nthplusio/agentdoorbell-plugins/blob/main/docs/troubleshooting.md).
