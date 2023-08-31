import pool from '../dbConfig.mjs';

export const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
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
    const query = `
      UPDATE users
      SET username = $1, age = $2, email = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [username, age, email, id];
    const result = await pool.query(query, values);
    res.json({
      "message": "User updated successfully.",
      "user": result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `
      DELETE FROM users
      WHERE id = $1;
    `;
    const values = [id];
    await pool.query(query, values);
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
      "message": "Users retrieved  successfully.",
      "user": result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
