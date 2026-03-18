"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandling = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Something went wrong" : err.message;
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandling = errorHandling;
//# sourceMappingURL=errorHandling.js.map