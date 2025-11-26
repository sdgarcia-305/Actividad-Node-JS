import * as Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener tareas", error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la tarea", error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const payload = req.body;
    // id_creado: si no lo envía el cliente, usar req.user.id
    if (!payload.id_creado && req.user?.id) payload.id_creado = req.user.id;

    const result = await Task.createTask(payload);
    return res.status(201).json({ message: "Tarea creada", id: result.id });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear tarea", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Tarea no encontrada" });
    return res.json({ message: "Tarea actualizada" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tarea no encontrada" });
    return res.json({ message: "Tarea eliminada" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
  }
};