const { Pool } = require('pg');
const dotenv = require('dotenv');
const query = require('../queries/dbqueries');
const bcrypt = require('bcrypt');


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});


/**
 * Create Tables
 */


const usersTable = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY NOT NULL,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  gender TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_DATE NOT NULL,
  date_updated TIMESTAMP DEFAULT NULL
);`;



(async function () {
  try {
    await pool.query(usersTable);
  } catch (error) {
    console.log(error);
  }
})();

