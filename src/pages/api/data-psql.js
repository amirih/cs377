// pages/api/data.js
import { Pool } from "pg";

const pool = new Pool({
  user: "cs377_students",
  host: "20.98.38.207",
  database: "demo",
  password: "cs377_students_password",
  port: 5432, // Convert the environment variable to a number since it's a port
});

export default async (req, res) => {
  console.log("Hello from data-psql.js");

  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM university.course");
    const results = { results: result ? result.rows : null };
    res.status(200).json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
