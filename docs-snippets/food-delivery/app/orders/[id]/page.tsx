import { notFound } from "next/navigation";

import { naira } from "@/lib/money";
import { getOrder } from "@/lib/store";

import { LiveDelivery } from "./live-delivery";

export const dynamic = "force-dynamic";

const MESSAGES = {
  paid: "Mama's Kitchen is cooking your food.",
  ready: "Your food is packed. A rider is on the way to collect it.",
  on_the_way: "Your food is on the way.",
  delivered: "Delivered. Enjoy your meal!",
  delivery_problem: "Something went wrong with the delivery. We're calling you now.",
  cancelled: "This order was cancelled.",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();

  return (
    <main>
      <h1>Order {order.id}</h1>
      <p>{MESSAGES[order.status]}</p>
      {order.delivery && order.status !== "paid" && (
        // Only the tracking link goes to the browser: no key, no phone numbers.
        <LiveDelivery trackingUrl={order.delivery.tracking_url} />
      )}
      <p>Total paid: {naira(order.food_total + (order.delivery?.fee ?? 0))}</p>
    </main>
  );
}
