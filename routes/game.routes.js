import express from 'express';
import { createGame, updateGame, deleteGame, getGames } from '../controllers/game.controller.js';

const gameRoutes = express.Router();

gameRoutes.route('/').get(getGames).post(createGame)
gameRoutes.put('/:id', updateGame);
gameRoutes.delete('/:id', deleteGame);

export default gameRoutes;