# Named brand research agents

Named agents help make research ownership and scope clear. Use these names in issues, branches, research notes, and pull requests.

## General agents

| Agent name | Scope |
|---|---|
| `brand-research-agent` | General brand colour research and record updates |
| `brand-schema-agent` | Schema, validation, and data-model changes |
| `brand-export-agent` | Export generation for CSS, SCSS, Tailwind, Figma Tokens, and JSON |
| `brand-review-agent` | Independent review of sources, confidence, and conflicts |

## Implementation-specific agents

| Agent name | Scope |
|---|---|
| `codex-brand-research` | Codex-based implementation of the generic brand research workflow |
| `claude-brand-research` | Claude-based implementation of the generic brand research workflow |
| `chatgpt-brand-research` | ChatGPT-based implementation of the generic brand research workflow |
| `copilot-brand-research` | Copilot-style implementation of the generic brand research workflow |

## Brand-specific pattern

Use this format for focused research:

```txt
<brand-slug>-brand-research-agent
```

Examples:

```txt
shopify-brand-research-agent
github-brand-research-agent
apple-brand-research-agent
```

## Branch naming

```txt
agent/<agent-name>/<brand-slug>
```

Examples:

```txt
agent/shopify-brand-research-agent/shopify
agent/brand-schema-agent/source-confidence-rules
```

## Issue title pattern

```txt
Research brand colours: <Brand>
```

## PR title pattern

```txt
data: add/update <Brand> brand colours
```
