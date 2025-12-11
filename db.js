import { Sequelize } from "sequelize";
import dbconfig from "./config/dbconfig.js";

// import mysql from "mysql2/promise";

// export const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "mysql",
//   database: "hrportal",
// });

//const { Sequelize } = require('sequelize');

const db = new Sequelize(
    dbconfig.database ,
    dbconfig.user, 
    dbconfig.password,
    {
      host: dbconfig.host,
      dialect : dbconfig.dialect,
    }
  );

export default db;

// const connection = () =>{

//   db.authenticate()
//     .then(() => {
//       console.log("Connection has been established successfully.")
//     })
//     .catch(err => {
//       console.error("Unable to connection ",err.message);
//     })
// }

try {
  await db.authenticate();
  console.log('Connection has been established successfully...');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}