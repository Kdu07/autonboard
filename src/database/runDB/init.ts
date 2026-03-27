import fs from "fs";
import path from "path";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = process.env;

const pool: Pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: Number(DB_PORT), // Convert environment string to required numeric type
});

// Setup directory paths
// process.cwd() to resolve the absolute path to the SQL scripts.
// Ensures that the file system can locate the 'src'
const baseRunDB = path.join(process.cwd(), "src", "database", "runDB");
const filePath1: string = path.join(baseRunDB, "01_create_database.sql");
const filePath2: string = path.join(baseRunDB, "02_initial_data.sql");

// Load SQL file contents into memory
const sql: string = fs.readFileSync(filePath1, "utf8");
const seed: string = fs.readFileSync(filePath2, "utf8");

// Check if specific bootstrap data already exists to avoid duplication
async function wasCreated(): Promise<boolean> {
  const result = await pool.query(
    "SELECT * FROM building WHERE name = $1",
    ["Edifício Inovação"]
  );

  return result.rows.length > 0;
}

// Execute the data seeding process
async function runSQLSeed(): Promise<void> {
  const alreadyCreated: boolean = await wasCreated();

  if (alreadyCreated) {
    console.log("The database has already been populated.");
    return;
  }

  try {
    await pool.query(seed);
    console.log("Seed executed successfully.");
  }
  catch (error) {
    console.error("Error while running the seed:", error);
  }
}

// Execute the schema creation script
async function runSQLSchema(): Promise<void> {
  try {
    await pool.query(sql);
    console.log("SQL injected, database has been created.");
  }
  catch (error) {
    console.error(
      "Error while injecting SQL, or the Database has already been created.",
      error
    );
  }
}

// Orchestrate the database setup sequence
async function main(): Promise<void> {
  try {
    await runSQLSchema();
    await runSQLSeed();
  }
  catch (error) {
    console.error("Unexpected error:", error);
  }
  finally {
    // Gracefully close the pool connection after tasks complete
    await pool.end();
  }
}

main();

export default pool;