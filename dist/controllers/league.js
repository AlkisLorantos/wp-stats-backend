"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const league_1 = require("./../services/league");
const create = async (req, res) => {
    const league = await (0, league_1.createLeague)(Object.assign({}, req.body));
    return res.status(201).json({
        message: "League created.",
        data: league
    });
};
exports.create = create;
//# sourceMappingURL=league.js.map