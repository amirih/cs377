import { createTablesQuery, insertDataQuery } from "./queries";

export const databaseQuery = async (pool, queryString) => {
  let client;
  try {
    client = await pool.connect();
    const queryResult = await client.query(queryString);
    return { data: queryResult.rows };
  } catch (err) {
    return { error: err.message };
  } finally {
    if (client) {
      client.release();
    }
  }
};

export const getTables = async (pool) => {
  const queryString = `SELECT tablename 
  FROM pg_catalog.pg_tables 
  WHERE schemaname NOT IN ('pg_catalog', 'information_schema');`;
  const queryResult = await databaseQuery(pool, queryString);
  return queryResult;
};
export const createDefaultTables = async (pool) => {
  const queryResult = await databaseQuery(pool, createTablesQuery);
  return queryResult;
};

export const insertDefaultData = async (pool) => {
  const queryResult = await databaseQuery(pool, insertDataQuery);
  return queryResult;
};

export const dropTables = async (pool) => {
  const queryString = `drop schema if exists University cascade;`;
  const queryResult = await databaseQuery(pool, queryString);
  return queryResult;
};

export const resetDemo = async (pool) => {
  const queryResult = await databaseQuery(pool, createTablesQuery);
  if (queryResult.error) {
    return queryResult;
  }
  const insertResult = await databaseQuery(pool, insertDataQuery);
  return insertResult;
};
