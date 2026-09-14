# Grok Bot client acceptance

## Release status

The hosted Agent Doorbell OAuth/MCP connection has been verified in the pilot. The plugin package uses the documented Cursor multi-plugin format. Installation from an approved public marketplace listing and the complete fresh-installation journey remain pending.

The service is invitation-only. A successful direct MCP connection or webhook probe does not establish marketplace installation. Public repository hosting is separate from submission, review, approval, and hosted-client acceptance.

## Acceptance checklist

- Install the actual published package in hosted Grok Bot and verify its setup and wakeup skills are available.
- Complete browser OAuth with read and management permission. Verify the installed plugin supplies its tools independently of any previously configured standalone MCP connection.
- List owned notifiers, inspect one by its returned ID, and read delivery history.
- Verify the six supported tools: list_notifiers, get_notifier, get_delivery_history, update_notifier_rule, pause_notifier, and resume_notifier. Account authorization and destination setup remain website operations.
- On a dedicated test notifier, verify rule replacement, pause and resume, preserving the original configuration. Paused activity is not replayed.
- Create or reuse the intended active webhook routine and configure its generated URL/key through the website's secure fields.
- Send a synthetic destination test and verify acknowledgement by signal ID, without mailbox work or outbound messages.
- Send an authorized matching email from a different account and verify a non-synthetic wakeup in the intended routine. Check the event envelope and separately authorized mailbox access.
- Check malformed/missing payload guidance, an inaccessible notifier, and an actionable destination failure. Restore temporary test changes.
- Record webhook acceptance, routine start, and completed work separately. A delivery receipt is not evidence of completed Bot work.

Keep test identities, credentials, authorization URLs, mailbox content, and internal diagnostic evidence out of public reports. Maintain dated private release evidence and publish only supported capability statements and release status.

## References

- [Plugin reference](https://cursor.com/docs/reference/plugins)
- [Connect plugins](https://cursor.com/help/grok-bot/connect-plugins)
- [Webhook routines](https://cursor.com/help/grok-bot/routines)
