"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// // **ADMIN: Approve a User**
// export const approveUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { userId } = req.body;
//         const user = await prisma.user.update({
//             where: { id: userId },
//             data: { approved: true }
//         });
//         return res.status(200).json({
//             message: "User approved successfully.",
//             user: { id: user.id, username: user.username, role: user.role, approved: user.approved }
//         });
//     } catch (error) {
//         next(error);
//     }
// };
const updateUserRole = async (req, res, next) => {
    try {
        const { userId, role } = req.body;
        // Validate Role Selection
        if (!["Read", "Full"].includes(role)) {
            res.status(400).json({ message: "Invalid role. Choose 'Read' or 'Full'." });
            return;
        }
        // Update User Role
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role }
        });
        res.status(200).json({
            message: "User role updated successfully.",
            user: { id: user.id, username: user.username, role: user.role }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserRole = updateUserRole;
//# sourceMappingURL=admin.js.map