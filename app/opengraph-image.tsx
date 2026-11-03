import { ImageResponse } from "next/og";
export const alt = "SystemArc | Software, Automation & Media";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#2452d6", color: "white", padding: "56px 64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}><span style={{ fontWeight: 700 }}>SystemArc</span><span>Software / Automation / Media</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, letterSpacing: -5, lineHeight: 1.05 }}><span>Build smarter.</span><span>Reach further. Work better.</span></div>
      <div style={{ display: "flex", fontSize: 24 }}>Products, custom platforms, and media. Connected.</div>
    </div>, size,
  );
}
