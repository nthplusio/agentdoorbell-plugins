# Agent Doorbell plugins

Agent integrations for [Agent Doorbell](https://agentdoorbell.com), which wakes a Bot when new Gmail activity matches a notifier's rule.

| Package | Platform | Distribution |
| --- | --- | --- |
| [Agent Doorbell](plugins/grokbot/README.md) | Grok Bot / Cursor plugin format | Public marketplace submission in preparation |

**The hosted service is invitation-only.** Installing the plugin does not grant pilot access or authorize Gmail. Sign in at [Agent Doorbell](https://agentdoorbell.com/app) with your invited email, then connect each Gmail account separately.

## What the plugin provides

- Browser OAuth connection to the hosted Agent Doorbell MCP service.
- Six tools to inspect existing notifiers and delivery history, update matching rules, and pause or resume monitoring.
- A setup skill for connecting a notifier to a saved active webhook routine.
- A wakeup skill that distinguishes synthetic connectivity probes from real matching Gmail activity.

A webhook routine receives Agent Doorbell signals. Plugin installation does not automatically create a routine or add a native event provider. The receiving Bot needs separate mailbox authorization to inspect mail. A delivered signal means the webhook accepted it; it does not mean the Bot completed its task.

## Install and configure

Public marketplace publication is pending. This repository is the distributable source, not an approved listing. For supported repository-based evaluation, see the [package instructions](plugins/grokbot/README.md). Hosted Grok Bot acceptance must be verified in that client; local CLI or IDE installation does not establish it.

The hosted MCP endpoint is `https://agentdoorbell.com/mcp`. Complete browser OAuth; do not paste access tokens or webhook keys into chat. Create notifiers, authorize Gmail, and configure destination credentials on the website.

## Develop and validate

Node.js 24 or newer is required. There are no npm dependencies.

```sh
npm run validate
npm run check:live
npm run pack:plugin
```

Validation checks configuration, package paths, branding, and skill frontmatter. The live check reads public OAuth metadata and verifies unauthenticated MCP requests are rejected. Packaging copies an allowlisted plugin bundle to `.local/`. These checks do not prove authenticated hosted-client acceptance.

Each platform package lives under `plugins/<platform>/`. The repository marketplace manifest indexes the currently supported Grok Bot package. Additional platform packages can be added independently.

See [client acceptance](docs/client-acceptance.md), [reviewer setup](docs/reviewer-setup.md), and [troubleshooting](docs/troubleshooting.md).

## Source and access

This repository contains distributable integrations only. Service implementation, deployment configuration, customer data, and private release evidence are maintained separately. No open-source license has been selected; public visibility alone does not grant a general license to reuse the code.

- [Cursor plugin reference](https://cursor.com/docs/reference/plugins)
- [Grok Bot plugin connections](https://cursor.com/help/grok-bot/connect-plugins)
