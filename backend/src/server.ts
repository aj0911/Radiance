import dotenv from "dotenv";
import { server } from "./app";
import MongoDBDatabase from "./config/database";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

/**
 * Handles uncaught exceptions in the process.
 * Logs the error and shuts down the process.
 */
process.on("uncaughtException", (err: Error) => {
  console.error(`Error: ${err.message}`);
  console.error(
    "Shutting down the server due to an uncaught exception."
  );
  process.exit(1);
});

// Initialize and connect to MongoDB
const _mongoDBDatabase: MongoDBDatabase = new MongoDBDatabase();
_mongoDBDatabase.connect();

server.listen(process.env.PORT, () => {
  console.log(
    `server is running on http://localhost:${process.env.PORT}`
  );
});

/**
 * Handles unhandled promise rejections in the process.
 * Logs the error and gracefully shuts down the server.
 */
process.on("unhandledRejection", (err: Error) => {
  console.error(`Error: ${err.message}`);
  console.error(
    "Shutting down the server due to an unhandled promise rejection."
  );
  server.close(() => {
    process.exit(1);
  });
});
