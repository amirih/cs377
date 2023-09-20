import { demoPool as pool } from "@db/pool";
import { resetDemo } from "@db/utils";
export default async (req, res) => {
  const result = await resetDemo(pool);
  if (result.error) {
    return res.status(500).json(result);
  }
  return res.status(200).json(result);
};
