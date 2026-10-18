# n8n-nodes-botarmor

n8n node for **BotArmor AI**: crash-test your customer-service chatbot (a red-teaming audit of its live webhook), wait for the grade, and stop a workflow when the bot is below your threshold — a CI-style gate for no-code bots.

BotArmor tests bots you own, or that you have the owner's written permission to test. Every audit start asks you to confirm it.

## Install

In n8n: **Settings → Community Nodes → Install**, package name `n8n-nodes-botarmor`.

## Credentials

**BotArmor API**: a personal API key (`ba_live_…`) from the BotArmor dashboard, tab **API**. Revoke it there at any time.

## Operations

| Resource | Operation | What it does |
|---|---|---|
| Audit | Start | Starts a live audit of a registered agent (10–20 min). Returns `audit_code`. |
| Audit | Retest | Re-runs a finished audit with your patched prompt; the report shows before/after per scenario. |
| Audit | Get Status | `status` (running / completed / failed), `grade` (A–F), `gate.passed` against your minimum grade. With **Fail When Below Threshold**, the node errors (HTTP 412) on a weak bot and stops the workflow. |
| Audit | Get Many | Your audits, newest first. |
| Audit | Verify Report | Public check that a report is authentic, not altered, anchored and still current. |
| Agent | Get Many | Your registered agents (ids for Start). |

## Typical workflow

`Start` → `Wait 10 min` → `Get Status` → `IF status = running` (loop back through a 5-min `Wait`) → `IF gate.passed` → publish / alert.

A ready-made template is in [`templates/reaudit-on-prompt-change.json`](templates/reaudit-on-prompt-change.json): when the prompt cell of your bot changes in a Google Sheet, it retests the bot and posts the grade to Slack.

## Languages

Reports in English, French, German or Spanish (**Report Language**). The attacker speaks your bot's language: detected from its prompt by default, or set with **Bot Language** — a French agency can audit an English-speaking bot and get the report in French.

## Development

```bash
npm install
npm run build
```

No runtime dependencies: the node is declarative, each operation is one HTTPS call to the BotArmor API.

Releases are published from GitHub Actions through npm Trusted Publishing, with provenance: bump the version in `package.json`, commit, and push a tag `v<version>`. No npm token is stored anywhere.

## License

MIT
