import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 10,
            height: 10,
            borderTop: "2px solid #4355e8",
            borderLeft: "2px solid #4355e8",
          }}
        />
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -0.5,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          PY
        </div>
      </div>
    ),
    { ...size },
  );
}
