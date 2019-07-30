import { Pool } from "pg";

export default async (req, res) => {
  try {
    const pool = new Pool();

    const data = await pool.query(
      `SELECT * FROM accounts WHERE github_id = '${req.query.id}'`
    );

    await pool.end();

    res.setHeader("Content-Type", "application/json");

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        data: data.rows[0],
        error: null
      })
    );
  } catch (error) {
    res.statusCode = 500;

    res.end(JSON.stringify({ error: error, tracked: false }));
  }
};
