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

    if (typeof user.id === "undefined") {
      throw "Could not authenticate GitHub user";
    }

    const pool = new Pool();

    let clientID;

    const account = await pool.query(
      `SELECT * FROM accounts WHERE github_id = '${user.id}'`
    );

    if (account.rows.length === 0) {
      clientID = Math.random()
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
    } else {
      clientID = account.rows[0].client_id;
    }

    await pool.end();

    res.writeHead(302, {
      "Set-Cookie": `tread_app_client_id=${clientID}; Max-Age=2629800; Path=/`,
      Location: "/"
    });

    res.end(JSON.stringify({ error: null }));
  } catch (error) {
    res.statusCode = 500;

    res.end(JSON.stringify({ error: error }));
  }
};
