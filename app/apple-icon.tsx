import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 36,
            height: 36,
            borderTop: "4px solid #4355e8",
            borderLeft: "4px solid #4355e8",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 36,
            height: 36,
            borderBottom: "4px solid #7c3aed",
            borderRight: "4px solid #7c3aed",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 2,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -2,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            PY
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#4355e8",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            .
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
