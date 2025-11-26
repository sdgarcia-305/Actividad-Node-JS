import express from 'express';
import { getTasks, getTaskById, createNewTask, updateTaskById, deleteTaskById, createTask, getTask } from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { validateTaskBody } from "../middlewares/validateTaskBody.js";
import { deleteTask, updateTask } from '../models/task.model.js';


const router = express.Router();
 
// Usuarios normales y administradores pueden ver
router.get("/", verifyToken, getTasks);
router.get("/:id", verifyToken, getTask);

// Solo administradores pueden crear / editar / eliminar
router.post("/", verifyToken, checkRole("administrador"), validateTaskBody, createTask);
router.put("/:id", verifyToken, checkRole("administrador"), validateTaskBody, updateTask);
router.delete("/:id", verifyToken, checkRole("administrador"), deleteTaskById, deleteTask);

export default router;