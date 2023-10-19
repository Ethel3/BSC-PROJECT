import pool from '../dbConfig.mjs';

export const createGameForUser = async (fields) => {
    const query = `
        INSERT INTO GameForuser (user_id, game_id, play_time)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
        
    return pool.query(query, fields);
}

export const getGamesForAllUsers = () => {
    const query = `
        SELECT users.*, games.* FROM users JOIN GameForUser on users.id = GameForUser.user_id
        JOIN games ON GameForUser.game_id=games.id;
    `;
    return pool.query(query);
}

export const updateGameForUser = (fields) => {
    const query = `
        UPDATE GameForUser
        SET play_time = $1
        WHERE id = $2
        RETURNING *;
    `;
    return pool.query(query, fields);
}

export const deleteGameForUser = (id) => {
    const query = `
    DELETE FROM GameForUser WHERE id = $1;
    `;  
    return pool.query(query, [id]);
}

export const getGamesForUser = (id) => {
    const query = `
        SELECT users.*, games.* FROM users JOIN GameForUser on users.id = GameForUser.user_id
        JOIN games ON GameForUser.game_id=games.id
        WHERE users.id = $1;
    `;
    return pool.query(query, [id]);
}
