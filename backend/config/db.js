const mysql = require("mysql2")
require("dotenv").config()

// conenxion BDD avec .env 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const db = pool.promise()

// TEST DE CONNEXION 
db.query("SELECT 1")
.then(()=>{
    console.log(` connexion bdd`);
}) .catch((err) => {
    console.error("Erreur de connexion MySQL :", err.message);
  });
module.exports = db;