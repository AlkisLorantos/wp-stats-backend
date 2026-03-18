"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompetition = exports.updateCompetition = exports.createCompetition = exports.getCompetitionById = exports.getCompetitions = void 0;
const prisma_1 = require("../lib/prisma");
const getCompetitions = async (teamId) => {
    return await prisma_1.prisma.competition.findMany({
        where: { teamId },
        orderBy: { name: "asc" },
    });
};
exports.getCompetitions = getCompetitions;
const getCompetitionById = async (id, teamId) => {
    return await prisma_1.prisma.competition.findFirst({
        where: { id, teamId },
        include: {
            games: {
                orderBy: { date: "desc" },
            },
        },
    });
};
exports.getCompetitionById = getCompetitionById;
const createCompetition = async (teamId, data) => {
    return await prisma_1.prisma.competition.create({
        data: {
            name: data.name,
            type: data.type,
            season: data.season,
            teamId,
        },
    });
};
exports.createCompetition = createCompetition;
const updateCompetition = async (id, teamId, data) => {
    const competition = await prisma_1.prisma.competition.findFirst({
        where: { id, teamId },
    });
    if (!competition)
        throw new Error("Competition not found or unauthorized");
    return await prisma_1.prisma.competition.update({
        where: { id },
        data,
    });
};
exports.updateCompetition = updateCompetition;
const deleteCompetition = async (id, teamId) => {
    const competition = await prisma_1.prisma.competition.findFirst({
        where: { id, teamId },
    });
    if (!competition)
        throw new Error("Competition not found or unauthorized");
    return await prisma_1.prisma.competition.delete({
        where: { id },
    });
};
exports.deleteCompetition = deleteCompetition;
//# sourceMappingURL=competition.js.map