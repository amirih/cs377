import { demoPool as pool } from "@db/pool";
import { databaseQuery, getTables } from "@db/utils";

export default async (req, res) => {
  const { query } = req.query;

  let result = null;
  result = await databaseQuery(pool, query);
  const tables = await getTables(pool);
  result.tables = tables.data;

  console.log("result", result);
  console.log("tables", tables);
  console.log("error", result.error);

  if (result.error) {
    console.log("error happened");
    return res.status(500).json(result);
  }

  return res.status(200).json(result);
};
