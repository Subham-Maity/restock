"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const setCookie = (res, name, token, cookieOptions = {}) => {
    res.cookie(name, token, {
        ...cookieOptions,
    });
};
exports.setCookie = setCookie;
