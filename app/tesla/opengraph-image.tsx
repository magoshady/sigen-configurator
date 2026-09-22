import { ImageResponse } from "next/og";
import { ROWS } from "@/lib/tesla";
import { OG_SIZE, OG_CONTENT_TYPE, loadOgAssets, OgCard } from "../og-shared";

export const alt = "Tesla Battery Model Finder";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const { candi, greendeal, fonts } = await loadOgAssets();

  return new ImageResponse(
    (
      <OgCard
        candi={candi}
        greendeal={greendeal}
        headline={["Tesla Battery", "Model Finder"]}
        subline={`${ROWS.length} CEC-approved Tesla model numbers, covering Powerwall 3 and Expansion configurations.`}
      />
    ),
    { ...size, fonts }
  );
}
