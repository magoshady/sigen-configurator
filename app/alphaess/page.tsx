import type { Metadata } from "next";
import AlphaessFinder from "./finder";
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
    </div>
  );
}
