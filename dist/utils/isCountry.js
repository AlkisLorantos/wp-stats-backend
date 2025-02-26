"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isCountry;
const countryList = [
    'FR',
    'EN'
];
function isCountry(value) {
    return countryList.includes(value.toUpperCase());
}
;
//# sourceMappingURL=isCountry.js.map