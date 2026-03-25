import  {Pool}  from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DB_SSL
} = process.env;

const sslConfig =
  DB_SSL && DB_SSL.toLowerCase() === 'true'
    ? { rejectUnauthorized: false }
    : undefined;

const db: Pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: Number(DB_PORT), // precisa converter para number
  ssl: sslConfig
});

export default db