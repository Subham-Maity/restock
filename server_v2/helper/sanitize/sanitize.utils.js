"use strict";
// Sanitize user object by removing password and salt
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = void 0;
const sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
};
exports.sanitizeUser = sanitizeUser;
