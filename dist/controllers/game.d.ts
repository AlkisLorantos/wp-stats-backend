import { Request, Response } from "express";
export declare const create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createStats: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
