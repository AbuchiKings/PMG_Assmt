const { Pool } = require('pg');
const dotenv = require('dotenv');
const query = require('./queries/dbqueries');
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
const testUser = `CREATE TABLE IF NOT EXISTS testuser(
  username TEXT,
  password TEXT
);`;


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
    await pool.query(testUser);
    await pool.query(usersTable);
    const check = `SELECT * FROM testuser`;
    const { rowCount } = await pool.query(check);
    if (rowCount < 1) {
      const [hashedPwd, hashedUsername] = await Promise.all(bcrypt.hash(process.env.PWD, process.env.SALT),
        bcrypt.hash(process.env.USERNAME, process.env.SALT));
      await pool.query(query.regUser(hashedUsername, hashedPwd));
    }
  } catch (error) {
    console.log(error);
  }
})();
