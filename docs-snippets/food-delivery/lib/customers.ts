import type { StopInput } from "pickriders";

export type Customer = {
  name: string;
  phone: string;
  address: string;
  lat: number;
  lng: number;
};

/**
 * Three places to deliver to while you build. In your shop, the customer types an address and a
 * places search (Google Places, Mapbox…) gives its coordinates: Pickriders needs both.
 */
export const DEMO_CUSTOMERS: Customer[] = [
  {
    name: "Ada Obi",
    phone: "+2348098765432",
    address: "12 Awolowo Road, Ikoyi, Lagos",
    lat: 6.4474,
    lng: 3.4248,
  },
  {
    name: "Tunde Bakare",
    phone: "+2348031112222",
    address: "7 Adeola Odeku Street, Victoria Island, Lagos",
    lat: 6.4302,
    lng: 3.4216,
  },
  {
    name: "Chioma Eze",
    phone: "+2348055556666",
    address: "3 Admiralty Road, Lekki Phase 1, Lagos",
    lat: 6.4475,
    lng: 3.4705,
  },
];

/** The customer's door, as a drop-off stop. The rider calls this contact on arrival. */
export const dropoffFor = (customer: Customer): StopInput => ({
  address: customer.address,
  lat: customer.lat,
  lng: customer.lng,
  contact: { name: customer.name, phone: customer.phone },
});
