// @file pages/api/webhooks/pickriders.ts
import { pickriders } from "@/lib/pickriders";

// The Pages Router parses bodies by default. Turn that off, so the signature can be checked.
export const config = { api: { bodyParser: false } };

export default pickriders.webhooks.nodeHandler();
