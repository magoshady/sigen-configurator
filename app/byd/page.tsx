import type { Metadata } from "next";
import BydFinder from "./finder";
import SeriesAccordion from "./series-accordion";
import { BrandHero } from "../brand-hero";

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
      <BrandHero title="BYD Battery-Box Model Finder" />

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

      <section id="series" className="mt-14 scroll-mt-20">
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Telling the series apart
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          <b className="font-medium text-ink">HVE</b>, <b className="font-medium text-ink">LVL</b> and{" "}
          <b className="font-medium text-ink">LV Flex</b> look quite different from the other models and
          are usually easy to recognise.
          <br />
          <b className="font-medium text-ink">HVS</b>, <b className="font-medium text-ink">HVM</b>,{" "}
          <b className="font-medium text-ink">HVM+</b>, <b className="font-medium text-ink">HVB</b> and{" "}
          <b className="font-medium text-ink">LVS</b> have some differences in size, but look very similar.
          <br />
          Check the nameplate to confirm the model.
        </p>

        <SeriesAccordion />
      </section>
    </div>
  );
}
