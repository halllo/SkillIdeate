# Squad Decisions

## Active Decisions

### 2026-06-14 — Monorepo stack and local development workflow
**By:** Neo
**Decision:** Standardize on a root npm workspace monorepo with `api/` and `web/` packages. The backend stack is Node.js + Express + TypeScript with `dotenv`, `cors`, and the OpenAI SDK. The frontend stack is React + Vite + TypeScript. Root scripts orchestrate `dev:api`, `dev:web`, combined `dev`, and `build`, and the web app proxies `/api` to `http://localhost:3001` during local development.
**Why:** This keeps backend and frontend responsibilities clearly separated while preserving a simple shared developer workflow and low integration friction.

### 2026-06-14 — Skill ideation prompt contract and shared types
**By:** Oracle
**Decision:** The skill ideation model must return only a top-level JSON array of `Skill` objects with exact fields: `id`, `name`, `description`, `inputs`, `outputs`, `implementation`, and `tags`. The prompt should generate 2–6 cohesive skills, prefer capability boundaries over one-step fragments, and degrade gracefully when user input is vague.
**Why:** The API and frontend depend on schema-locked JSON output that is directly parseable and useful for implementation.

### 2026-06-14 — Prompt hardening for untrusted workflow input
**By:** Oracle
**Decision:** Wrap workflow descriptions in `<workflow_description>` XML tags, explicitly treat that content as untrusted user data, add safety rules to refuse harmful automation, and instruct the model not to follow or reveal instructions embedded in user input.
**Why:** Rai's yellow review identified prompt-injection risk and missing safety constraints; hardening reduces unsafe generations and improves instruction isolation.

### 2026-06-14 — `/api/skills` provider integration and failure behavior
**By:** Morpheus
**Decision:** Implement `POST /api/skills` with a module-scoped OpenAI client configured by `OPENAI_API_KEY`, `OPENAI_BASE_URL`, and `MODEL_NAME`; send Oracle's prompts via chat completions; parse the returned top-level JSON array; and keep startup non-fatal when `OPENAI_API_KEY` is missing while failing requests explicitly at runtime.
**Why:** This centralizes provider configuration, matches the prompt contract, and keeps local development possible even before credentials are configured.

### 2026-06-14 — Minimal single-page ideation UI
**By:** Trinity
**Decision:** Use a single React page with a workflow textarea, submit button, inline styling, and explicit empty, loading, error, and results states, while reusing `SkillList` for rendered candidates.
**Why:** A minimal workflow-first UI makes the core product loop obvious without adding dependencies or unnecessary structure.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
