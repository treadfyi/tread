const { Pool } = require("pg");

module.exports = async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    const pool = new Pool();

    const body = JSON.parse(req.body);

    const account = await pool.query(
      `SELECT * FROM accounts WHERE client_id = '${body.clientID}'`
    );

    if (account.rows.length === 0) {
      throw "Invalid client ID";
    }

    const referer = req.headers.referer;

    if (referer !== body.url) {
      throw "Invalid event url";
    }

    await pool.query(
      `INSERT INTO events (
        client_id,
        target_class_name,
        target_id,
        target_node_name,
        target_text_content,
        timestamp,
        type,
        url
      ) VALUES (
        '${body.clientID}',
        '${body.target.className}',
        '${body.target.id}',
        '${body.target.nodeName}',
        '${body.target.textContent}',
        ${body.timestamp},
        '${body.type}',
        '${body.url}'
      )`
    );

    await pool.end();

    res.writeHead(200, headers);

    res.end(JSON.stringify({ error: null, tracked: true }));
  } catch (error) {
    res.writeHead(500, headers);

    res.end(JSON.stringify({ error: error, tracked: false }));
  }
};
