import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, "O nome completo é obrigatório"),
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(2, "A senha é obrigatória"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(1, "A senha é obrigatória"),
  }),
});

