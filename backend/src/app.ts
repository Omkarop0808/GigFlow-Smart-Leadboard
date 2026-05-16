import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(morgan(env.isProduction ? "combined" : "dev"));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Smart Leads API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
