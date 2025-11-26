import express from 'express';
import { getUsers, getUser, addUser, editUser, removeUser } from '../controllers/user.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createUserSchema } from '../schemas/user.schema.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', validateSchema(createUserSchema), addUser);
router.put('/:id', editUser);
router.delete('/:id', removeUser);

export default router;