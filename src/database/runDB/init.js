const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

//abre uma pool para criação no DB
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

//usa a path para sempre achar os arquivos de seed e create
const filePath1 = path.join(__dirname, '01_create_database.sql');
const filePath2 = path.join(__dirname, '02_initial_data.sql');

//usa fs para ler o arquivo e o transformar em utf8, para posteriormente ser usado pelo código
const sql = fs.readFileSync(filePath1, 'utf8');
const seed = fs.readFileSync(filePath2, "utf8");

// faz a verificação se os dados mockados já estão no banco de dados, usando o nome de edifíco inventado
//isso evita dados mockados duplicados
async function was_created() {
    const result = await pool.query("SELECT * FROM building WHERE name = $1", ["Edifício Inovação"])
    if(result.rows.length > 0){
        return true
    }
    else{
        return false
    } 
}

//funcao assincrona que envia dados mockados para as tabelas
async function run_SQL_Seed(){
    const result  = await was_created()
    if(result == true){
        console.log("O banco já foi povoado anteriormente")
    }
    else{
        try{
            await pool.query(seed)
        }
        catch(error){
            console.log("Erro ao rodar a seed ERRO: ", + error)
        }
    }
}


//funcao assincrona que cria as tabelas
async function run_SQL_Schema(){
    try{
        //espera o envio, caso de certo, escreve no console, caso de errado, joga um erro no console.
        await pool.query(sql)
        console.log("Script SQL injetado, banco de dados criado!");
    }
    catch(error){
        console.log("erro ao injetar SQL, ou banco já criado");
    }
}

//main serve para fazer com que as duas funções anteriores rodem uma após a outra,
//  garantindo que a seed sera executada sempre após o DB ja ter sido criado
async function main() {
    try{
        await run_SQL_Schema();
        await run_SQL_Seed();
    }catch(error){
        console.error(error)
    }
    finally{
        //encerra o pool
        pool.end();
    }
}

main();

module.exports = pool;