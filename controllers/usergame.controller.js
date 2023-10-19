import * as gameForUserService from '../services/gameforuser.service.js';

export const createGameForUser = async (req, res, next) => {
  try {
    const { user_id, game_id, play_time } = req.body;

    if (req.id !== user_id) {
      return res.status(401).json({
        "message": "User is not authorized to perform this operation"
      });
    }
    const result = await gameForUserService.createGameForUser(user_id, game_id, play_time);

    res.status(201).json({
      "message": "Game created for user successfully.",
      "data": result
    });
  } catch (error) {
    next(error);
  }
};

export const getGamesForAllUsers = async (req, res, next) => {
  try {
    const query = `
      SELECT users.*, games.* FROM users JOIN GameForUser on users.id = GameForUser.user_id
      JOIN games ON GameForUser.game_id=games.id;
    `;

    const result = await pool.query(query);
    const sanitizedResult = result.rows.map(item => {
      const { password, ...rest } = item;
      return rest;
    });

    res.status(200).json({
      "message": "Games for all users retrieved successfully.",
      "data": sanitizedResult
    });
  } catch (error) {
    next(error);
  }
};

export const updateGameForUser = async (req, res, next) => {
  try {
    const { id, play_time, user_id } = req.body;
    if (req.id !== user_id) {
      return res.status(401).json({
        "message": "User is not authorized to perform this operation"
      });
    }

    const result = await gameForUserService.updateGameForUser(id, play_time);
    res.status(200).json({
      "message": "Playtime for game updated successfully.",
      "data": result
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGameForUser = async (req, res, next) => {
  try {
    const { id, user_id } = req.body;
    if (req.id !== user_id) {
      return res.status(401).json({
        "message": "User is not authorized to perform this operation"
      });
    }

    
    await gameForUserService.deleteGameForUser(id);
    res.status(200).json({
      "message": "Game successfully deleted from the user's catalog"
    });
  } catch (error) {
    next(error);
  }
};
