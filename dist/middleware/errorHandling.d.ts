import { Request, Response, NextFunction } from "express";
declare class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
declare const errorHandling: (err: AppError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export { AppError, errorHandling };
