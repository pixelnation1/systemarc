import { ImageResponse } from "next/og";
export const alt = "SystemArc | Creative, Media & Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#2452d6", color: "white", padding: "56px 64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}><span style={{ fontWeight: 700 }}>SystemArc</span><span>Creative / Media / Technology</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, letterSpacing: -5, lineHeight: 1.05 }}><span>Get attention.</span><span>Build what’s next.</span></div>
      <div style={{ display: "flex", fontSize: 24 }}>Independent thinking. Connected execution.</div>
    </div>, size,
  );
}
