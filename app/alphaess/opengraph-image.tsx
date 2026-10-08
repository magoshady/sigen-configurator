import { ImageResponse } from "next/og";
import { ROWS } from "@/lib/alphaess";
import { OG_SIZE, OG_CONTENT_TYPE, loadOgAssets, OgCard } from "../og-shared";

export const alt = "Alpha ESS Battery Model Finder";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const { candi, greendeal, fonts } = await loadOgAssets();
  const distinctModels = new Set(ROWS.map((r) => r.m)).size;

  return new ImageResponse(
    (
      <OgCard
        candi={candi}
        greendeal={greendeal}
        headline={["Alpha ESS", "Model Finder"]}
        subline={`${distinctModels} CEC-approved Alpha ESS models, across SMILE5, SMILE-G3, SMILE-M5/M10, SMILE-T10-HV, SMILE-S5/B5 and StaX.`}
      />
    ),
    { ...size, fonts }
  );
}
