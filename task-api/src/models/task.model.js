import pool from "../config/database.js";

export const getAllTasks = async () => {
  const [rows] = await pool.query(`
             SELECT 
             t.id,
             t.titulo,
             t.descripcion,
             t.estado,
             t.fecha_limite,
             t.created_at,
             t.id_creado,
             t.id_asignado,
             u1.nombre AS creador_nombre,
             u2.nombre AS asignado_nombre
             FROM tareas t
             INNER JOIN usuarios u1 ON t.id_creado = u1.id
             INNER JOIN usuarios u2 ON t.id_asignado = u2.id
             ORDER BY t.created_at DESC
        `);
  return rows;
};

export const getTaskyById = async (id) => {
  const [rows] = await pool.query(
    `
             SELECT 
             t.id,
             t.titulo,
             t.descripcion,
             t.estado,
             t.fecha_limite,
             t.created_at,
             t.id_creado,
             t.id_asignado,
             u1.nombre AS creador_nombre,
             u2.nombre AS asignado_nombre
             FROM tareas t
             INNER JOIN usuarios u1 ON t.id_creado = u1.id
             INNER JOIN usuarios u2 ON t.id_asignado = u2.id
             WHERE t.id = ?
            `,
             [id]);
  return rows[0];
};

export const createTask = async (task) => {
  const { titulo, descripcion, estado, id_creado, id_asignado, fecha_limite } = task;

  const [result] = await pool.query(`
            INSERT INTO 
            tareas (
                titulo, 
                descripcion, 
                estado, 
                id_creado, 
                id_asignado, 
                fecha_limite
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `,
    [titulo, descripcion, estado, id_creado, id_asignado, fecha_limite]
  );
  return {
    idTask: result.insertId,
    data: result,
  };
};

export const updateTask= async (id, task) => {
  const { titulo, descripcion, estado, id_asignado, fecha_limite } = task;
  const [result] = await pool.query(
    `
            UPDATE tareas 
            SET
            titulo = ?,
            descripcion = ?, 
            estado = ?, 
            id_asignado = ?, 
            fecha_limite = ?
            WHERE id = ?
        `,
    [titulo, descripcion, estado, id_asignado, fecha_limite, id]
  );
  return { result };
};

export const deleteTask = async (id) => {
  const [result] = await pool.query(
    `
            DELETE 
            FROM tareas
            WHERE id = ?
        `,
    [id]
  );
  return { message: "Tarea eliminada exitosamente" };
};
