# Agent Doorbell plugins

Agent integrations for [Agent Doorbell](https://agentdoorbell.com), which wakes an agent when new Gmail activity matches a notifier's rule.

| Package | Platform | Status |
| --- | --- | --- |
| [Agent Doorbell](plugins/grokbot/README.md) | Grok Bot / Cursor plugin format | Prepared for client testing; marketplace listing and authenticated Grok Bot acceptance pending |

The remote MCP endpoint is `https://agentdoorbell.com/mcp`. Sign in through OAuth; no service API key is needed. The hosted service currently requires a pilot invitation.

## Repository layout

Each platform integration lives in `plugins/<platform>/` with its own manifest, connection configuration, skills, and README. The root `.cursor-plugin/marketplace.json` indexes packages using the Cursor format. Add future platform packages independently and document their actual installation and authentication requirements. Only the package listed above exists today.

## Develop and validate

Node.js 24 or newer is required. There are no npm dependencies.

```sh
npm run validate
npm run check:live
npm run pack:plugin
```

Validation checks package paths, MCP configuration, variables and skill frontmatter. The live check reads public OAuth metadata and verifies unauthenticated MCP requests are rejected. Packaging copies only the Grok Bot package to `.local/`. These checks do not establish authenticated client compatibility.

See [client acceptance](docs/client-acceptance.md) for the remaining installation and OAuth checks. Public source hosting is separate from marketplace submission and approval. No marketplace listing has been submitted by this repository setup.

## Scope

The plugin exposes six notifier-management tools. Creating notifiers, connecting Gmail accounts and configuring webhook destinations happen on the website. Mailbox access for the receiving agent is authorized separately. Webhook acceptance means the destination accepted a signal, not that the agent completed its task.

This repository contains distributable integrations only. Server implementation, deployment configuration and customer data are maintained separately. No open-source license has been selected; public visibility alone does not grant a general license to reuse the code.

## References

- [Cursor plugin and multi-plugin manifest reference](https://cursor.com/docs/reference/plugins)
- [Grok Bot plugin connections](https://cursor.com/help/grok-bot/connect-plugins)
