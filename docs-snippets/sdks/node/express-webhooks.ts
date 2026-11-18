// @file src/app.ts
import express from "express";

import "./delivery-listeners";
import { pickriders } from "./pickriders";

const app = express();

// Before express.json(): the signature is checked against the body exactly as it arrived.
app.post(
  "/webhooks/pickriders",
  express.raw({ type: "application/json" }),
  pickriders.webhooks.nodeHandler(),
);

app.use(express.json());
// … the rest of your routes

app.listen(3000);
