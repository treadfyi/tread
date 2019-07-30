import fetch from "node-fetch";
import { Pool } from "pg";

export default async (req, res) => {
  try {
    const { code } = req.query;

    const { access_token } = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${
        process.env.GITHUB_CLIENT_ID
      }&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
      {
        headers: {
          Accept: "application/json"
        },
        method: "POST"
      }
    ).then(response => response.json());

    const user = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => response.json());

    const pool = new Pool();

    const account = await pool.query(
      `SELECT * FROM accounts WHERE github_id = '${user.id}'`
    );

    if (account.rows.length === 0) {
      const clientID = Math.random()
        .toString(36)
        .substring(2, 15);

      await pool.query(
        `INSERT INTO accounts (
        client_id,
        github_id
      ) VALUES (
        '${clientID}',
        '${user.id}'
      )`
      );
    }

    await pool.end();

    res.setHeader("Content-Type", "application/json");

    res.setHeader("Location", "/");

    res.statusCode = 302;

    res.end();
  } catch (error) {
    res.statusCode = 500;

    res.end(JSON.stringify({ error: error, tracked: false }));
  }
};
