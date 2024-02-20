"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const sanitize_utils_1 = require("../sanitize/sanitize.utils");
const isAdmin = (req, res, next) => {
    const user = (0, sanitize_utils_1.sanitizeUser)(req.user);
    if (user && user.role === "admin") {
        next();
    }
    else {
        res
            .status(403)
            .json({ message: "Forbidden: You do not have sufficient permissions" });
    }
};
exports.isAdmin = isAdmin;
