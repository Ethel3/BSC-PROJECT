import express from 'express';
import { createUser, updateUser, deleteUser, getUsers, loginUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const userRoutes = express.Router();

userRoutes.post('/login', loginUser);
userRoutes.put('/:id', authMiddleware, updateUser);
userRoutes.delete('/:id', authMiddleware, deleteUser);
userRoutes.post('/', createUser);
userRoutes.get('/', getUsers);
export default userRoutes;