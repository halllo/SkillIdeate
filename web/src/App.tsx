import { type FormEvent, useState } from "react";

import SkillList, { type SkillCandidate } from "./components/SkillList";

const pageStyle = {
  backgroundColor: "#ffffff",
  color: "#0f172a",
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  margin: "0 auto",
  maxWidth: "960px",
  minHeight: "100vh",
  padding: "3rem 1.5rem 4rem",
} as const;

const panelStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #d0d7de",
  borderRadius: "16px",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  padding: "1.5rem",
} as const;

export default function App() {
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<SkillCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      setSkills([]);
      setError("Please describe a workflow before generating skills.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: trimmedDescription }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Request failed");
      setSkills(Array.isArray(data.skills) ? data.skills : []);
    } catch (submitError) {
      setSkills([]);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while generating skills.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={pageStyle}>
      <header style={{ marginBottom: "2rem" }}>
        <p
          style={{
            color: "#2563eb",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            margin: "0 0 0.75rem",
            textTransform: "uppercase",
          }}
        >
          SkillIdeate
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 0.75rem" }}>
          Turn rough workflows into agent skill candidates
        </h1>
        <p
          style={{
            color: "#475569",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "720px",
          }}
        >
          Describe a workflow, generate draft skills, and refine the output into reusable
          automations.
        </p>
      </header>

      <section style={panelStyle}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div>
            <label
              htmlFor="workflow-description"
              style={{ display: "block", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}
            >
              Workflow description
            </label>
            <textarea
              id="workflow-description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                if (error) {
                  setError(null);
                }
              }}
              placeholder="Describe your workflow... e.g. when a customer files a support ticket, classify it, look up their account, and draft a reply"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "12px",
                boxSizing: "border-box",
                color: "#0f172a",
                fontFamily: "inherit",
                fontSize: "1rem",
                lineHeight: 1.6,
                minHeight: "120px",
                padding: "0.9rem 1rem",
                resize: "vertical",
                width: "100%",
              }}
            />
          </div>

          <div style={{ alignItems: "center", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "#93c5fd" : "#2563eb",
                border: "none",
                borderRadius: "999px",
                color: "#ffffff",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "0.95rem",
                fontWeight: 600,
                padding: "0.8rem 1.35rem",
              }}
            >
              {isLoading ? "Generating..." : "Generate skills"}
            </button>
            <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Drafts are generated from your workflow description.
            </span>
          </div>
        </form>
      </section>

      <section style={{ marginTop: "1.25rem" }}>
        {isLoading ? (
          <div
            role="status"
            style={{
              ...panelStyle,
              alignItems: "center",
              color: "#1e40af",
              display: "flex",
              gap: "0.75rem",
              padding: "1rem 1.25rem",
            }}
          >
            <span aria-hidden="true" style={{ fontSize: "1.25rem" }}>
              ⏳
            </span>
            <span>Generating skills…</span>
          </div>
        ) : error ? (
          <div
            role="alert"
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "12px",
              color: "#991b1b",
              padding: "1rem 1.25rem",
            }}
          >
            <strong style={{ display: "block", marginBottom: "0.25rem" }}>Could not generate skills</strong>
            <span>{error}</span>
          </div>
        ) : skills.length > 0 ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <h2 style={{ margin: "0 0 0.35rem" }}>Generated skills</h2>
              <p style={{ color: "#64748b", margin: 0 }}>
                Review the generated candidates and use them as a starting point for implementation.
              </p>
            </div>
            <SkillList skills={skills} />
          </div>
        ) : (
          <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0, padding: "0.25rem 0.25rem 0" }}>
            Describe a workflow above to generate skill candidates.
          </p>
        )}
      </section>
    </main>
  );
}
