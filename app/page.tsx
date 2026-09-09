import Finder from "./finder";
import { MODELS } from "@/lib/models";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <section className="pt-14 pb-10 sm:pt-20">
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] tracking-tight">
          SigenStor Battery
          <br />
          Configuration Finder
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Enter the battery modules installed on site and get the exact
          CEC-approved Sigenergy SigenStor model number to use on your STC claim.
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          <Stat value={MODELS.length.toLocaleString()} label="Approved models" />
          <Stat value="4" label="Module sizes" />
          <Stat value="12" label="Inverters" />
          <Stat value="1–6" label="Modules per stack" />
        </dl>
      </section>

      <Finder />

      <section className="mt-14 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Reading a model number</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            <span className="text-ink tnum">SigenStor-10T-EV12-24.1</span> breaks
            down into three parts:
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <Term term="10T">
              Inverter capacity and phase — 10 kW three-phase. Codes ending in{" "}
              <span className="text-ink">S</span> are single-phase,{" "}
              <span className="text-ink">T</span> three-phase.
            </Term>
            <Term term="EV12">
              The EV charger module, if one is fitted. Omitted when there is none.
            </Term>
            <Term term="24.1">
              Total nominal capacity in kWh — here, one 6 kWh and two 10 kWh
              modules.
            </Term>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl">Before you lodge</h2>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink-soft">
            <li>
              Count each module size separately — the finder matches exact
              quantities, not totals.
            </li>
            <li>
              An EV charger module changes the model number, so record it even
              though it adds no capacity.
            </li>
            <li>
              A stack holds up to six modules. EV variants top out at five.
            </li>
          </ul>
          <a
            href="https://cleanenergycouncil.org.au/industry-programs/products-program/batteries"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block rounded-lg bg-blue px-4 py-2.5 text-sm text-white hover:bg-blue/90 transition-colors"
          >
            CEC approved battery list →
          </a>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </dt>
      <dd className="font-display text-2xl tnum">{value}</dd>
    </div>
  );
}

function Term({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 rounded-md bg-wash px-2 py-0.5 text-[11px] text-ink tnum h-fit mt-0.5">
        {term}
      </span>
      <span>{children}</span>
    </li>
  );
}
