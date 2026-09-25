import type { Metadata } from "next";
import Image from "next/image";
import TeslaFinder from "./finder";
import { BrandHero } from "../brand-hero";
import { ROWS } from "@/lib/tesla";

const TITLE = "Tesla Battery Model Finder";
const DESCRIPTION =
  "Find the exact CEC-approved Tesla Powerwall 3 model number for any combination of commissioned inverter output and Expansion units.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    url: "/tesla",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TeslaPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <BrandHero
        title="Tesla Battery Model Finder"
        description="Each Powerwall has 13.5 kWh of storage. Additional units can be added to increase the total battery capacity."
        stats={[
          { value: String(ROWS.length), label: "Tesla models on list" },
          { value: "3", label: "Inverter configurations" },
          { value: "0–3", label: "Expansion units" },
          { value: "13.5–54 kWh", label: "Usable capacity" },
        ]}
      />

      <section>
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Identify the model
        </h2>
        <div className="mt-5">
          <TeslaFinder />
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

      <section id="vs" className="mt-14 scroll-mt-20">
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Powerwall 3 vs Powerwall 3 AC
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-rule bg-card">
            <div className="border-b border-rule px-5 py-4">
              <h3 className="text-base font-medium">Powerwall 3</h3>
              <span className="mt-1.5 inline-block rounded-md bg-blue/10 px-2 py-1 text-[13px] font-medium tnum text-blue">
                1707000-xx-y
              </span>
            </div>
            <ul className="list-disc space-y-2 px-5 py-4 pl-8 text-sm leading-relaxed text-ink-soft marker:text-ink-faint">
              <li>
                Battery with an <b className="font-medium text-ink">inbuilt inverter</b> that can be configured to
                5, 10 or 11.04 kVA.
              </li>
              <li>
                Part number starts with <span className="tnum">1707000</span>.
              </li>
              <li>
                Nameplate includes{" "}
                <span className="tnum">PHOTOVOLTAIC (PV) POWER CONVERSION EQUIPMENT</span>.
              </li>
              <li>
                Common in PV + battery installations because the solar panels can connect directly to the
                Powerwall 3.
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-rule bg-card">
            <div className="border-b border-rule px-5 py-4">
              <h3 className="text-base font-medium">Powerwall 3 AC</h3>
              <span className="mt-1.5 inline-block rounded-md bg-green/10 px-2 py-1 text-[13px] font-medium tnum text-green-deep">
                1707000-<b className="font-bold underline underline-offset-2">70</b>-y
              </span>
            </div>
            <ul className="list-disc space-y-2 px-5 py-4 pl-8 text-sm leading-relaxed text-ink-soft marker:text-ink-faint">
              <li>
                Battery with a <b className="font-medium text-ink">fixed 5 kW inverter</b>.
              </li>
              <li>
                Part number{" "}
                <span className="tnum">
                  1707000-<b className="font-bold underline underline-offset-2">70</b>-y
                </span>
                .
              </li>
              <li>
                CEC models contain <span className="tnum">ACPW3</span> — e.g.{" "}
                <span className="tnum">1707000-ACPW3-13.5</span>.
              </li>
              <li>
                Typically used in battery-only installations. If solar is installed, the panels connect to a
                separate inverter.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="reading" className="mt-14 scroll-mt-20">
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Reading a model number
        </h2>

        <div className="mt-5 rounded-2xl border border-rule bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-0.5 font-display text-xl font-extrabold tnum sm:text-2xl">
            <span className="text-blue">1707000</span>
            <span className="text-ink-faint">-</span>
            <span className="text-green-deep">10 kVA</span>
            <span className="text-ink-faint">-</span>
            <span className="text-ink">40.5</span>
          </div>

          <ul className="mt-5 space-y-4">
            <li className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <span className="text-sm font-medium tnum text-blue">1707000</span>
              <p className="text-sm leading-relaxed text-ink-soft">
                The main unit of a Tesla Powerwall 3. This is the part number
                you will find on the battery nameplate.
                <span className="mt-1.5 block text-xs text-ink-faint">
                  Note: see{" "}
                  <a href="#nameplates" className="text-blue underline underline-offset-2">
                    Reading nameplates
                  </a>{" "}
                  below.
                </span>
              </p>
            </li>
            <li className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <span className="text-sm font-medium tnum text-green-deep">10 kVA</span>
              <p className="text-sm leading-relaxed text-ink-soft">
                Inverter capacity. Powerwall 3 may be configured to{" "}
                <span className="text-ink">5</span>,{" "}
                <span className="text-ink">10</span> or{" "}
                <span className="text-ink">11.04 kVA</span>.
                <span className="mt-1.5 block text-xs text-ink-faint">
                  Note: Powerwall 3 AC uses{" "}
                  <span className="tnum">ACPW3</span> instead, as its
                  inverter output is not configurable. It is a fixed 5 kW AC
                  battery system, designed to be AC-coupled to an existing
                  solar/inverter system rather than acting as the inverter
                  for the PV system.
                </span>
              </p>
            </li>
            <li className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <span className="text-sm font-medium tnum text-ink">40.5</span>
              <p className="text-sm leading-relaxed text-ink-soft">
                Total usable battery capacity.{" "}
                <span className="text-ink">13.5 kWh</span> = Powerwall 3
                only; <span className="text-ink">27</span> = +1 Expansion;{" "}
                <span className="text-ink">40.5</span> = +2 Expansions;{" "}
                <span className="text-ink">54</span> = +3 Expansions.
              </p>
            </li>
          </ul>

          <p className="mt-4 max-w-prose border-l-2 border-rule pl-3.5 text-xs text-ink-faint">
            Note: the capacity in the CEC model represents the complete
            Powerwall 3 configuration, not the capacity of an individual
            Expansion.
          </p>
        </div>

        <div className="mt-4 flex gap-3.5 rounded-2xl border border-rule bg-blue/5 p-5">
          <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-blue/15 text-sm">
            💡
          </span>
          <div>
            <h3 className="text-sm font-medium">Identifying the inverter size</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              The same <span className="tnum text-ink">1707000-xx-y</span>{" "}
              Powerwall 3 hardware can be configured as 5, 10 or 11.04 kVA,
              so the physical nameplate cannot confirm the inverter size.
              This is set during commissioning.
            </p>
          </div>
        </div>
      </section>

      <section id="nameplates" className="mt-14 scroll-mt-20">
        <h2 className="font-display font-extrabold text-3xl tracking-[-0.02em]">
          Reading nameplates
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Both units are 13.5 kWh and have similar-looking labels. To
          identify whether the unit is a Powerwall 3 or Expansion, check the
          part number on the label.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-rule bg-card">
            <div className="flex flex-wrap items-center gap-2.5 border-b border-rule px-4 py-3.5">
              <h3 className="text-[14.5px] font-medium">Main Powerwall 3</h3>
              <span className="text-[13px] tnum text-blue">1707000-xx-y</span>
            </div>
            <Image
              src="/tesla/powerwall-3-label.jpg"
              alt="Tesla Powerwall 3 nameplate label"
              width={620}
              height={819}
              className="h-auto w-full bg-wash"
            />
            <figcaption className="border-t border-rule px-4 py-3.5 text-[13px] text-ink-soft">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                In this photo
              </span>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>
                  <span className="tnum text-ink">TESLA PART NO. 1707000-30-L</span>{" "}
                  — main unit
                </li>
                <li>
                  Header reads{" "}
                  <span className="tnum text-ink">
                    PHOTOVOLTAIC (PV) POWER CONVERSION EQUIPMENT
                  </span>{" "}
                  — the PV inverter is in this unit
                </li>
              </ul>
              <p className="mt-2.5">
                Contains the battery and inverter and provides 13.5 kWh
                usable capacity.
              </p>
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-2xl border border-rule bg-card">
            <div className="flex flex-wrap items-center gap-2.5 border-b border-rule px-4 py-3.5">
              <h3 className="text-[14.5px] font-medium">Powerwall 3 Expansion</h3>
              <span className="text-[13px] tnum text-blue">1807000-xx-y</span>
            </div>
            <Image
              src="/tesla/expansion-label.jpg"
              alt="Tesla Powerwall 3 Expansion nameplate label"
              width={620}
              height={835}
              className="h-auto w-full bg-wash"
            />
            <figcaption className="border-t border-rule px-4 py-3.5 text-[13px] text-ink-soft">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                In this photo
              </span>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>
                  <span className="tnum text-ink">TESLA PART NO. 1807000-20-B</span>{" "}
                  — Expansion
                </li>
              </ul>
              <p className="mt-2.5">
                Adds 13.5 kWh usable capacity and does not contain an
                inverter.
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-5 flex gap-3 rounded-2xl border border-rule bg-card px-5 py-4">
          <span aria-hidden className="shrink-0 text-sm">
            ⚠️
          </span>
          <div>
            <h3 className="text-sm font-medium">
              An Expansion on its own cannot be the model listed in the
              paperwork
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-faint">
              <span className="tnum">1807000</span> does not appear as a
              standalone model on the CEC Approved Battery List. The
              Expansion is instead reflected in the total capacity of the
              approved Powerwall 3 configuration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
