import pool from '../dbConfig.mjs';

export const createGame = async (req, res, next) => {
  try {
    const { title, description, published_date } = req.body;
    const query = `
      INSERT INTO games_schema.games (title, description, published_date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, description, published_date];
    const result = await pool.query(query, values);
    res.json({
        "message": "Game created successfully.",
        "game": result.rows[0]
      });
    } catch (error) {
      next(error);
    }
};

export const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, published_date } = req.body;

    const checkQuery = `
      SELECT * FROM games_schema.games
      WHERE id = $1;
    `;
    const checkValues = [id];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Game not found.' });
    }

    const query = `
      UPDATE games_schema.games
      SET title = $1, description = $2, published_date = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [title, description, published_date, id];
    const result = await pool.query(query, values);
    res.json({
        "message": "Game Updated successfully.",
        "game": result.rows[0]
      });
    } catch (error) {
      next(error);
    }
};

export const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkQuery = `
      SELECT * FROM games_schema.games
      WHERE id = $1;
    `;
    const checkValues = [id];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Game not found.' });
    }

    const query = `
      DELETE FROM games_schema.games
      WHERE id = $1;
    `;
    const values = [id];
    await pool.query(query, values);
    res.json({
        "message": "Game deleted successfully.",
        "game": result.rows[0]
      });
    } catch (error) {
      next(error);
    }
};

export const getGames = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM games_schema.games;
    `;
    const result = await pool.query(query);
    res.json({
        "message": "Games retrieved successfully.",
        "games": result.rows 
      });
    } catch (error) {
      next(error);
    }
};
