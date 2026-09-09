import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { MODELS } from "@/lib/models";

export const alt = "SigenStor Battery Configuration Finder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Read a bundled file and return it as a data URI satori can inline. */
async function dataUri(relPath: string, mime: string) {
  const bytes = await readFile(join(process.cwd(), relPath));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

function font(weight: number) {
  return readFile(
    join(
      process.cwd(),
      `node_modules/@fontsource/manrope/files/manrope-latin-${weight}-normal.woff`
    )
  );
}

export default async function Image() {
  const [candi, greendeal, bold, extrabold] = await Promise.all([
    dataUri("public/logo.png", "image/png"),
    dataUri("public/greendeal.png", "image/png"),
    font(700),
    font(800),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#1d2225",
          fontFamily: "Manrope",
        }}
      >
        {/* The brand gradient, same rule the site uses under its header. */}
        <div
          style={{
            height: 12,
            background: "linear-gradient(90deg, #01e748, #01a6a6, #0168fc)",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                width: 72,
                height: 72,
                borderRadius: 18,
                background: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={candi} width={52} height={51} alt="" />
            </div>
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 4,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              CANDI SOLUTIONS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 82,
                fontWeight: 800,
                letterSpacing: -2.5,
                lineHeight: 1.05,
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>SigenStor Battery</span>
              <span>Configuration Finder</span>
            </div>
            <span
              style={{
                marginTop: 24,
                fontSize: 28,
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {MODELS.length.toLocaleString()} CEC-approved model numbers, searchable
              by module count or name.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 18,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 3,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              PREPARED EXCLUSIVELY FOR
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={greendeal} width={244} height={42} alt="" />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: bold, weight: 700, style: "normal" },
        { name: "Manrope", data: extrabold, weight: 800, style: "normal" },
      ],
    }
  );
}
