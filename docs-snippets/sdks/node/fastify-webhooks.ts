// @file src/server.ts
import Fastify from "fastify";

import "./delivery-listeners";
import { pickriders } from "./pickriders";

const app = Fastify();

// Keep JSON bodies as raw bytes, so their signatures can be checked.
app.addContentTypeParser(
  "application/json",
  { parseAs: "buffer" },
  (_req, body, done) => done(null, body),
);

app.post("/webhooks/pickriders", async (req, reply) => {
  try {
    const event = await pickriders.webhooks.constructEvent(
      req.body as Buffer,
      req.headers["pickriders-signature"] as string | undefined,
    );
    await pickriders.webhooks.dispatch(event); // your listeners, and every tracker
    return reply.code(200).send({ received: true });
  } catch (error) {
    return reply.code(400).send({ error: (error as Error).message });
  }
});

await app.listen({ port: 3000 });
