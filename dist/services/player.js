"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlayer = exports.updatePlayer = exports.getPlayers = exports.getPlayer = exports.createPlayer = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const createPlayer = async (data) => {
    const parsedData = Object.assign({}, data);
    for (const key in parsedData) {
        if (typeof parsedData[key] == 'string') {
            parsedData[key] = parsedData[key].toUpperCase();
        }
        ;
    }
    ;
    const player = await prisma_1.default.player.create({
        data: Object.assign({ name: `${parsedData.firstName} ${parsedData.lastName}` }, parsedData),
    });
    return player;
};
exports.createPlayer = createPlayer;
const getPlayer = async (name) => {
    try {
        const players = await prisma_1.default.player.findMany({
            where: {
                OR: [
                    { name: { equals: name.toUpperCase(), mode: "insensitive" } }, // Match Full Name
                    { firstName: { equals: name.toUpperCase(), mode: "insensitive" } }, // Match First Name
                    { lastName: { equals: name.toUpperCase(), mode: "insensitive" } } // Match Last Name
                ]
            }
        });
        return players;
    }
    catch (error) {
        console.error("Error fetching player:", error);
        throw error;
    }
};
exports.getPlayer = getPlayer;
const getPlayers = async (params) => {
    const players = await prisma_1.default.player.findMany({
        where: Object.assign({}, params),
    });
    return players;
};
exports.getPlayers = getPlayers;
const updatePlayer = async (id, data) => {
    const player = await prisma_1.default.player.update({
        where: { id: id },
        data: Object.assign({}, data)
    });
    return player;
};
exports.updatePlayer = updatePlayer;
const removePlayer = async (id) => {
    const player = prisma_1.default.player.delete({
        where: { id: id }
    });
    return player;
};
exports.removePlayer = removePlayer;
//# sourceMappingURL=player.js.map