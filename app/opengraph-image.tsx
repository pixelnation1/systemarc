import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "SystemArc. Software built around your business. Custom software and business systems.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0D10",
          color: "#F2F0EA",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              background: "#356BFF",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "-0.03em" }}>
            SystemArc
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 860,
            }}
          >
            Software built around your business.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#A5A8AE",
              maxWidth: 760,
            }}
          >
            Custom software, automation, and digital systems.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
