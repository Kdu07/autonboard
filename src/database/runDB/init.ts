import fs from "fs";
import path from "path";
import  {Pool}  from "pg";
import dotenv from "dotenv";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  port: Number(DB_PORT), // precisa converter para number
});

// Caminhos
const filePath1: string = path.join(__dirname, "01_create_database.sql");
const filePath2: string = path.join(__dirname, "02_initial_data.sql");

// Leitura dos arquivos
const sql: string = fs.readFileSync(filePath1, "utf8");
const seed: string = fs.readFileSync(filePath2, "utf8");

//  Verifica se já foi criado
async function wasCreated(): Promise<boolean> {
  const result = await pool.query(
    "SELECT * FROM building WHERE name = $1",
    ["Edifício Inovação"]
  );

  return result.rows.length > 0;
}

// Executa seed
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

// Executa schema
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

// Função principal
async function main(): Promise<void> {
  try {
    await runSQLSchema();
    await runSQLSeed();
  } 
  catch (error) {
    console.error("Unexpected error:", error);
  } 
  finally {
    await pool.end();
  }
}

main();

export default pool;