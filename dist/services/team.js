"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTeam = exports.updateTeam = exports.getTeams = exports.getTeam = exports.createTeam = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const createTeam = async (data) => {
    try {
        const team = await prisma_1.default.team.create({
            data: Object.assign({}, data)
        });
        return team;
    }
    catch (error) {
        console.error("Error creating team:", error);
        throw error;
    }
};
exports.createTeam = createTeam;
// export const getTeam = async (id: number) => {
//     if (id !== null) {
//         const team = await prisma.team.findUnique({
//             where: {
//                 id: id,
//             }
//         });
//         return team;
//     };
//     const teams = await prisma.team.findMany();
//     return teams;
// };
const getTeam = async (id) => {
    try {
        if (!id || isNaN(Number(id))) {
            throw new Error("Invalid or missing team ID");
        }
        const team = await prisma_1.default.team.findUnique({
            where: { id },
        });
        if (!team) {
            throw new Error("Team not found");
        }
        return team;
    }
    catch (error) {
        console.error("Error fetching team:", error);
        throw new Error(error.message);
    }
};
exports.getTeam = getTeam;
const getTeams = async () => {
    try {
        return await prisma_1.default.team.findMany();
    }
    catch (error) {
        console.error("Error fetching teams:", error);
        throw new Error("Failed to fetch teams");
    }
};
exports.getTeams = getTeams;
const updateTeam = async (id, data) => {
    try {
        if (!id || isNaN(Number(id))) {
            throw new Error("Invalid or missing team ID");
        }
        return await prisma_1.default.team.update({
            where: { id },
            data,
        });
    }
    catch (error) {
        console.error("Error updating team:", error);
        throw new Error(error.message);
    }
};
exports.updateTeam = updateTeam;
const removeTeam = async (id) => {
    try {
        if (!id || isNaN(Number(id))) {
            throw new Error("Invalid or missing team ID");
        }
        return await prisma_1.default.team.delete({
            where: { id },
        });
    }
    catch (error) {
        console.error("Error deleting team:", error);
        throw new Error("Failed to delete team");
    }
};
exports.removeTeam = removeTeam;
//# sourceMappingURL=team.js.map