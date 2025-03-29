const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "perntodo",
  password: "rama1234",
  port: 5432, // Default PostgreSQL port
});

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todo (
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL
      );
    `);
    console.log("Table created successfully!");
  } catch (err) {
    console.error("Error creating table:", err.message);
  } finally {
    pool.end();
  }
};

createTable();