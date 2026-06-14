# Project Context

- **Owner:** Manuel Naujoks
- **Project:** SkillIdeate — web app that suggests and drafts agent skills based on rough workflow descriptions
- **Stack:** TBD
- **Created:** 2026-06-14

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- 2026-06-14: `POST /api/skills` validates `description`, calls the configured OpenAI chat completion model, parses a top-level JSON array, and stays startup-safe when `OPENAI_API_KEY` is missing by failing only at request time.
