# Grok Bot client acceptance

## Current evidence

The package uses the documented Cursor multi-plugin manifest format. Agent Doorbell is hosted at `https://agentdoorbell.com/mcp`. Browser login on the custom domain has been verified. Public OAuth discovery and unauthenticated MCP rejection can be checked with `npm run check:live`.

Actual Grok Bot import, OAuth consent and authenticated tool calls remain pending. A successful webhook test does not prove plugin compatibility. Cursor's publication workflow requires a public Git repository and review; creating this repository does not publish a marketplace listing.

## Checks in the actual client

- Import/install Agent Doorbell through a supported client workflow. Record the client name/version and installation path.
- Complete OAuth with read and management scopes. Record registration/protocol behavior without tokens or authorization URLs.
- List owned notifiers, inspect one by returned ID, and read delivery history.
- On a dedicated test notifier, verify rule replacement, pause and resume; preserve original conditions. Resume must not replay paused mail.
- Confirm exactly six management tools are exposed and website-only account/destination operations are absent.
- Attach the wake-up skill to a receiving routine through its supported mechanism. Confirm synthetic probes stop without mail access, and real events use separately authorized mailbox access.
- Check revocation and inaccessible-notifier behavior. Record sanitized results here before claiming support is verified.

The service currently supports MCP 2026-07-28, CIMD and authenticated dynamic client registration; anonymous DCR is disabled. Capture an actual client incompatibility before changing server authentication behavior.

## Sources

- https://cursor.com/docs/reference/plugins
- https://cursor.com/help/grok-bot/connect-plugins
- https://cursor.com/docs/grok-bot/work
