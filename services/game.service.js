import pool from '../dbConfig.mjs';

export const createGame = (fields) => {
    const query = `
        INSERT INTO games (title, description, publisher_date, created_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
        
    return pool.query(query, fields);
}

export const updateGame = (fields) => {
    const updateGameQuery = `
        UPDATE games
        SET title = $1, description = $2, publisher_date = $3
        WHERE id = $4
        RETURNING *;
    `;
    return pool.query(updateGameQuery, fields);
}

export const deleteGame = (id) => {
    const deleteGameQuery = `
        DELETE FROM games
        WHERE id = $1;
    `;
    return pool.query(deleteGameQuery, [id]);
}

export const getAllGames = () => {
    const getAllGamesQuery = `
        SELECT * FROM games;
    `;
    return pool.query(getAllGamesQuery);
}