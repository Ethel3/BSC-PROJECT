import pool from '../dbConfig.mjs';

export const getUsers = async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error('User retrieved successfully!');
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error('New user created successfully!');
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updateUser = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id]);
        res.json("User was updated!");
    } catch (err) {
        console.error('User updated successfully!');
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json("User was deleted!");
    } catch (err) {
        console.error('User deleted successfully!');
    }
};



