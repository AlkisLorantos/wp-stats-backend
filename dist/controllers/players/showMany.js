"use strict";
// import { Request, Response } from "express";
// import { getPlayers } from "../../services/player";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMany = void 0;
const player_1 = require("../../services/player");
const validParamKeys = {
    position: String,
    cap_number: Number,
    team_id: Number,
    nationality: String,
    age: Number,
};
const queryToFieldMap = {
    cap_number: "capNumber",
    team_id: "teamId",
};
const convertType = (key, value) => {
    const paramType = validParamKeys[key];
    if (paramType === Number) {
        const convertedValue = Number(value);
        if (isNaN(convertedValue))
            throw new Error(`Invalid value for ${key}`);
        return convertedValue;
    }
    return typeof value === "string" ? value.toUpperCase() : value;
};
const showMany = async (req, res) => {
    try {
        let errors = [];
        const params = {};
        Object.keys(req.query).forEach((param) => {
            if (!(param in validParamKeys)) {
                errors.push(param);
                return;
            }
            const field = queryToFieldMap[param] || param;
            try {
                params[field] = convertType(param, req.query[param]);
            }
            catch (error) {
                errors.push(`${param} (invalid value)`);
            }
        });
        if (errors.length !== 0) {
            return res.status(422).json({
                error: `Invalid parameters (${errors.join(", ")})`,
                accepted_parameters: Object.keys(validParamKeys).join(", "),
            });
        }
        const players = await (0, player_1.getPlayers)(params);
        return res.status(200).json({ data: players });
    }
    catch (error) {
        console.error("Error fetching players:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.showMany = showMany;
//# sourceMappingURL=showMany.js.map