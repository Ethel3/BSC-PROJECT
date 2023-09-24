import pool from '../dbConfig.mjs';

export const createGameForUser = async (req, res, next) => {
  try {
    const { user_id, game_id, play_time } = req.body;
    if(req.id !=  user_id){
        return res.status(401).json({
          "message": "User is not authorized to perform this operation"
        })
    }

    const query = `
      INSERT INTO GameForuser (user_id, game_id, play_time)
      VALUES ($1, $2, $3);
    `;
    res.status(201).json({
        "message": "Game created for user successfully.",
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
    const { id } = req.params;
    const { play_time } = req.body;

    if(req.id !=  user_id){
      return res.status(401).json({
        "message": "User is not authorized to perform this operation"
      })
    }

    const query = `
      UPDATE GameForUser
      SET play_time = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [play_time, id];
    const result = await pool.query(query, values);

    res.status(200).json({
        "message": "Playtime for game updated successfully.",
      });
    } catch (error) {
      next(error);
    }
};

export const deleteGameForUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(req.id !=  user_id){
      return res.status(401).json({
        "message": "User is not authorized to perform this operation"
      })
    }
    const query = `
      DELETE FROM GameForUser
      WHERE id = $1;
    `;
    const values = [id];
    await pool.query(query, values);
    res.status(200).json({
        "message": "Game successfully deleted from user's catalog",
      });
    } catch (error) {
      next(error);
    }
};
