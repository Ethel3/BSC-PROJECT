import pool from '../dbConfig.mjs';

export const getUserGames = async (req, res) => {
    try {
        const { id } = req.params;
        const userGames = await pool.query("SELECT * FROM userGames WHERE user_id = $1", [id]);
        res.json(userGames.rows);
    } catch (err) {
        console.error(err.message);
    }
};

export const getUserGame = async (req, res) => {
    try {
        const { id } = req.params;
        const userGame = await pool.query("SELECT * FROM userGames WHERE id = $1", [id]);
        res.json(userGame.rows[0]);
    } catch (err) {
        console.error('User game retrieved successfully!');
    }
};

export const createUserGame = async (req, res) => {
    try {
        const { user_id, game_id } = req.body;
        const newUserGame = await pool.query("INSERT INTO userGames (user_id, game_id) VALUES ($1, $2) RETURNING *", [user_id, game_id]);
        res.json(newUserGame.rows[0]);
    } catch (err) {
        console.error('New user game created successfully!');
    }
};

export const updateUserGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, game_id } = req.body;
        const updateUserGame = await pool.query("UPDATE userGames SET user_id = $1, game_id = $2 WHERE id = $3", [user_id, game_id, id]);
        res.json("User game was updated!");
    } catch (err) {
        console.error('User game updated successfully!');
    }
};

export const deleteUserGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUserGame = await pool.query("DELETE FROM userGames WHERE id = $1", [id]);
        res.json("User game was deleted!");
    } catch (err) {
        console.error('User game deleted successfully!');
    }
};

