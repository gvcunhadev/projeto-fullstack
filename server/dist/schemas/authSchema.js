"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().min(3, "O nome completo é obrigatório"),
        email: zod_1.z.string().email("Formato de e-mail inválido"),
        password: zod_1.z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Formato de e-mail inválido"),
        password: zod_1.z.string().min(1, "A senha é obrigatória"),
    }),
});
