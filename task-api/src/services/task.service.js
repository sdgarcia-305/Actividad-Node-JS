import { getAllTasks, getTaskyById, createTask, updateTask, deleteTask } from "../models/task.model.js";

export const serviceGetTasks = async () => {
  return await getAllTasks();
};

export const serviceGetTaskById = async (id) => {
  return await getTaskyById(id);
};

export const serviceCreateTask = async (taskData) => {
  return await createTask(taskData);
};

export const serviceUpdateTask = async (id, taskData) => {
  return await updateTask(id, taskData);
};

export const serviceDeleteTask = async (id) => {
  return await deleteTask(id);
};
