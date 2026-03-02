const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const filePath1 = path.join(__dirname, '01_create_database.sql');
const filePath2 = path.join(__dirname, '02_create_database.sql');
const sql = fs.readFileSync(filePath1, 'utf8');
const seed = fs.readFileSync(filePath2, "utf8");


async function runSQLSeed(){
    try{
        await pool.query(seed)
    }catch(error){
        console.log("Erro ao rodar a seed ERRO: ", + error)
    }
}


async function runSQLSchema(){
    try{
        await pool.query(sql)
        console.log("Script SQL injetado, banco de dados criado!");
        runSQLSeed();
    }
    catch(error){
        console.log("erro ao injetar SQL, ERRO: " + error);
    }
}

runSQLSchema();