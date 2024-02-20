"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = exports.LoginSchema = void 0;
const z = __importStar(require("zod"));
exports.LoginSchema = z.object({
    email: z
        .string()
        .email("Invalid Email...! 😣")
        .min(1, "Email Required...! 😣"),
    password: z
        .string()
        .min(8, "😬 Password is too short - should be 8 chars minimum.")
        .max(100, "😱 Password is too long - should be 100 chars maximum.")
        .regex(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "😫 Password must have a special character.")
        .regex(/[a-zA-Z]/, "😖 Password can only contain Latin letters.")
        .regex(/[A-Z]/, "😵 Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "😵‍💫 Password must contain at least one lowercase letter.")
        .regex(/[0-9]+/, "🔢 Password must contain at least one number.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "😱 Password must contain at least one special character.")
        .min(1, "😥 Password Required...!"),
    code: z.string().optional(),
});
exports.RegisterSchema = z
    .object({
    email: z
        .string()
        .email("Invalid Email...! 😣")
        .min(1, "Email Required...! 😣"),
    password: z
        .string()
        .min(8, "😬 Password is too short - should be 8 chars minimum.")
        .max(100, "😱 Password is too long - should be 100 chars maximum.")
        .regex(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "😫 Password must have a special character.")
        .regex(/[a-zA-Z]/, "😖 Password can only contain Latin letters.")
        .regex(/[A-Z]/, "😵 Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "😵‍💫 Password must contain at least one lowercase letter.")
        .regex(/[0-9]+/, "🔢 Password must contain at least one number.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "😱 Password must contain at least one special character.")
        .min(1, "😥 Password Required...!"),
})
    .refine((data) => data.email !== data.password, {
    message: "Email and password must be different",
    path: ["password"],
});
