import pool from '../config/database.js'; 

export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};
 
export const createUser = async ({ nombre, email, password, rol }) => {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
    [nombre, email, password, rol]
  );
  return { id: result.insertId, nombre, email, rol };
};

export const updateUser = async (id, { nombre, email, rol }) => {
  await pool.query('UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?', [nombre, email, rol, id]);
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
};