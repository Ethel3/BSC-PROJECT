import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as UserServices from '../services/user.service.js';

export const createUser = async (req, res, next) => {
  try {
    const { username, age, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userExistsResult = await UserServices.FindIfUserExists(username);
    if (userExistsResult.rows.length > 0) {
      return res.status(400).json({ message: `User with username ${username} already exists` });
    }
    const values = [username, age, email, hashedPassword];
    const result = await UserServices.createUser(values);

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
    const userExistsResult = await UserServices.FindUserById(id);
    if (userExistsResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const updateUserValues = [username, age, email, id];
    const result = await UserServices.updateUser(id, updateUserValues);

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
    const userExistsResult = await UserServices.FindUserById(id);
    if (userExistsResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    await UserServices.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const result = await UserServices.getAllUsers();
    const sanitizedResult = result.rows.map(item => {
      const { password, ...rest } = item;
      return rest;
    });

    res.status(200).json({
      message: 'Users retrieved successfully.',
      data: sanitizedResult,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userResult = await UserServices.FindUserByUsername(username);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const alreadyRegisteredUser = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, alreadyRegisteredUser.password);
    if (!isValidPassword) {
      return res.status(400).send('Invalid credentials');
    }
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
