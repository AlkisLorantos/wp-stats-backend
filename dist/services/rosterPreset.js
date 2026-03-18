"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRosterPreset = exports.getPresetById = exports.getRosterPresets = exports.createRosterPreset = void 0;
const prisma_1 = require("../lib/prisma");
const createRosterPreset = async (teamId, name, roster) => {
    return await prisma_1.prisma.rosterPreset.create({
        data: {
            name,
            team: { connect: { id: teamId } },
            players: {
                create: roster.map((p) => ({
                    player: { connect: { id: p.playerId } },
                    capNumber: p.capNumber,
                })),
            },
        },
    });
};
exports.createRosterPreset = createRosterPreset;
const getRosterPresets = async (teamId) => {
    return prisma_1.prisma.rosterPreset.findMany({
        where: { teamId },
        include: {
            players: {
                include: { player: true },
            },
        },
    });
};
exports.getRosterPresets = getRosterPresets;
const getPresetById = async (presetId, teamId) => {
    return prisma_1.prisma.rosterPreset.findFirst({
        where: { id: presetId, teamId },
        include: {
            players: {
                include: { player: true },
            },
        },
    });
};
exports.getPresetById = getPresetById;
const deleteRosterPreset = async (presetId, teamId) => {
    const preset = await prisma_1.prisma.rosterPreset.findFirst({
        where: { id: presetId, teamId },
    });
    if (!preset)
        throw new Error("Preset not found or unauthorized");
    await prisma_1.prisma.rosterPresetPlayer.deleteMany({
        where: { presetId },
    });
    return prisma_1.prisma.rosterPreset.delete({
        where: { id: presetId },
    });
};
exports.deleteRosterPreset = deleteRosterPreset;
//# sourceMappingURL=rosterPreset.js.map