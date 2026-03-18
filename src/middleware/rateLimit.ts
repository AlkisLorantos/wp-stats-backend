import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Request, Response, NextFunction } from "express";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const generalLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  prefix: "ratelimit:general",
});

const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "ratelimit:auth",
});

export const rateLimitGeneral = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const identifier = Array.isArray(ip) ? ip[0] : ip;

  try {
    const { success, remaining, reset } = await generalLimiter.limit(identifier);

    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      res.status(429).json({ message: "Too many requests, please try again later" });
      return;
    }

    next();
  } catch (err) {
    next();
  }
};

export const rateLimitAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const identifier = Array.isArray(ip) ? ip[0] : ip;

  try {
    const { success, remaining, reset } = await authLimiter.limit(identifier);

    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      res.status(429).json({ message: "Too many attempts, please try again later" });
      return;
    }

    next();
  } catch (err) {
    next();
  }
};