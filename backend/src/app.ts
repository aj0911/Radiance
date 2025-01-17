import express, { Express } from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import ErrorMiddleware from "./shared/middlewares/ErrorMiddleware";
import http from 'http';
import UserRouter from "./modules/user/routes/userRouter";

/**
 * Express application setup with necessary middleware configurations.
 * 
 * - Body parsing with JSON and URL encoding.
 * - File upload handling with size limits.
 * - Error handling middleware.
 * - CORS middleware with custom configuration.
 * - Routes for user-related API operations.
 */
const app: Express = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Middleware to parse incoming body with a size limit of 200MB for JSON payloads.
 */
app.use(bodyParser.json({ limit: "200mb" }));

/**
 * Middleware to parse URL-encoded data with a size limit of 200MB.
 */
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

/**
 * Middleware for file uploads with a file size limit of 200MB.
 */
app.use(
  fileUpload({
    limits: { fileSize: 200 * 1024 * 1024 },
  })
);

/**
 * Mounting the UserRouter to handle user-related routes.
 * Prefixes all user routes with '/api/v1/user'.
 */
app.use('/api/v1', UserRouter);

/**
 * Middleware to handle errors that occur during request processing.
 */
app.use(ErrorMiddleware);

/**
 * Enabling Cross-Origin Resource Sharing (CORS) for all routes with custom settings.
 */
app.use("*", cors(corsConfig));

/**
 * Creating and exporting the HTTP server for the application.
 */
export const server = http.createServer(app);

/**
 * Export the app instance for testing or further configuration.
 */
export default app;
