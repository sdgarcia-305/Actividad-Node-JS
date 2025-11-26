import { taskSchema } from "../schemas/task.schema.js";
import { z } from "zod";

export const validateTaskBody = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "No se proporcionaron datos para validar",
        error: [],
      });
    }

    const result = await taskSchema.parseAsync(req.body);
    req.body = result; 

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Datos inválidos en la tarea",
        error: error.issues,
      });
    }

    return res.status(500).json({
      message: "Ocurrió un error en la validación",
      error: error.message,
    });
  }
};