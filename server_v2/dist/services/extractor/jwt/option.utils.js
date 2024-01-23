"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opts = void 0;
//JWT Options
const cookie_extractor_1 = require("../cookie/cookie_extractor");
exports.opts = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: cookie_extractor_1.cookieExtractor,
    secretOrKey: "SECRET_KEY",
};
