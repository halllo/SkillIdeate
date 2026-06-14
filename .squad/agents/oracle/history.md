# Project Context

- **Owner:** Manuel Naujoks
- **Project:** SkillIdeate — web app that suggests and drafts agent skills based on rough workflow descriptions
- **Stack:** TBD
- **Created:** 2026-06-14

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- 2026-06-14: The skill ideation prompt contract requires a top-level JSON array of `Skill` objects, and workflow descriptions must be wrapped in `<workflow_description>` tags and treated as untrusted input.
