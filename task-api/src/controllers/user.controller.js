import * as User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  res.json(await User.getAllUsers());
};

export const getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  const dataUser = {
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
    createAt: user.created_at
  }
  res.json(user);
};

export const addUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const user = await User.createUser(req.body);
  res.status(201).json(user);
};

export const editUser = async (req, res) => {
  await User.updateUser(req.params.id, req.body);
  res.json({ message: 'Usuario actualizado' });
};

export const removeUser = async (req, res) => {
  await User.deleteUser(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};
