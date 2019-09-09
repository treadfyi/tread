const cookie = require("cookie");
const { Client } = require("pg");
const polka = require("polka");

require("dotenv").config();

const { PORT = 3003 } = process.env;

polka()
  .get("/", async (req, res) => {
    try {
      const cookies = cookie.parse(req.headers.cookie);

      const clientID = cookies["tread_app_client_id"];

      if (typeof clientID === "undefined") {
        throw "Unauthenticated";
      }

      const client = new Client();

      client.connect();

      client.query("LISTEN sessions_insert");
      client.query("LISTEN events_insert");

      if (req.headers.accept == "text/event-stream") {
        res.writeHead(200, {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": process.env.ALLOW_ORIGIN,
          "Access-Control-Expose-Headers": "*",
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive"
        });

        client.on("notification", msg => {
          const payload = JSON.parse(msg.payload);

          if (payload.client_id === clientID) {
            res.write(`id: ${payload.id}\n`);
            res.write(`event: ${msg.channel}\n`);
            res.write(`data: ${msg.payload}\n\n`);
          }
        });
      } else {
        return res.end();
      }

      res.socket.on("end", async () => {
        await client.end();

        res.end();
      });
    } catch (error) {
      res.statusCode = 500;

      res.end(JSON.stringify({ error: error }));
    }
  })
  .listen(PORT, error => {
    if (error) throw error;

    console.log(`🧿  Tread realtime service running`);
  });
