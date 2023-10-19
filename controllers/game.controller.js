import * as gameService from '../services/game.service.js';

/*
//TODO: Only allow admins to create games
*/
export const createGame = async (req, res, next) => {
  try {
    const { title, description, publisher_date } = req.body;
    const result = await gameService.createGame(title, description, publisher_date);

    res.status(201).json({
      "message": "Game created successfully.",
      "data": result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

/*
//TODO: Only allow admins to update games
*/
export const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, publisher_date } = req.body;
    const checkResult = await gameService.findGameById(id);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Game requested not found.' });
    }

    const result = await gameService.updateGame(id, title, description, publisher_date);
    res.json({
      "message": "Game updated successfully.",
      "data": result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

/*
//TODO: Only allow admins to delete games
*/
export const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkResult = await gameService.findGameById(id);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Game requested not found.' });
    }
    await gameService.deleteGame(id);
    res.json({
      "message": "Game deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

export const getGames = async (req, res, next) => {
  try {
    const result = await gameService.getAllGames();
    res.status(200).json({
      "message": "Games retrieved successfully.",
      "data": result.rows
    });
  } catch (error) {
    next(error);
  }
};
