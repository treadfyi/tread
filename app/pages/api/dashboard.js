import cookie from "cookie";
import { Pool } from "pg";

export default async (req, res) => {
  try {
    const pool = new Pool();

    const cookies = cookie.parse(req.headers.cookie);

    const clientID = cookies["tread_app_client_id"];

    if (typeof clientID === "undefined") {
      throw "Unauthenticated";
    }

    const accounts = await pool.query(
      `SELECT * FROM accounts WHERE client_id = '${clientID}'`
    );

    if (accounts.rows.length === 0) {
      throw "Account not found";
    }

    const events = await pool.query(
      `SELECT * FROM events WHERE client_id = '${clientID}'`
    );

    const sessions = await pool.query(
      `SELECT * FROM sessions WHERE client_id = '${clientID}'`
    );

    await pool.end();

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        data: {
          account: accounts.rows[0],
          events: events.rows,
          sessions: sessions.rows
        },
        error: null
      })
    );
  } catch (error) {
    res.statusCode = 500;

    res.end(JSON.stringify({ data: null, error: error }));
  }
};
