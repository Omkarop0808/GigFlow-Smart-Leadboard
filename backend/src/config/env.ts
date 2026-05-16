import dotenv from "dotenv";

dotenv.config();

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseInt(process.env.PORT ?? "5000", 10),
  mongodbUri: requireEnv("MONGODB_URI", "mongodb://localhost:27017/smart-leads"),
  jwtSecret: requireEnv("JWT_SECRET", "dev-secret-change-in-production"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin: (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(",").map((o) => o.trim()),
  seedAdminEmail: process.env.SEED_ADMIN_EMAIL,
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD,
  seedAdminName: process.env.SEED_ADMIN_NAME ?? "Admin User",
  seedDemoData: process.env.SEED_DEMO_DATA === "true",
  isProduction: process.env.NODE_ENV === "production",
};
