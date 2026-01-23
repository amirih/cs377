import { Pool } from "pg";

export const demoPool = new Pool({
  user: "cs377_students",
  host: "45.55.151.158",
  database: "demo",
  password: "cs377_students_password",
  port: 5432,
});

export const demo3Pool = new Pool({
  user: "cs377_students",
  host: "45.55.151.158",
  database: "demo3",
  password: "cs377_students_password",
  port: 5432,
});
