import pool from '../dbConfig.mjs';


/*
//TODO: Only allow admins to create games
*/
export const createGame = async (req, res, next) => {
  try {
    const { title, description, publisher_date } = req.body;
    const query = `
      INSERT INTO games (title, description, publisher_date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, description, publisher_date];
    const result = await pool.query(query, values);
    res.json({
      "message": "game created successfully.",
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

    const checkQuery = `
      SELECT * FROM games
      WHERE id = $1;
    `;
    const checkValues = [id];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Game not found.' });
    }

    const query = `
      UPDATE games
      SET title = $1, description = $2, publisher_date = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [title, description, publisher_date, id];
    const result = await pool.query(query, values);
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

    const checkQuery = `
      SELECT * FROM games
      WHERE id = $1;
    `;
    const checkValues = [id];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Game requested not found.' });
    }

    const query = `
      DELETE FROM games
      WHERE id = $1;
    `;
    const values = [id];
    await pool.query(query, values);
    res.json({
      "message": "Game deleted successfully.",
      "data": result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};


export const getGames = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM games;
    `;
    const result = await pool.query(query);
    res.json({
      "message": "Game retrived successfully.",
      "data": result.rows
    });
  } catch (error) {
    next(error);
  }
};
