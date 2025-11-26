import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema } from '../schemas/auth.schema.js';

const router = express.Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", verifyToken, logout);

export default router;