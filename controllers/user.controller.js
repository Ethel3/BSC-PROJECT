import pool from '../dbConfig.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res, next) => {
  try {
    const { username, age, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userExistsQuery = `
      SELECT * FROM users
      WHERE username = $1;
    `;
    const userExistsValues = [username];
    const userExistsResult = await pool.query(userExistsQuery, userExistsValues);

    if (userExistsResult.rows.length > 0) {
      return res.status(400).json({ message: `User with username ${username} already exists`});
    }

    const query = `
      INSERT INTO users (username, age, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [username, age, email, hashedPassword];

    const result = await pool.query(query, values);
    res.status(201).json({
      message: 'User created successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, age, email } = req.body;

    if (req.id != id) {
      return res.status(401).json({ message: 'User is not authorized to perform this operation' });
    }

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

    res.status(200).json({
      message: 'User updated successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.id != id) {
      return res.status(401).json({ message: 'User is not authorized to access this resource' });
    }

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

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const selectAllQuery = `
      SELECT * FROM users;
    `;

    //Remove password hash from response.
    const result = await pool.query(selectAllQuery);
    const sanitizedResult = result.rows.map(item => {
      const { password, ...rest } = item;
      return rest;
    });
    
    res.status(200).json({
      message: 'Users retrieved successfully.',
      data: sanitizedResult,
    });
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userQuery = `
      SELECT * FROM users
      WHERE username = $1;
    `;
    const userValues = [username];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const alreadyRegisteredUser = userResult.rows[0]
    const isValidPassword = await bcrypt.compare(password, alreadyRegisteredUser.password);
    if (!isValidPassword) return res.status(400).send('Invalid credentials')

    const accessToken = jwt.sign(
      { id: alreadyRegisteredUser.id, username: alreadyRegisteredUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful!',
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};