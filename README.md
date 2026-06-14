# SkillIdeate

> A web application that suggests and drafts agent skills based on rough workflow descriptions.

## What It Does

You describe a workflow in plain language — "when a customer files a support ticket, classify it, look up their account, and draft a reply" — and SkillIdeate proposes a set of concrete agent skills that could implement it, complete with names, descriptions, and draft implementations.

It bridges the gap between a vague idea and a working automation by turning natural language into structured, reusable skill definitions.

## How It Works

1. **Describe your workflow** — enter a rough, free-form description of what you want to automate
2. **Get skill candidates** — the app analyzes your description and suggests a breakdown of discrete agent skills
3. **Review and refine** — browse the generated skills, adjust names and scope, and download or copy the output

## Tech Stack

> The stack is still being decided. This section will be updated once architecture decisions are recorded in `.squad/decisions.md`.

## Development

This project is built by a [Squad](https://github.com/bradygaster/squad-cli) AI team:

| Agent | Role |
|-------|------|
| **Neo** | Lead / Architect |
| **Trinity** | Frontend Dev |
| **Morpheus** | Backend Dev |
| **Oracle** | AI / Prompt Engineer |
| **Scribe** | Documentation |
| **Ralph** | Work Monitor |
| **Rai** | Responsible AI Reviewer |

Squad configuration lives in `.squad/`. To contribute or run a Squad session, install the [Squad CLI](https://www.npmjs.com/package/@bradygaster/squad-cli):

```bash
npx @bradygaster/squad-cli@0.10.0
```

## License

[MIT](LICENSE)
