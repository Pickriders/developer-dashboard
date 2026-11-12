import * as React from "react";

import { Badge } from "@/components/ui/badge";
import type { WebhookDeliveryDto } from "@/services/apiService";

/** Succeeded, Failed (retries over), Retrying (failed, will try again), Sending. */
export function DeliveryStatus({ delivery }: { delivery: Pick<WebhookDeliveryDto, "status" | "attempt_count"> }) {
  switch (delivery.status) {
    case "succeeded":
      return (
        <Badge tone="success" dot>
          Succeeded
        </Badge>
      );
    case "failed":
      return (
        <Badge tone="danger" dot>
          Failed
        </Badge>
      );
    case "pending":
      return delivery.attempt_count ? (
        <Badge tone="warning" dot>
          Retrying
        </Badge>
      ) : (
        <Badge tone="neutral" dot>
          Queued
        </Badge>
      );
    default:
      return (
        <Badge tone="info" dot>
          Sending
        </Badge>
      );
  }
}
