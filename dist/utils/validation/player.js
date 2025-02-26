"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validatePlayer;
const isValidDate_1 = __importDefault(require("../isValidDate"));
const isCountry_1 = __importDefault(require("../isCountry"));
function validatePlayer(body) {
    const errors = [];
    if (!(0, isValidDate_1.default)(body.birthday)) {
        errors.push({ attribute: 'birthday', message: 'Invalid date format (dd/mm/yyyy)' });
    }
    ;
    if (!(0, isCountry_1.default)(body.nationality)) {
        errors.push({ attribute: 'nationality', message: 'Invalid country code' });
    }
    ;
    return errors;
}
;
//# sourceMappingURL=player.js.map