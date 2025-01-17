import { CorsOptions } from "cors";
import ErrorHandler from "../shared/utils/ErrorHandler";

const allowedOrigins: string[] = [
  process.env.FRONTEND_PROD_BASE_URL!, // Production frontend URL
  process.env.FRONTEND_DEV_BASE_URL!,  // Development frontend URL
];

const corsConfig: CorsOptions = {
  credentials: true, // Enables cookies and credentials
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the list of allowed origins
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg: string =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new ErrorHandler(msg,404), false);
    }

    // Allow the request if the origin is valid
    return callback(null, true);
  },
};

export default corsConfig;
