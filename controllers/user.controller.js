import pool from '../dbConfig.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    token = jwt.sign(
      {
        id: result.rows[0].id, role: result.rows[0].role, username: result.rows[0].username, email: result.rows[0].email
      },
      process.env("SECRET"),
      { expiresIn: 360000 },
    );
    res.json({
      "message": "User created successfully.",
      "data": result.rows[0],
      "token": token
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, age, email } = req.body;

    if (req.id != id){
      return res.status(401).json({message: 'User is not authorized to perform this operation'})
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

    res.json({
      message: 'User updated successfully.',
      "data": result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.id != id){
      return res.status(401).json({message: 'User is not authorized to access this resource'})
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

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

/*
This route is not an authorized route by design
*/
export const getUsers = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM users;
    `;
    const result = await pool.query(query);
    res.json({
      "message": "Users retrieved successfully.",
      "data": result.rows 
    });
  } catch (error) {
    next(error);
  }
};

//Login route function
export const loginUser = async (req, res, next) =>{
  try{
    const { username, password } = req.body;
    // Find the user by username in your database
    const userQuery = `
      SELECT * FROM users
      WHERE username = $1;
    `;
    const userValues = [username];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create an Access Token
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Create a Refresh Token (optional)
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken, // Optional
    });
  } catch (error) {
  next(error);
}
};

