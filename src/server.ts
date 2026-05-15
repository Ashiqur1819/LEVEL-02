import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config/env";

const app: Application = express();
const port = config.port;

app.use(express.json());

const pool = new Pool({
  connectionString: config.connectionString
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

initDB();

// Post user
app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
      
      INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *
      `,
      [name, email, password, age],
    );

    res
      .status(201)
      .json({ message: "User created successfully", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Get all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
  `);
    res.status(200).json({ users: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Get user by id
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Update user by id
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password), age = COALESCE($4, age), updated_at = NOW() WHERE id = $5 RETURNING *
  `,
      [name, email, password, age, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    console.log(error);
  }
});

// Delete user by id
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
        DELETE FROM users WHERE id = $1
      `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
