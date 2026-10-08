import type { Metadata } from "next";
import AlphaessFinder from "./finder";
import SystemsAccordion from "./systems-accordion";
import { BrandHero } from "../brand-hero";

const TITLE = "Alpha ESS Battery Model Finder";
const DESCRIPTION =
  "Find the exact CEC-approved Alpha ESS model number across SMILE5, SMILE-G3, SMILE-M5/M10, SMILE-T10-HV, SMILE-S5/B5 and StaX.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    url: "/alphaess",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AlphaessPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <BrandHero title="Alpha ESS Battery Model Finder" />

      <section>
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Identify the model
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Most Alpha ESS batteries are named after the inverter they pair with. Identify the inverter
          model, and the battery combinations will be narrowed down to a few options.
        </p>
        <div className="mt-5">
          <AlphaessFinder />
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

      <section id="systems" className="mt-14 scroll-mt-20">
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Telling the systems apart
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Six system families cover every Alpha ESS battery on the CEC list. Within a family the
          batteries are plain white boxes that look much alike, so the inverter is what separates them.
        </p>

        <SystemsAccordion />

        <div className="mt-5 flex gap-3.5 rounded-2xl border border-rule bg-amber/5 p-5">
          <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-amber/15 text-sm">
            ⚠️
          </span>
          <div>
            <h3 className="text-sm font-medium">Capacity alone cannot identify an Alpha ESS battery</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              <b className="font-medium text-ink">SMILE-S5</b>, <b className="font-medium text-ink">SMILE-B5</b> and{" "}
              <b className="font-medium text-ink">SMILE-B3-PLUS</b> share an identical capacity ladder — 5.04,
              10.08, 15.12, 20.16, 25.20 and 30.24 kWh. Three different model names, the same six numbers.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              <b className="font-medium text-ink">SMILE-BAT-14P</b> and{" "}
              <b className="font-medium text-ink">SMILE-M-BAT-13.9P</b> differ by as little as 0.01 kWh at
              each step — 27.98 against 27.99, 41.97 against 41.99, 55.96 against 55.99. These are understood
              to be the same 13.99 kWh hardware listed twice, once for each inverter family. The inverter
              tells them apart; the capacity does not.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              <b className="font-medium text-ink">SMILE-BAT-10.1P</b> and{" "}
              <b className="font-medium text-ink">SMILE-G3-BAT-10.1P</b> are different models with nearly the
              same name, and different usable capacities — 9.07 against 9.60 kWh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
