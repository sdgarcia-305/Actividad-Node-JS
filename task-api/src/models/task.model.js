import pool from '../config/database.js';

export const getAllTasks = async() => {
    const [rows] = await  pool.query(`
            SELECT 
            t.id, 
            t.titulo AS titulo_tarea,
            t.descripcion AS descripcion_tarea,
            t.estado AS estado_tarea,
            t.fecha_limite,
            FROM tareas t
            INNER JOIN usuarios u ON t.id_creado = u.id,
            INNER JOIN usuarios u ON t.id_asignado = u.id
        `);
    return rows;
}

export const getTaskyById = async(id) =>{
    const [rows] = await  pool.query(`
            SELECT 
            t.id, 
            t.titulo AS titulo_tarea,
            u.nombre AS nombre_usuario,
            FROM tareas t
            INNER JOIN usuarios u ON t.id_creado = u.id,
            INNER JOIN usuarios u ON t.id_asignado = u.id
            WHERE t.id = ?
        `, [id]);
    return rows[0];
}

export const createTask = async(task) =>{
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
        `, [titulo, descripcion, estado, id_creado, id_asignado, fecha_limite]);
    return {
        idTask: result.insertId,
        data: result
    }
}

export const updateSubcategory = async(id, subcategory) =>{
    const { nombre, id_categoria } = subcategory;
    const [result] = await pool.query(`
            UPDATE subcategorias 
            SET
            nombre = ?,
            id_categoria = ?
            WHERE id = ?
        `, [nombre, id_categoria, id]);
    return { result }
}

export const deleteSubcategory = async(id) => {
    const [result] = await pool.query(`
            DELETE 
            FROM subcategorias
            WHERE id = ?
        `, [id]);
    return { message: "Subcategoria eliminada" }
}