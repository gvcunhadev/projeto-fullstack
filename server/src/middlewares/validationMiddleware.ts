import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";


export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de validação ZOD no backend:", error.errors);

        const errors = error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          message: "Dados de requisição inválidos. Verifique os campos.",
          errors: errors,
        });
      } else {
        console.error("Erro inesperado no middleware de validação:", error);
        return res.status(500).json({ message: "Erro interno do servidor durante a validação." });
      }
    }
  };
