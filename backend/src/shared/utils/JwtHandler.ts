import { response, Response as ResponseExpressType } from "express";
import jwt from "jsonwebtoken";
import Response from "../../types/Response";

export default function JwtHandler(
  res: ResponseExpressType,
  statusCode: number,
  message: string,
  payload: any
): void {
  const token: string = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES,
  });
  const jsonBody: Response = {
    success: true,
    message,
    data: {
      token,
    },
  };
  res.status(statusCode).json(jsonBody);
}
