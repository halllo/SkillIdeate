# Project Context

- **Owner:** Manuel Naujoks
- **Project:** SkillIdeate — web app that suggests and drafts agent skills based on rough workflow descriptions
- **Stack:** TBD
- **Created:** 2026-06-14

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- 2026-06-14: The primary product loop is a single-page React flow: collect a workflow description, call `POST /api/skills`, and show empty/loading/error/results states around generated candidates.
