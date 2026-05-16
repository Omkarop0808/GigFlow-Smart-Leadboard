import app from '../src/app';
import { connectDatabase, runSeeds } from '../src/config/database';
import { Request, Response } from 'express';

let isDbConnected = false;

export default async function handler(req: Request, res: Response) {
  if (!isDbConnected) {
    try {
      await connectDatabase();
      await runSeeds();
      isDbConnected = true;
      console.log("Database initialized for serverless function");
    } catch (error) {
      console.error("Failed to connect to database:", error);
      return res.status(500).json({ success: false, message: "Database connection failed" });
    }
  }
  
  // Delegate to Express app
  return app(req, res);
}
