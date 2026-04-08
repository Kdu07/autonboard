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
  port: Number(DB_PORT),
  ssl: sslConfig,
  connectionTimeoutMillis: 10000, // 10 seconds to connect
  query_timeout: 10000 // 10 seconds for query
});

export default db