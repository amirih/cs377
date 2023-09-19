const databaseQuery = async (pool, queryString) => {
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

export default databaseQuery;
