/** Today's basket. A real shop has a cart; the delivery part works the same. Prices in kobo. */
export const CART = [
  { name: "Jollof rice and chicken", price: 450000, quantity: 2 },
  { name: "Fried plantain (dodo)", price: 80000, quantity: 1 },
];

export const cartTotal = () =>
  CART.reduce((sum, item) => sum + item.price * item.quantity, 0);
