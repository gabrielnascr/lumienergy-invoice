import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../core/errors/HttpError";

export function errorHandlerMiddleware(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}
