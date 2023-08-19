// pages/api/data.js
import sqlite3 from "sqlite3";

export default (req, res) => {
  console.log("Hello from data.js");
  console.log(process.cwd());
  const db = new sqlite3.Database(
    "./db/pol.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the SQlite database.");
    }
  );

  db.serialize(() => {
    db.all("SELECT * FROM AgentStateTable LIMIT 10", (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("rows");
      console.log(rows);
      res.status(200).json(rows);
    });
  });

  db.close();
};
