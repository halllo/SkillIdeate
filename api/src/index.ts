import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import skillsRouter from "./routes/skills";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/skills", skillsRouter);

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
