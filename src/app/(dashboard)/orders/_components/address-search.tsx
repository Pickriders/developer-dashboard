"use client";

import * as React from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";

import { Input } from "@/components/ui/input";
import { GOOGLE_MAPS_API_KEY } from "@/constant";

type Place = { address: string; lat: number; lng: number };

/**
 * An address box that finds the place as you type (Google Places, Nigeria first) and hands back its
 * coordinates. Only rendered when a Maps key is configured; the form takes coordinates otherwise.
 */
export function AddressSearch(props: {
  id: string;
  value: string;
  onText: (text: string) => void;
  onPlace: (place: Place) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <PlacesInput {...props} />
    </APIProvider>
  );
}

function PlacesInput({ id, value, onText, onPlace, invalid, describedBy }: Parameters<typeof AddressSearch>[0]) {
  const places = useMapsLibrary("places");
  const input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!places || !input.current) return;
    const auto = new places.Autocomplete(input.current, {
      fields: ["formatted_address", "geometry", "name"],
      componentRestrictions: { country: "ng" },
    });
    const listener = auto.addListener("place_changed", () => {
      const place = auto.getPlace();
      const at = place.geometry?.location;
      if (!at) return;
      onPlace({ address: place.formatted_address ?? place.name ?? "", lat: at.lat(), lng: at.lng() });
    });
    return () => listener.remove();
    // The callbacks change each render; the widget is set up once per input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  return (
    <Input
      ref={input}
      id={id}
      value={value}
      onChange={(e) => onText(e.target.value)}
      placeholder="Start typing an address"
      autoComplete="off"
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
    />
  );
}
