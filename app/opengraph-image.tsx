import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0ea5e9 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#38bdf8",
            marginBottom: 16,
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 12, color: "#cbd5e1" }}>
          {SITE.title}
        </div>
        <div style={{ fontSize: 22, marginTop: 28, maxWidth: 900, color: "#94a3b8" }}>
          Scalable APIs · Node.js · MongoDB · System Design
        </div>
      </div>
    ),
    { ...size },
  );
}
