import { ImageResponse } from "next/og";
import { ALL_ROWS } from "@/lib/byd";
import { OG_SIZE, OG_CONTENT_TYPE, loadOgAssets, OgCard } from "../og-shared";

export const alt = "BYD Battery-Box Model Finder";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const { candi, greendeal, fonts } = await loadOgAssets();

  return new ImageResponse(
    (
      <OgCard
        candi={candi}
        greendeal={greendeal}
        headline={["BYD Battery-Box", "Model Finder"]}
        subline={`${ALL_ROWS.length} CEC-approved BYD model numbers, across HVS, HVM, HVM+, HVB, HVE, LVS, LVL and LV Flex.`}
      />
    ),
    { ...size, fonts }
  );
}
