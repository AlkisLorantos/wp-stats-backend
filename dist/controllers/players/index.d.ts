import { Request, Response } from "express";
export declare const create: (req: Request, res: Response) => Promise<void>;
export declare const show: (req: Request, res: Response) => Promise<void>;
export declare const showMany: (req: Request, res: Response) => Promise<void>;
export declare const update: (req: Request, res: Response) => Promise<void>;
export declare const remove: (req: Request, res: Response) => Promise<void>;
