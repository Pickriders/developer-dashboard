import "server-only"; // your secret key never reaches the browser: importing this there fails the build
import Pickriders from "pickriders";

import { SERVICE_AREA } from "./kitchen";

// One client for the app. It reads PICKRIDERS_KEY and PICKRIDERS_WEBHOOK_SECRET from .env.local.
export const pickriders = new Pickriders({ serviceArea: SERVICE_AREA });

/** True with a sk_test_ key: the kitchen gets a button to play the rider. */
export const testMode = !pickriders.livemode;
