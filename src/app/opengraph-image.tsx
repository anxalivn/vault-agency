import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — Fansly & OnlyFans Management Agency`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same composition as the site: one blush field, black type, the logo set large.
export default async function Image() {
  const svg = await readFile(path.join(process.cwd(), "public/logo/vault-logo-black.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#ffb3e7",
          color: "#000000",
        }}
      >
        <img src={logo} alt="" width={420} height={87} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>
            You create.
          </div>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>
            We cover the rest.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30 }}>
            Woman-owned Fansly &amp; OnlyFans management.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
