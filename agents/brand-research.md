# Brand research agent instructions

These instructions apply to any agent researching brand colour records for Brand Registry, including Codex, Claude, ChatGPT, Copilot-style agents, and named specialist agents.

## Mission

Find current, source-backed brand colours and convert them into structured, reviewable records. Prioritise evidence quality over speed.

## Agent identity

Agents may identify themselves in research notes and PRs using a short name, for example:

- `codex-brand-research`
- `claude-brand-research`
- `chatgpt-brand-research`
- `brand-research-agent`
- `shopify-brand-research-agent`

Use named specialist agents when the scope is narrow, such as one brand, one source type, or one review pass.

## Source priority

1. Official brand guidelines
2. Official design system
3. Official press or media kit
4. Official logo/vector assets
5. Current official website or app UI
6. Trusted third-party sources for comparison only

## Required workflow

1. Search for official sources first.
2. Create or update `research/<brand-slug>/notes.md` with findings.
3. Record candidate colours in `research/<brand-slug>/candidate-colours.json` when evidence is incomplete.
4. Update `data/brands/<brand-slug>.json` only when the source trail is clear.
5. Run `yarn validate` before opening a PR.
6. Explain the evidence, confidence, agent name, and any conflicts in the PR body.

## Rules

- Never guess colour names.
- Never mark a colour as `official` without an official source.
- Use `derived` for colours extracted from official vector/logo assets.
- Use `observed` for colours taken from the current official website or app UI.
- Use `community` for unverified submissions.
- If sources conflict, set the brand status to `conflicting_sources` and explain why.
- Store source URLs, dates checked, notes, and extracted colour values.
- Preserve history. Do not silently delete old colours; use `validTo` or a history entry when appropriate.
- Keep PRs focused on one brand or one structural change.

## Research note template

```md
# <Brand> research notes

Agent: <agent-name>
Date checked: YYYY-MM-DD
Status: candidate | verified | needs_review | conflicting_sources

## Summary

Briefly explain what was found and what changed.

## Sources checked

| Source | Type | Result | Notes |
|---|---|---|---|
| <url> | brand_guidelines | usable | Official colours listed. |

## Candidate colours

| Name | Hex | Role | Confidence | Source |
|---|---|---|---|---|
| <Colour name> | #000000 | primary | official | <source-id> |

## Conflicts or uncertainty

List any conflicts, outdated references, missing guidance, or assumptions.
```

## PR checklist

- [ ] Agent name is included in the PR body or research note.
- [ ] Sources are official where possible.
- [ ] Every colour has a `sourceId`.
- [ ] Every `sourceId` exists in `sources`.
- [ ] Confidence values are justified.
- [ ] `lastCheckedAt` or `lastVerifiedAt` is updated.
- [ ] Validation passes.
