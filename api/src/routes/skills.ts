import OpenAI from "openai";
import { Router } from "express";

import {
  buildUserPrompt,
  SKILL_IDEATION_SYSTEM_PROMPT,
} from "../prompts/skill-ideation";
import type { Skill } from "../types/skill";

type SkillsRequestBody = {
  description?: string;
};

type SkillsResponseBody = {
  skills: Skill[];
};

const openAiApiKey = process.env.OPENAI_API_KEY;
const openAiBaseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
const modelName = process.env.MODEL_NAME ?? "gpt-4o-mini";

if (!openAiApiKey) {
  console.warn(
    "OPENAI_API_KEY is not configured. The API server will start, but /api/skills requests will fail until it is set.",
  );
}

const openai = openAiApiKey
  ? new OpenAI({
      apiKey: openAiApiKey,
      baseURL: openAiBaseUrl,
    })
  : null;

const router = Router();

router.post(
  "/",
  async (req, res): Promise<void> => {
    try {
      const { description } = req.body as SkillsRequestBody;

      if (!description || typeof description !== "string" || !description.trim()) {
        res.status(400).json({ error: "description is required" });
        return;
      }

      if (!openai) {
        res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
        return;
      }

      const completion = await openai.chat.completions.create({
        model: modelName,
        temperature: 0.7,
        max_tokens: 4000,
        messages: [
          {
            role: "system",
            content: SKILL_IDEATION_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: buildUserPrompt(description.trim()),
          },
        ],
      });

      const content = completion.choices[0]?.message?.content;

      if (typeof content !== "string" || !content.trim()) {
        res.status(500).json({ error: "Unexpected response format" });
        return;
      }

      let parsedSkills: unknown;

      try {
        parsedSkills = JSON.parse(content);
      } catch {
        res.status(500).json({ error: "Failed to parse AI response" });
        return;
      }

      if (!Array.isArray(parsedSkills)) {
        res.status(500).json({ error: "Unexpected response format" });
        return;
      }

      const response: SkillsResponseBody = {
        skills: parsedSkills as Skill[],
      };

      res.status(200).json(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown server error";
      res.status(500).json({ error: message });
    }
  },
);

export default router;
