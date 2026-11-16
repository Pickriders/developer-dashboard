import { ImageResponse } from "next/og";

export const alt = "Pickriders API docs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card social sites show for /docs and every page under it (pages without their own). */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #170f2a 0%, #2a1c4a 60%, #1f5c58 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 700 }}>
        Pickriders
        <span style={{ color: "#55b9b3", fontFamily: "monospace" }}>docs_</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Send a delivery from your app.</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.75)" }}>
          Get a test key, ask for a price, book it. About 10 minutes.
        </div>
      </div>
    </div>,
    size,
  );
}
