import express from 'express';
import { createGame,updateGame,deleteGame,getGames } from '../controllers/game.controller.js';

const routes = express.Router();

routes.post('/', createGame);
routes.put('/:id', updateGame);
routes.delete('/:id', deleteGame);
routes.get('/', getGames);

export default routes;