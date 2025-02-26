"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.fullAccessOnly = void 0;
// Middleware to Restrict Write Access to Full Access Users
const fullAccessOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "Full") {
        res.status(403).json({ message: "Forbidden: You need 'Full' access to modify data." });
        return;
    }
    next();
};
exports.fullAccessOnly = fullAccessOnly;
//Allow only Admins
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "Full") {
        res.status(403).json({ message: "Forbidden: Admins only." });
        return;
    }
    next();
};
exports.adminOnly = adminOnly;
//# sourceMappingURL=permissions.js.map