/**
 * Stand-ins for the reader's own code that the SDK guide examples call: their database and
 * messaging. Ambient, so the examples stay short. The tutorial app has real versions.
 */
interface ShopOrder {
  id: string;
  status: "paid" | "out_for_delivery" | "delivered" | "needs_attention";
  customer: { name: string; phone: string; address: string; lat: number; lng: number };
  delivery_id?: string;
  tracking_url?: string;
}

declare const db: {
  orders: {
    get(id: string): Promise<ShopOrder>;
    update(id: string, fields: Partial<ShopOrder>): Promise<void>;
  };
};

declare function notifyCustomer(phone: string, message: string): Promise<void>;
declare function alertTheTeam(message: string): Promise<void>;

/** The shop's own pickup point. */
declare const SHOP: import("pickriders").StopInput;
