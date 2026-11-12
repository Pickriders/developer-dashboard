import * as React from "react";

import { Badge } from "@/components/ui/badge";
import type { PublicWebhookEndpointDto } from "@/services/apiService";

/** Enabled, Failing (every delivery failing, not yet turned off), Turned off (by you or by us). */
export function EndpointStatus({ endpoint }: { endpoint: PublicWebhookEndpointDto }) {
  if (endpoint.status === "disabled")
    return (
      <Badge tone={endpoint.disabled_reason === "failing" ? "danger" : "neutral"} dot>
        {endpoint.disabled_reason === "failing" ? "Turned off: failing" : "Turned off"}
      </Badge>
    );
  if (endpoint.failing_since)
    return (
      <Badge tone="warning" dot>
        Failing
      </Badge>
    );
  return (
    <Badge tone="success" dot>
      Enabled
    </Badge>
  );
}
