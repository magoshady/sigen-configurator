import { ImageResponse } from "next/og";
import { MODELS } from "@/lib/sigenergy";
import { OG_SIZE, OG_CONTENT_TYPE, loadOgAssets, OgCard } from "./og-shared";

export const alt = "SigenStor Battery Configuration Finder";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const { candi, greendeal, fonts } = await loadOgAssets();

  return new ImageResponse(
    (
      <OgCard
        candi={candi}
        greendeal={greendeal}
        headline={["SigenStor Battery", "Configuration Finder"]}
        subline={`${MODELS.length.toLocaleString()} CEC-approved model numbers, searchable by module count or name.`}
      />
    ),
    { ...size, fonts }
  );
}
