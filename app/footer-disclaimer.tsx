"use client";

import { usePathname } from "next/navigation";
import { brandForPath } from "@/lib/brands";

/** Legal copy in the footer that names the current page's brand and data source. */
export default function FooterDisclaimer() {
  const pathname = usePathname();
  const brand = brandForPath(pathname);

  return (
    <div className="space-y-2 text-[11px] leading-relaxed text-white/40 max-w-2xl">
      <p>
        Model data is derived from the {brand.dataSource} and reflects that
        list at the time of publication. It is provided as a lookup aid only.
      </p>
      <p>
        Selecting the exact matching model number is a strict requirement
        for a valid STC claim. An incorrect selection may lead to delays or
        rejection by the Clean Energy Regulator. Always confirm the model
        against the{" "}
        <a
          className="text-white/60 underline underline-offset-2 hover:text-white"
          href="https://cleanenergycouncil.org.au/industry-programs/products-program/batteries"
          target="_blank"
          rel="noreferrer"
        >
          CEC approved battery list
        </a>{" "}
        before lodging.
      </p>
      <p>
        Not affiliated with or endorsed by {brand.manufacturer}. All
        capacities are nameplate figures in kWh.
      </p>
    </div>
  );
}
