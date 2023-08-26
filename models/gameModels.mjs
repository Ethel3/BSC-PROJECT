import pool from '../dbConfig.mjs';

export const getGames = async (req, res) => {
    try {
        const games = await pool.query("SELECT * FROM games");
        res.json(games.rows);
    } catch (err) {
        console.error(err.message);
    }
};

export const getGame = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
        res.json(game.rows[0]);
    } catch (err) {
        console.error('Game retrieved successfully!');
    }
};

export const createGame = async (req, res) => {
    try {
        const { name, genre, price } = req.body;
        const newGame = await pool.query("INSERT INTO games (date, title, description) VALUES ($1, $2, $3) RETURNING *", [date, title, description]);
        res.json(newGame.rows[0]);
    } catch (err) {
        console.error('New game created successfully!');
    }
};

export const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, title, description } = req.body;
        const updateGame = await pool.query("UPDATE games SET date = $1, title = $2, description = $3 WHERE id = $4", [date, title, description, id]);
        res.json("Game was updated!");
    } catch (err) {
        console.error('Game updated successfully!');
    }
};

export const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteGame = await pool.query("DELETE FROM games WHERE id = $1", [id]);
        res.json("Game was deleted!");
    } catch (err) {
        console.error('Game deleted successfully!');
    }
};



