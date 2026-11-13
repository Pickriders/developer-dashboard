import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS, type OrderStatus } from "@/lib/dashboard/orders";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, tone } = ORDER_STATUS[status];
  return (
    <Badge tone={tone} dot>
      {label}
    </Badge>
  );
}
