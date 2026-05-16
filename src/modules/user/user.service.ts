import { pool } from "../../db";
import type { IUser } from "./interface";

// Create user into database
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  return await pool.query(
    `
      INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *
      `,
    [name, email, password, age],
  );
};

// Get all users from database
const getAllUsersFromDB = async () => {
  return await pool.query(`
      SELECT * FROM users
  `);
};

// Get single user from database
const getSingleUserFromDB = async (id: string) => {
  return await pool.query(
    `
        SELECT * FROM users WHERE id = $1
      `,
    [id],
  );
};

// Update user from database
const getUpdateUserFromDB = async (payload: IUser, id: string) => {
  const { name, email, password, age } = payload;

  return await pool.query(
    `
      UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password), age = COALESCE($4, age), updated_at = NOW() WHERE id = $5 RETURNING *
  `,
    [name, email, password, age, id],
  );
};

// Delete user from database
const deleteUserFromDB = async (id: string) => {
  return await pool.query(
    `
        DELETE FROM users WHERE id = $1
      `,
    [id],
  );
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getUpdateUserFromDB,
  deleteUserFromDB,
};
