module.exports = async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    const body = JSON.parse(req.body);

    console.log(body);

    // TODO: Connect to DB
    // TODO: Check req.body.clientID is a valid account and has whitelisted req.body.url in DB
    // TODO: Store event in DB

    res.writeHead(200, headers);

    res.end(JSON.stringify({ error: null, tracked: true }));
  } catch (error) {
    res.writeHead(500, headers);

    res.end(JSON.stringify({ error: error, tracked: false }));
  }
};
