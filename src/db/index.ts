import { Pool } from "pg";
import config from "../config/env";

const pool = new Pool({
  connectionString: config.connectionString,
});

const initDB = async () => {
  try {
    await pool.query(`
      
      CREATE TABLE IF NOT EXISTS users (
      
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      age INT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
      
    )
      
      `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export { pool, initDB };
