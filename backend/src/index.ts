import app from "./app";
import { connectDatabase, runSeeds } from "./config/database";
import { env } from "./config/env";

const start = async () => {
  try {
    await connectDatabase();
    await runSeeds();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} [${env.nodeEnv}]`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
