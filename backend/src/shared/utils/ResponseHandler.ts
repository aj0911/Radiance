import { Response as ResponseExpressType } from "express";
import Response from "../../types/Response";

export default function ResponseHandler(
  res: ResponseExpressType,
  statusCode: number,
  jsonBody: Response
): void {
  res.status(statusCode).json(jsonBody);
}
