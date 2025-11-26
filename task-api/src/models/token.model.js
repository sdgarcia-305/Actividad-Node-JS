import pool from '../config/database.js'; 

export const isTokenActive = async(token) => {
    const [rows] = await pool.query(`SELECT * FROM active_tokens WHERE token = ?`, [token]);
    return rows[0] || null;
};

export const saveToken = async(userId, token) => {
    const [result] = await pool.query(`INSERT INTO active_tokens (user_id, token) VALUES (?, ?)`, [userId, token]);
    console.log("result", result);
    return result;
};

export const deleteToken = async(token) => {
    const [result] = await pool.query('DELETE FROM active_tokens WHERE token = ?', [token]);
    return result || null;
};