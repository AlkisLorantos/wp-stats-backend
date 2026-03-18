"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitAuth = exports.rateLimitGeneral = void 0;
const ratelimit_1 = require("@upstash/ratelimit");
const redis_1 = require("@upstash/redis");
const redis = new redis_1.Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const generalLimiter = new ratelimit_1.Ratelimit({
    redis,
    limiter: ratelimit_1.Ratelimit.slidingWindow(100, "1 m"),
    prefix: "ratelimit:general",
});
const authLimiter = new ratelimit_1.Ratelimit({
    redis,
    limiter: ratelimit_1.Ratelimit.slidingWindow(5, "1 m"),
    prefix: "ratelimit:auth",
});
const rateLimitGeneral = async (req, res, next) => {
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
    }
    catch (err) {
        next();
    }
};
exports.rateLimitGeneral = rateLimitGeneral;
const rateLimitAuth = async (req, res, next) => {
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
    }
    catch (err) {
        next();
    }
};
exports.rateLimitAuth = rateLimitAuth;
//# sourceMappingURL=rateLimit.js.map