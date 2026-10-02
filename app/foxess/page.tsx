import type { Metadata } from "next";
import Image from "next/image";
import FoxessFinder from "./finder";
import { BrandHero } from "../brand-hero";

const TITLE = "FoxESS Battery Model Finder";
const DESCRIPTION =
  "Find the exact CEC-approved FoxESS model number, whether it's a CQ6/CQ7/EQ4800/EQ5500/1K5-BAT-4660/ECS2900/ECS4800 module stack or an EP5/EP11/EP12 Plus single unit.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    url: "/foxess",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function FoxessPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <BrandHero title="FoxESS Battery Model Finder" />

      <section>
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Identify the model
        </h2>
        <div className="mt-5">
          <FoxessFinder />
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

      <section id="understanding" className="mt-14 scroll-mt-20">
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Understanding the model names
        </h2>

        <div className="mt-5 rounded-2xl border border-rule bg-card p-5 sm:p-6">
          <h3 className="border-b border-rule-strong/60 pb-3 text-base font-semibold">Stackable series</h3>

          <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_240px]">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.11em] text-ink-faint">Example</p>
              <div className="mt-1 flex items-center gap-0.5 font-display text-2xl font-extrabold tnum">
                <span className="text-blue">CQ6</span>
                <span className="text-ink-faint">-</span>
                <span className="text-green-deep">L5</span>
              </div>

              <ul className="mt-5 space-y-4">
                <li className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                  <span className="text-sm font-semibold tnum text-blue">CQ6</span>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    The <b className="text-ink">first part</b> indicates the series name, printed on every
                    module in the stack as <span className="tnum">CQ6-M</span> or{" "}
                    <span className="tnum">CQ6-S</span>.
                    <span className="mt-1.5 block text-xs text-ink-faint">
                      The <span className="tnum">ECS2900</span> and <span className="tnum">ECS4800</span>{" "}
                      stacks label their modules <span className="tnum">CM2900/CS2900</span> and{" "}
                      <span className="tnum">CM4800/CS4800</span>.
                    </span>
                  </p>
                </li>
                <li className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                  <span className="text-sm font-semibold tnum text-green-deep">L5</span>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    The <b className="text-ink">second part</b> tells you how many modules are in the stack.
                    L5 means five modules — one <span className="tnum">-M</span> on top and four{" "}
                    <span className="tnum">-S</span> below it.
                    <span className="mt-1.5 block text-xs text-ink-faint">
                      The ECS stacks use <span className="tnum">H</span> instead of{" "}
                      <span className="tnum">L</span> — <span className="tnum">ECS2900-H5</span> — and count
                      the same way.
                    </span>
                  </p>
                </li>
              </ul>

              <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                <li className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  <span>
                    <b className="font-medium text-ink">Battery stacks are visually identical between
                    models</b> — the label is the only tell.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  <span>
                    Always one master (<span className="tnum">-M</span>) unit plus one or more slave (
                    <span className="tnum">-S</span>) battery modules. There is no L1.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  <span>
                    Seven stacking models:{" "}
                    <span className="tnum">1K5-BAT-4660 · CQ6 · CQ7 · ECS2900 · ECS4800 · EQ4800 · EQ5500</span>
                  </span>
                </li>
              </ul>
            </div>

            <figure className="m-0">
              <div className="overflow-hidden rounded-lg border border-rule">
                <Image
                  src="/foxess/stack.jpg"
                  alt="A floor-standing FoxESS battery stack, showing the taller top module and the slimmer modules beneath it."
                  width={420}
                  height={646}
                  className="h-auto w-full bg-wash"
                />
              </div>
            </figure>
          </div>

          <p className="mt-5 max-w-prose border-l-2 border-rule pl-3.5 text-xs text-ink-faint">
            Capacity is the whole stack, not one module. Each model has its own module size, so the same L
            number gives a different capacity in each — <span className="tnum">CQ6-L5</span> is 29.95 kWh and{" "}
            <span className="tnum">CQ7-L5</span> is 34.80 kWh.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-rule bg-card p-5 sm:p-6">
          <h3 className="border-b border-rule-strong/60 pb-3 text-base font-semibold">EP series</h3>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            <div className="rounded-lg border border-rule bg-wash px-4 py-3">
              <p className="font-display text-base font-semibold tnum text-blue">EP5</p>
              <p className="mt-0.5 text-xs tnum text-ink-faint">4.67 kWh usable</p>
            </div>
            <div className="rounded-lg border border-rule bg-wash px-4 py-3">
              <p className="font-display text-base font-semibold tnum text-blue">EP11</p>
              <p className="mt-0.5 text-xs tnum text-ink-faint">10.36 kWh usable</p>
            </div>
            <div className="rounded-lg border border-rule bg-wash px-4 py-3">
              <p className="font-display text-base font-semibold tnum text-blue">EP12 Plus</p>
              <p className="mt-0.5 text-xs tnum text-ink-faint">11.52 kWh usable</p>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
            <li className="flex gap-2.5">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
              <span>
                <b className="font-medium text-ink">Each unit is independently listed</b>, with multiple units
                able to be installed together.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
              <span>Capacity comes from the model name, not a module count.</span>
            </li>
          </ul>
        </div>

        <div className="mt-5 flex gap-3.5 rounded-2xl border border-rule bg-amber/5 p-5">
          <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-amber/15 text-sm">
            ⚠️
          </span>
          <div>
            <h3 className="text-sm font-medium">Capacity alone cannot identify the model</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              <span className="tnum">1K5-BAT-4660</span> and <span className="tnum">EQ4800</span> are
              identical on paper. Same 4.66 kWh module, same nominal capacity and same usable capacity at
              every stack size — <span className="tnum">1K5-BAT-4660-L4</span> and{" "}
              <span className="tnum">EQ4800-L4</span> are both 18.64 kWh usable. No figure on the CEC list
              separates them — <span className="tnum">1K5-BAT-4660</span> is 1KOMMA5°&apos;s rebrand of the{" "}
              <span className="tnum">EQ4800</span>, which is why every number matches.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              <span className="tnum">ECS4800</span> uses the same size module and matches on nominal
              capacity, but its listing applies 90% depth of discharge — so{" "}
              <span className="tnum">ECS4800-H4</span> is 18.64 kWh nominal but{" "}
              <b className="font-medium text-ink">16.78 kWh usable</b>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
