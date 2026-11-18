// @file app/orders/[id]/page.tsx
import { LiveDelivery } from "./live-delivery";

// A Server Component: it reads your database and hands the tracking link to the browser.
export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shopOrder = await db.orders.get(id);
  return (
    <main>
      <h1>Order {shopOrder.id}</h1>
      {shopOrder.tracking_url ? (
        <LiveDelivery trackingUrl={shopOrder.tracking_url} />
      ) : (
        <p>We&apos;ll book a rider as soon as your food is ready.</p>
      )}
    </main>
  );
}
