import { z } from 'zod';

export const createTaskSchema = z.object({
    titulo: z
    .string("El titulo es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
    descripcion: z
    .string("La descripción es obligatoria")
    .min(5, "La descripción debe tener al menos 5 caracteres"),
    estado: z
    .enum(['pendiente', 'en_progreso', 'completada'], {errorMap: () => ({ message: "Estado inválido" })})
    .optional(),
    id_creado: z.number({
      required_error: "El id del creador es obligatorio",
      invalid_type_error: "id_creado debe ser un número",})
      .int().positive("id_creado debe ser positivo"),
    id_asignado: z.number({
      required_error: "El id del asignado es obligatorio",
      invalid_type_error: "id_asignado debe ser un número",}).int().positive("id_asignado debe ser positivo"),
    fecha_limite: z
    .string("La fecha limite es obligatoria")
    .date().or(z.string())
    .superRefine((val) => !isNaN(Date.parse(val)), { message: "Fecha inválida" })
});

export const updateTaskSchema = createTaskSchema.partial();