import { demoPool as pool } from "@db/pool";
import databaseQuery from "@db/databaseQuery";

export default async (req, res) => {
  const { query } = req.query;
  const result = await databaseQuery(pool, query);
  if (result.error) {
    res.status(500).json(result);
  }
  res.status(200).json(result);
};
