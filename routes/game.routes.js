import express from 'express';
import { createGame,updateGame,deleteGame,getGames } from '../controllers/game.controller.js';
import { authMiddleware, isAdmin } from '../middleware/auth.js';

const routes = express.Router();

routes.post('/',authMiddleware, isAdmin, createGame);
routes.put('/:id',authMiddleware, isAdmin, updateGame);
routes.delete('/:id',authMiddleware, isAdmin, deleteGame);
routes.get('/', getGames);

export default routes;