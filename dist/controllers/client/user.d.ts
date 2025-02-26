import { Request, Response, NextFunction } from "express";
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
