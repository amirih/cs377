import { demoPool as pool } from "@db/pool";
import { databaseQuery, getTables } from "@db/utils";

export default async (req, res) => {
  const { query } = req.query;
  const result = await databaseQuery(pool, query);
  if (result.error) {
    res.status(500).json(result);
  }
  const tables = await getTables(pool);
  result.tables = tables.data;

  res.status(200).json(result);
};
