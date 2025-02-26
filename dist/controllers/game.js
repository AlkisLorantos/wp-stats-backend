"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStats = exports.create = void 0;
const game_1 = require("./../services/game");
const create = async (req, res) => {
    const game = await (0, game_1.createGame)(Object.assign({}, req.body));
    return res.status(201).json({
        message: "Game created.",
        data: game
    });
};
exports.create = create;
const createStats = async (req, res) => {
    const gameStat = await (0, game_1.createGameStat)(Object.assign({}, req.body));
    return res.status(201).json({
        message: "GameStat created.",
        data: gameStat
    });
};
exports.createStats = createStats;
//# sourceMappingURL=game.js.map