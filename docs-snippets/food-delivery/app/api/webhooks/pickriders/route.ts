import "@/lib/listeners"; // what to do with each event
import { pickriders } from "@/lib/pickriders";

// Checks each event's signature, skips repeats, and runs your listeners. If one throws, it
// answers 500 and Pickriders sends the event again later.
export const POST = pickriders.webhooks.handler();
