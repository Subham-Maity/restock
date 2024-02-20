"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCondition = void 0;
const buildCondition = (req) => {
    let condition = {};
    if (!req.query.admin) {
        condition.deleted = { $ne: true };
    }
    return condition;
};
exports.buildCondition = buildCondition;
