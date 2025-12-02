import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { Pool } from "pg";
const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE || "mydatabase",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "password",

  ssl: false,
});

export default pool;
