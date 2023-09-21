import express from 'express';
import { createGameForUser, getGamesForAllUsers, updateGameForUser, deleteGameForUser,} from '../controllers/usergame.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const userGameRoutes = express.Router();

userGameRoutes.post('/', authMiddleware, createGameForUser);
userGameRoutes.get('/', getGamesForAllUsers);
userGameRoutes.put('/:id', authMiddleware, updateGameForUser);
userGameRoutes.delete('/:id', authMiddleware, deleteGameForUser);

export default userGameRoutes;