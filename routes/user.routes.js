// routes/userRoutes.mjs
import express from 'express';
import { createUser, updateUser, deleteUser, listUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', listUsers);

export default router;
