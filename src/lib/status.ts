import type { StatusDto } from "@/services/apiService";

export type ComponentState = StatusDto["status"];
export type Incident = StatusDto["incidents"][number];

/** How each state is said, and its colour (a design-system tone). */
export const STATE: Record<
  ComponentState,
  { label: string; headline: string; tone: "success" | "warning" | "danger" }
> = {
  operational: { label: "Operational", headline: "All systems operational", tone: "success" },
  degraded_performance: { label: "Degraded performance", headline: "Some systems are slow", tone: "warning" },
  partial_outage: { label: "Partial outage", headline: "Some systems are having problems", tone: "danger" },
  major_outage: { label: "Major outage", headline: "Major outage", tone: "danger" },
};

export const INCIDENT_STATUS: Record<Incident["status"], string> = {
  investigating: "Investigating",
  identified: "Identified",
  monitoring: "Monitoring",
  resolved: "Resolved",
};

export const IMPACT: Record<Incident["impact"], string> = {
  minor: "Minor",
  major: "Major",
  critical: "Critical",
};

/** Share of days with no incident affecting the part, as status pages show it: "99.89%". */
export function uptime(history: { status: ComponentState }[]): string {
  if (!history.length) return "—";
  const good = history.filter((d) => d.status === "operational").length;
  const pct = (good / history.length) * 100;
  return `${pct === 100 ? "100" : pct.toFixed(2)}%`;
}

/** How long an incident lasted (or has lasted): "42 min", "3 h 5 min". */
export function duration(startedAt: string, resolvedAt: string | null, now = Date.now()): string {
  const minutes = Math.max(
    1,
    Math.round(((resolvedAt ? new Date(resolvedAt).getTime() : now) - new Date(startedAt).getTime()) / 60_000),
  );
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
