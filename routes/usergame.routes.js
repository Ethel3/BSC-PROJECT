import express from 'express';
import { createUserGame, getUserGames, updateUserGame, deleteUserGame,} from '../controllers/usergame.controller.js';

const userGameRoutes = express.Router();

userGameRoutes.post('/', createUserGame);
userGameRoutes.get('/', getUserGames);
userGameRoutes.put('/:id', updateUserGame);
userGameRoutes.delete('/:id', deleteUserGame);

export default userGameRoutes;
