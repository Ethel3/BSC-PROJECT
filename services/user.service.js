import e from 'express';
import pool from '../dbConfig.mjs';

export const createUser = (fields) => {
    const query = `
        INSERT INTO users (username, age, email, password, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
        
    return pool.query(query, fields);
    }

    export const FindIfUserExists = (username) => {
        const userExistsQuery = `
            SELECT * FROM users
            WHERE username = $1;
        `;
        return pool.query(userExistsQuery, values);
    }

    export const updateUser = (fields) => {
        const updateUserQuery = `
            UPDATE users
            SET username = $1, age = $2, email = $3
            WHERE id = $4
            RETURNING *;
        `;
        return pool.query(updateUserQuery, fields);
    }

    export const deleteUser = (id) => {
        const deleteUserQuery = `
            DELETE FROM users
            WHERE id = $1;
        `;
        return pool.query(deleteUserQuery, [id]);
    }

    export const getAllUsers = () => {
        const getAllUsersQuery = `
            SELECT * FROM users;
        `;
        return pool.query(getAllUsersQuery);
    }