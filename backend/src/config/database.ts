import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "./env";
import { seedDemoData } from "./seedDemoData";
import { User } from "../models/User";

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.mongodbUri);
  console.log("MongoDB connected");
};

export const seedAdmin = async (): Promise<void> => {
  if (!env.seedAdminEmail || !env.seedAdminPassword) return;

  const exists = await User.findOne({ email: env.seedAdminEmail });
  if (exists) return;

  const hashedPassword = await bcrypt.hash(env.seedAdminPassword, 12);
  await User.create({
    name: env.seedAdminName,
    email: env.seedAdminEmail,
    password: hashedPassword,
    role: "admin",
  });
  console.log(`Seeded admin user: ${env.seedAdminEmail}`);
};

export const runSeeds = async (): Promise<void> => {
  await seedAdmin();
  if (env.seedDemoData) {
    await seedDemoData();
  }
};
