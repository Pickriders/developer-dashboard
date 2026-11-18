// @file src/server.ts
import { createServer } from "node:http";

import "./delivery-listeners";
import { pickriders } from "./pickriders";

const webhooks = pickriders.webhooks.nodeHandler();

createServer((req, res) => {
  if (req.method === "POST" && req.url === "/webhooks/pickriders")
    return webhooks(req, res);
  res.statusCode = 404;
  res.end();
}).listen(3000);
