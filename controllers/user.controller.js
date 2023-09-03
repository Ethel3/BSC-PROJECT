import pool from '../dbConfig.mjs';

export const createUser = async (req, res, next) => {
  try {
    const { username, age, email } = req.body;
    const query = `
      INSERT INTO users (username, age, email)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [username, age, email];
    const result = await pool.query(query, values);
    res.json({
      "message": "User created successfully.",
      "user": result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, age, email } = req.body;

    const userExistsQuery = `
      SELECT * FROM users
      WHERE id = $1;
    `;
    const userExistsValues = [id];
    const userExistsResult = await pool.query(userExistsQuery, userExistsValues);

    if (userExistsResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const updateUserQuery = `
      UPDATE users
      SET username = $1, age = $2, email = $3
      WHERE id = $4
      RETURNING *;
    `;
    const updateUserValues = [username, age, email, id];
    const result = await pool.query(updateUserQuery, updateUserValues);

    res.json({
      message: 'User updated successfully.',
      user: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userExistsQuery = `
      SELECT * FROM users
      WHERE id = $1;
    `;
    const userExistsValues = [id];
    const userExistsResult = await pool.query(userExistsQuery, userExistsValues);

    if (userExistsResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const deleteUserQuery = `
      DELETE FROM users
      WHERE id = $1;
    `;
    const deleteUserValues = [id];
    await pool.query(deleteUserQuery, deleteUserValues);

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM users;
    `;
    const result = await pool.query(query);
    res.json({
      "message": "Users retrieved successfully.",
      "users": result.rows 
    });
  } catch (error) {
    next(error);
  }
};


