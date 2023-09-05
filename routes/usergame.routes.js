// userGameRoutes.js
import express from 'express';
import { createUserGame, getUserGames, updateUserGame, deleteUserGame,} from '../controllers/usergame.controller.js';

const usergameroutes = express.Router();

usergameroutes.post('/', createUserGame);
usergameroutes.get('/', getUserGames);
usergameroutes.put('/:id', updateUserGame);
usergameroutes.delete('/:id', deleteUserGame);

export default usergameroutes;
