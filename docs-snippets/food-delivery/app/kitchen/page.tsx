import { isFinalStatus } from "pickriders";

import { naira } from "@/lib/money";
import { testMode } from "@/lib/pickriders";
import { listOrders } from "@/lib/store";

import { cancelDelivery, foodIsReady, playRider } from "./actions";

export const dynamic = "force-dynamic"; // always the latest orders

export default function KitchenBoard() {
  const orders = listOrders();
  return (
    <main>
      <h1>Kitchen</h1>
      {testMode && (
        <p>Test mode: no real riders. Use “Play the rider” to move a delivery on.</p>
      )}
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>For</th>
            <th>Status</th>
            <th>Delivery</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const delivery = order.delivery;
            const moving = delivery && !isFinalStatus(delivery.status);
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                <td>{order.status.replaceAll("_", " ")}</td>
                <td>
                  {delivery
                    ? `${delivery.number} · ${delivery.status.replaceAll("_", " ")} · ${naira(delivery.fee)}`
                    : "not booked"}
                  {delivery?.rider && ` · ${delivery.rider}`}
                </td>
                <td>
                  {order.status === "paid" && delivery && (
                    <form action={foodIsReady.bind(null, order.id)}>
                      <button>Food is ready</button>
                    </form>
                  )}
                  {testMode && moving && order.status !== "paid" && (
                    <form action={playRider.bind(null, order.id)}>
                      <button>Play the rider</button>
                    </form>
                  )}
                  {moving && (
                    <form action={cancelDelivery.bind(null, order.id)}>
                      <button>Cancel delivery</button>
                    </form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
