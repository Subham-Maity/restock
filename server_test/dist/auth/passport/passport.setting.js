"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport_Session_Secret = void 0;
//✅ Passport Session Secret - Use in passport.ts
exports.Passport_Session_Secret = process.env.SESSION_SECRET || "keyboard cat";
