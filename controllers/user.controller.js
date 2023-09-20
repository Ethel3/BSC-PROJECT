import pool from '../dbConfig.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res, next) => {
  try {
    const { username, age, email, role, password } = req.body;

    if (role && role !== 'user' && role !== 'admin') {
      return res.status(400).json({ message: 'Invalid role. It must be "user" or "admin".' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (username, age, email, role, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [username, age, email, role || 'user', hashedPassword];

    const result = await pool.query(query, values);

    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        id: result.rows[0].id,
        role: result.rows[0].role,
        username: result.rows[0].username,
        email: result.rows[0].email,
      },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'User created successfully.',
      data: result.rows[0],
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, age, email, role, password } = req.body;

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

    let hashedPassword = userExistsResult.rows[0].password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updateUserQuery = `
      UPDATE users
      SET username = $1, age = $2, email = $3, role = $4, password = $5
      WHERE id = $6
      RETURNING *;
    `;

    const updateUserValues = [username, age, email, role, hashedPassword, id];
    const result = await pool.query(updateUserQuery, updateUserValues);

    res.json({
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
      message: 'Users retrieved successfully.',
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log('Received username:', username);
    console.log('Received password:', password);


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
    const hashedPassword = user.password; 

    
const adminPassword = 'admin_password';


const saltRounds = 10; 
const hashedAdminPassword = bcrypt.hashSync(adminPassword, saltRounds);

console.log('Hashed Admin Password:', hashedAdminPassword);
    
    if (!password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

   
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password Match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    

   
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role  },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role  },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken, 
    });
  } catch (error) {
    next(error);
  }
};
