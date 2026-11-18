import Pickriders from "pickriders";

const pickriders = new Pickriders();

const account = await pickriders.account.retrieve();
const wallet = await pickriders.wallet.retrieve();

console.log(
  `Connected as ${account.name}, in ${account.livemode ? "LIVE" : "test"} mode.`,
);
console.log(
  `Wallet: ₦${(wallet.available / 100).toLocaleString()} to spend on deliveries.`,
);
