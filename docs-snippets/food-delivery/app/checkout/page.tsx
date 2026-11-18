import { CART, cartTotal } from "@/lib/menu";
import { naira } from "@/lib/money";

import { CheckoutForm } from "./checkout-form";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <ul>
        {CART.map((item) => (
          <li key={item.name}>
            {item.quantity} × {item.name}: {naira(item.price * item.quantity)}
          </li>
        ))}
      </ul>
      <CheckoutForm foodTotal={cartTotal()} />
    </main>
  );
}
