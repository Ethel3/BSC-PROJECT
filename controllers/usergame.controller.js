import pool from '../dbConfig.mjs';

export const createUserGame = async (req, res, next) => {
  try {
    const { user_id, game_id, play_time } = req.body;
    if(req.id !=  user_id){
        return res.json({
          "message": "User is not authorized to perform this operation"
        })
    }
    const query = `
      INSERT INTO usergame (user_id, game_id, play_time)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [user_id, game_id, play_time];
    const result = await pool.query(query, values);
    res.json({
        "message": "user game relationship created successfully.",
        "data": result.rows[0]
      });
    } catch (error) {
      next(error);
    }
};

export const getUserGames = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM usergame;
    `;
    const result = await pool.query(query);
    res.json({
        "message": "All user game relationships retrieved successfully.",
        "data": result.rows
      });
    } catch (error) {
      next(error);
    }
};

export const updateUserGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { play_time } = req.body;
    if(req.id !=  user_id){
      return res.json({
        "message": "User is not authorized to perform this operation"
      })
  }

    const query = `
      UPDATE usergame
      SET play_time = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [play_time, id];
    const result = await pool.query(query, values);
    res.json({
        "message": "user game relationship updated successfully.",
        "data": result.rows[0]
      });
    } catch (error) {
      next(error);
    }
};

export const deleteUserGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(req.id !=  user_id){
      return res.json({
        "message": "User is not authorized to perform this operation"
      })
  }
    const query = `
      DELETE FROM usergame
      WHERE id = $1;
    `;
    const values = [id];
    await pool.query(query, values);
    res.json({
        "message": "user game relationship deleted successfully.",
        "data": result.rows[0]
      });
    } catch (error) {
      next(error);
    }
};
