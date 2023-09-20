import express from 'express';
import { createUser, updateUser, deleteUser, getUsers, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);

export default router;
