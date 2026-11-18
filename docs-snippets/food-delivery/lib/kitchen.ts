import type { StopInput } from "pickriders";

/** Where Mama's Kitchen delivers: Lagos. Pickriders calls this a service area. */
export const SERVICE_AREA = "NG-LA";

/**
 * Where riders collect the food. The coordinates are what the rider navigates to; the address is
 * the label they read. Look yours up once on a map and keep them here.
 */
export const KITCHEN: StopInput = {
  address: "14 Admiralty Way, Lekki Phase 1, Lagos",
  lat: 6.4335,
  lng: 3.4523,
  contact: { name: "Mama's Kitchen", phone: "+2348012345678" },
  instructions: "Collect from the side window, by the blue door",
};
