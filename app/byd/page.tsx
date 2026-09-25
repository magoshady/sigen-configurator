import type { Metadata } from "next";
import BydFinder from "./finder";
import { BrandHero } from "../brand-hero";
import { FAMILIES, ALL_ROWS } from "@/lib/byd";

const TITLE = "BYD Battery-Box Model Finder";
const DESCRIPTION =
  "Find the exact CEC-approved BYD Battery-Box model number across HVS, HVM, HVM+, HVB, HVE, LVS, LVL and LV Flex.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    url: "/byd",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function BydPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <BrandHero
        title="BYD Battery-Box Model Finder"
        description="BYD sells eight visually similar Battery-Box families. Identify which one is installed from the nameplate, then use the finder to get the exact CEC-approved model number."
        stats={[
          { value: String(ALL_ROWS.length), label: "BYD models on list" },
          { value: String(FAMILIES.length), label: "Battery-Box families" },
          { value: "2", label: "Manufacturer entities" },
          { value: "4–29.7 kWh", label: "Usable capacity range" },
        ]}
      />

      <section>
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Identify the model
        </h2>
        <div className="mt-5">
          <BydFinder />
        </div>
        <a
          href="https://cleanenergycouncil.org.au/industry-programs/products-program/batteries"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-lg bg-blue px-4 py-2.5 text-sm text-white transition-colors hover:bg-blue/90"
        >
          CEC approved battery list →
        </a>
      </section>

      <section id="families" className="mt-14 scroll-mt-20">
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Telling the families apart
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          HVS, HVM, HVM+, HVB and LVS all stack into the same tall, plain
          tower — do not identify the model from the enclosure alone. HVE,
          LVL and LV Flex look different enough to spot on sight. Whichever
          it is, check the module or system nameplate before counting.
        </p>

        <div className="mt-6 grid gap-3">
          {FAMILIES.map((family) => (
            <div
              key={family.slug}
              className="rounded-xl border border-rule bg-card px-4 py-3.5 sm:px-5 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <div className="flex items-baseline gap-2.5">
                <h3 className="font-display font-extrabold text-lg tnum">{family.label}</h3>
                <span className="text-[11px] text-ink-faint">{family.manufacturer}</span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed sm:max-w-md sm:text-right">
                {family.blurb}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3.5 rounded-2xl border border-rule bg-blue/5 p-5">
          <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-blue/15 text-sm">
            💡
          </span>
          <div>
            <h3 className="text-sm font-medium">Reading the nameplate</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Every module carries its own label with a{" "}
              <span className="text-ink">Model:</span> field (e.g.{" "}
              <span className="tnum text-ink">HVS</span>,{" "}
              <span className="tnum text-ink">HVM</span>) and a{" "}
              <span className="text-ink">Usable energy</span> figure in kWh.
              Some installs also carry a system-level label listing every
              approved configuration for that family, with the installed
              one marked — if present, that&apos;s the fastest way to confirm
              the exact model without counting modules yourself.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-3 rounded-2xl border border-rule bg-card px-5 py-4">
          <span aria-hidden className="shrink-0 text-sm">
            ⚠️
          </span>
          <div>
            <h3 className="text-sm font-medium">HVM and HVM+ are separate CEC listings</h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-faint">
              They share the same capacities and the same tower, but come
              from different manufacturer entities (Shenzhen BYD Electronics
              Co Ltd vs Shanwei BYD Auto Co Ltd) and the model number itself
              differs by the &ldquo;+&rdquo;. Match the exact string on the
              nameplate, not just the capacity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
