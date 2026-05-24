# Brand Registry

Canonical Git-backed registry of sourced, verified, versioned brand colour data.

This repo is the source of truth for the Brand Registry project. It stores brand records, JSON schemas, research notes, agent instructions, validation scripts, and generated export formats.

## Goals

- Keep brand colour data source-first and auditable.
- Separate candidate research from verified records.
- Preserve history instead of overwriting colours silently.
- Support agent-assisted research through issues and pull requests.
- Generate developer-friendly exports for CSS, SCSS, Tailwind, Figma Tokens, and JSON.

## Structure

```txt
data/brands/          Verified brand records and templates
schemas/              JSON schemas for registry data
research/             Brand-specific evidence, notes, and candidates
agents/               Codex/agent operating instructions
scripts/              Validation and export generation scripts
exports/              Generated output formats
```

## Source confidence model

| Confidence | Meaning |
|---|---|
| `official` | Found in official brand guidelines, design systems, or press kits |
| `derived` | Extracted from official vector/logo assets |
| `observed` | Observed from an official website/app when no official guide is available |
| `community` | Community submitted and not yet independently verified |

## Workflow

1. Open a brand research issue.
2. Add notes under `research/<brand>/`.
3. Update or create a record under `data/brands/`.
4. Run validation.
5. Open a pull request with evidence and change rationale.
6. Review before merge.

## Local development

```bash
yarn install
yarn validate
yarn build:index
```

## Related repo

The public web app lives in [`SmolSoftBoi/brand-registry-web`](https://github.com/SmolSoftBoi/brand-registry-web).
