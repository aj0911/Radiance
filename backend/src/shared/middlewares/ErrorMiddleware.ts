import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import ResponseHandler from "../utils/ResponseHandler";

const ErrorMiddleware = (
  err: ErrorHandler & { path?: string; code?: number; keyValue?: object | {} },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default values for status and message if not provided
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";

  // Handle Mongoose CastError (e.g., invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource Not Found, Invalid ${err.path}`, 400);
  }

  //Handle duplicate key error, if duplicate entry is added to database.
  if (err.code === 11000) {
    err = new ErrorHandler(
      `${Object.keys(err.keyValue || {})} already Exists.`,
      400
    );
  }

  // Send error response
  ResponseHandler(res, err.status, {
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
