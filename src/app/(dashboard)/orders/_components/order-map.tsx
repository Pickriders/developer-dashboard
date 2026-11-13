"use client";

import * as React from "react";
import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

import { GOOGLE_MAP_ID, GOOGLE_MAPS_API_KEY } from "@/constant";
import { cn } from "@/lib/utils";

export type MapPoint = { lat: number; lng: number };
export type MapStop = MapPoint & { id: string; role: "pickup" | "dropoff"; done: boolean; label: string };

/**
 * The order on a map: its stops in route order and the rider, where known. Google Maps when a key
 * is configured; otherwise a drawn route on the same coordinates, so the page never has a hole.
 */
export function OrderMap({
  stops,
  rider,
  className,
}: {
  stops: MapStop[];
  rider: MapPoint | null;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-surface-subtle", className)}>
      {GOOGLE_MAPS_API_KEY ? (
        <GoogleOrderMap stops={stops} rider={rider} />
      ) : (
        <RouteSketch stops={stops} rider={rider} />
      )}
    </div>
  );
}

function GoogleOrderMap({ stops, rider }: { stops: MapStop[]; rider: MapPoint | null }) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        mapId={GOOGLE_MAP_ID || "DEMO_MAP_ID"}
        defaultCenter={stops[0] ?? { lat: 6.45, lng: 3.4 }}
        defaultZoom={12}
        disableDefaultUI
        zoomControl
        gestureHandling="cooperative"
        className="size-full"
      >
        <FitBounds points={[...stops, ...(rider ? [rider] : [])]} />
        {stops.map((stop, i) => (
          <AdvancedMarker key={stop.id} position={stop} title={stop.label}>
            <Pin role={stop.role} done={stop.done} n={i} />
          </AdvancedMarker>
        ))}
        {rider && (
          <AdvancedMarker position={rider} title="Rider" zIndex={10}>
            <RiderDot />
          </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
}

function FitBounds({ points }: { points: MapPoint[] }) {
  const map = useMap();
  const key = points.map((p) => `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`).join("|");
  React.useEffect(() => {
    if (!map || !points.length) return;
    const bounds = new google.maps.LatLngBounds();
    points.forEach((p) => bounds.extend(p));
    map.fitBounds(bounds, 64);
    // Refit when the points move, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key]);
  return null;
}

function Pin({ role, done, n }: { role: MapStop["role"]; done: boolean; n: number }) {
  return (
    <span
      className={cn(
        "grid size-8 place-items-center rounded-full border-[3px] border-white text-xs font-extrabold text-white shadow-pop",
        done ? "bg-success" : role === "pickup" ? "bg-plum" : "bg-brand-solid",
      )}
    >
      {role === "pickup" ? "P" : n}
    </span>
  );
}

function RiderDot() {
  return (
    <span className="relative grid size-5 place-items-center">
      <span className="absolute inset-0 animate-ping rounded-full bg-brand/50" />
      <span className="relative size-4 rounded-full border-[3px] border-white bg-brand shadow-pop" />
    </span>
  );
}

/** The route drawn to scale on a soft grid: stops joined in order, the rider pulsing where known. */
function RouteSketch({ stops, rider }: { stops: MapStop[]; rider: MapPoint | null }) {
  const W = 640;
  const H = 360;
  const pad = 56;
  const points = [...stops, ...(rider ? [rider] : [])];
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const span = Math.max(maxLat - minLat, maxLng - minLng, 0.005);
  const scale = Math.min((W - pad * 2) / span, (H - pad * 2) / span);
  const cx = (minLng + maxLng) / 2;
  const cy = (minLat + maxLat) / 2;
  const x = (p: MapPoint) => W / 2 + (p.lng - cx) * scale;
  const y = (p: MapPoint) => H / 2 - (p.lat - cy) * scale;
  const path = stops.map((s, i) => `${i ? "L" : "M"}${x(s).toFixed(1)},${y(s).toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="size-full" role="img" aria-label="Route of the order">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" className="stroke-line" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#grid)" />
      <path d={path} fill="none" className="stroke-brand" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      {stops.map((stop, i) => (
        <g key={stop.id} transform={`translate(${x(stop)},${y(stop)})`}>
          <circle
            r="15"
            className={stop.done ? "fill-success" : stop.role === "pickup" ? "fill-plum" : "fill-brand-solid"}
          />
          <circle r="15" fill="none" stroke="white" strokeWidth="3" />
          <text textAnchor="middle" dy="4.5" className="fill-white text-[12px] font-extrabold">
            {stop.role === "pickup" ? "P" : i}
          </text>
        </g>
      ))}
      {rider && (
        <g transform={`translate(${x(rider)},${y(rider)})`}>
          <circle
            r="16"
            className="animate-ping fill-brand/30"
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
          <circle r="8" className="fill-brand" stroke="white" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}
