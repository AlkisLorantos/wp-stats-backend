import { Request, Response, NextFunction } from "express";


class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}


const errorHandling = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong",
        statusCode: err.statusCode || 500,
    });
};

export { AppError, errorHandling };
