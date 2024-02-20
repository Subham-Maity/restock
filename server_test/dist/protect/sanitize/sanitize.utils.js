"use strict";
// Sanitize a user object by removing password and salt
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = void 0;
const sanitizeUser = (user) => {
    if (!user.id || !user.role) {
        throw new Error("User ID or role is undefined");
    }
    return { id: user.id, role: user.role };
};
exports.sanitizeUser = sanitizeUser;
