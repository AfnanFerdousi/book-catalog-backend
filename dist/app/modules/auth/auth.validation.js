"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshZodValidationSchema = exports.loginZodValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
exports.refreshZodValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required",
        }),
    }),
});
