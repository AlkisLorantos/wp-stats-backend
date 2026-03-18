import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandling = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Something went wrong" : err.message;

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export { AppError, errorHandling };