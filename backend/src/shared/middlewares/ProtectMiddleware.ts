import { NextFunction, Request, Response } from "express";

const Protect =
  (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Executes the provided function and catches any errors, forwarding them to the next middleware.
    Promise.resolve(func(req, res, next)).catch(next);
  };

export default Protect;
