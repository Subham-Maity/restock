"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = void 0;
exports.cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //Token expiration time - 3 days
    httpOnly: true,
    secure: true,
    sameSite: "none",
    // maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days cookie age after that it will be expired automatically
    // You can add more options like domain, path, etc., based on your needs
};
