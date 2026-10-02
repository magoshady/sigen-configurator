import { ImageResponse } from "next/og";
import { ROWS } from "@/lib/foxess";
import { OG_SIZE, OG_CONTENT_TYPE, loadOgAssets, OgCard } from "../og-shared";

export const alt = "FoxESS Battery Model Finder";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const { candi, greendeal, fonts } = await loadOgAssets();

  return new ImageResponse(
    (
      <OgCard
        candi={candi}
        greendeal={greendeal}
        headline={["FoxESS Battery", "Model Finder"]}
        subline={`${ROWS.length} CEC-approved FoxESS model numbers, across seven stackable series and the EP range.`}
      />
    ),
    { ...size, fonts }
  );
}
