# Reviewer setup

Agent Doorbell monitors newly received inbox activity from selected Gmail accounts and sends account-level signals to one Grok Bot webhook routine per notifier. It requests Gmail metadata access; the receiving Bot uses its own separately authorized mailbox tools.

## Prerequisites

- An invited Agent Doorbell customer identity. Coordinate required review access privately with the publisher; do not publish reviewer credentials or broaden the service allowlist implicitly.
- Access to hosted Grok Bot and its supported plugin installation flow.
- A Gmail account authorized for testing and a separate sender for the real-email check.

The public source is `https://github.com/nthplusio/agentdoorbell-plugins`. The repository marketplace entry selects the Grok Bot package. Follow the platform's supported repository/package selection during review; a CLI install is not evidence of hosted installation.

## Connect and configure

1. Open [Agent Doorbell](https://agentdoorbell.com) and sign in through its [application](https://agentdoorbell.com/app) with an invited identity.
2. Install the submitted package in the supported client. Keep the service endpoint at `https://agentdoorbell.com/mcp` and complete browser OAuth. Read operations require `notifiers:read`; management also requires `notifiers:manage`.
3. Ask the Bot to list your notifiers. Confirm the setup and wakeup skills are available and the plugin exposes the six documented management tools.
4. On the website, authorize Gmail separately. Create or reuse a notifier with selected connected accounts and a shared matching rule. Use a narrowly scoped test rule so unrelated mail does not wake the routine.
5. In the intended Grok Bot, create or reuse a routine with a Webhook trigger, save it, and leave it Active. Use the Agent Doorbell wakeup skill in the routine and give it an explicit task within the review's permitted actions.
6. Enter the routine's generated URL and key in the website's secure destination fields. Do not paste secrets into chat, issue comments, or repository files.
7. Test the destination. Compare the website's signal ID with the routine's synthetic acknowledgement. No mail should be inspected and nobody should be contacted for this probe.
8. Enable the notifier, send one matching email from the separate test sender, and verify a real wakeup with `synthetic: false`. Signals identify affected accounts, not individual messages. A grouped wakeup does not prove a particular email matched without further evidence.
9. Verify delivery history and routine history separately. Test missing mailbox access and a controlled destination failure, then restore the intended state and pause/remove dedicated test configuration when finished.

## Expected limitations

The service groups matching activity over 30 seconds, makes at most three delivery attempts within approximately one minute, and does not backfill missed or paused mail. Retries carry a stable signal ID; ambiguous timeouts can produce duplicates. Webhook acceptance ends Agent Doorbell's delivery responsibility and does not establish task completion.

The plugin does not create notifiers, authorize Gmail, retrieve destination secrets, or register a native Agent Doorbell trigger provider. See [troubleshooting](troubleshooting.md) and [client acceptance](client-acceptance.md).
