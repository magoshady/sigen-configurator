"use client";

import { useMemo, useState } from "react";
import {
  AC_SERIES,
  DC_SERIES_OLD,
  STANDARD_SUFFIX,
  computeBuild,
  computeVerdict,
  expansionsForUsable,
  kvaFromModel,
  type BuildInput,
  type Verdict,
} from "@/lib/tesla";

const EXAMPLE_MODELS = [
  "1707000-5 kVA-13.5",
  "1707000-10 kVA",
  "1707000-10 kVA-27",
  "1707000-10 kVA-40.5",
  "1707000-11.04 kVA-54",
  "1707000-ACPW3-13.5",
];

type Tab = "build" | "check";

export default function TeslaFinder() {
  const [tab, setTab] = useState<Tab>("build");
  const [build, setBuild] = useState<BuildInput>({ ptype: "dc", kva: "10", exp: 1 });
  const [query, setQuery] = useState("");

  const result = useMemo(() => computeBuild(build), [build]);
  const verdict = useMemo(() => computeVerdict(query), [query]);

  return (
    <section className="rounded-2xl border border-rule bg-card overflow-hidden">
      <div className="grid grid-cols-2 border-b border-rule" role="tablist">
        {(
          [
            ["build", "From the photos"],
            ["check", "Check a model number"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            role="tab"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
            className={`relative px-4 py-3.5 text-sm transition-colors cursor-pointer ${
              tab === value
                ? "text-ink bg-card font-medium after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-green"
                : "text-ink-faint bg-wash hover:text-ink-soft"
            } ${value === "check" ? "border-l border-rule" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "build" ? (
        <BuildPane build={build} setBuild={setBuild} result={result} />
      ) : (
        <CheckPane query={query} setQuery={setQuery} verdict={verdict} />
      )}
    </section>
  );
}

function BuildPane({
  build,
  setBuild,
  result,
}: {
  build: BuildInput;
  setBuild: (update: (prev: BuildInput) => BuildInput) => void;
  result: ReturnType<typeof computeBuild>;
}) {
  const isAc = build.ptype === "ac";

  return (
    <div className="grid sm:grid-cols-2">
      <div className="p-5 sm:p-6 grid gap-6 sm:border-r sm:border-rule">
        <Field
          n={1}
          title="Which Powerwall is installed?"
          help="Powerwall 3 has the PV inverter built in and shows PHOTOVOLTAIC (PV) POWER CONVERSION EQUIPMENT on the nameplate. Powerwall 3 AC couples to an existing solar system."
        >
          <SegGroup
            name="ptype"
            value={build.ptype}
            onChange={(v) =>
              setBuild((prev) => ({ ...prev, ptype: v as BuildInput["ptype"] }))
            }
            options={[
              { value: "dc", label: "Powerwall 3", sub: "DC-coupled, PV inverter built in" },
              { value: "ac", label: "Powerwall 3 AC", sub: "AC-coupled, fixed 5 kW" },
            ]}
          />
        </Field>

        <Field
          n={2}
          title="Commissioned inverter output"
          help={
            isAc
              ? "Powerwall 3 AC is a fixed 5 kW system — the output is not configurable and the CEC model reads ACPW3 in this position."
              : "Not readable from the part number. Confirm the commissioned inverter output from the compliance paperwork."
          }
          dimmed={isAc}
        >
          <SegGroup
            name="kva"
            value={build.kva}
            disabled={isAc}
            onChange={(v) =>
              setBuild((prev) => ({ ...prev, kva: v as BuildInput["kva"] }))
            }
            options={[
              { value: "5", label: "5 kVA" },
              { value: "10", label: "10 kVA" },
              { value: "11.04", label: "11.04 kVA" },
            ]}
          />
        </Field>

        <Field
          n={3}
          title="Expansion units in the photos"
          help="Count the unit with a part number starting 1807000. Each adds 13.5 kWh of usable capacity."
        >
          <SegGroup
            name="exp"
            value={String(build.exp)}
            onChange={(v) =>
              setBuild((prev) => ({ ...prev, exp: Number(v) as BuildInput["exp"] }))
            }
            options={[
              { value: "0", label: "None", sub: "13.5 kWh" },
              { value: "1", label: "1", sub: "27 kWh" },
              { value: "2", label: "2", sub: "40.5 kWh" },
              { value: "3", label: "3", sub: "54 kWh" },
            ]}
          />
        </Field>
      </div>

      <div className="p-5 sm:p-6 bg-wash/60 grid gap-4 content-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            CEC approved model
          </p>
          <p className="mt-1.5 font-display font-extrabold text-xl sm:text-2xl tnum break-words">
            {result.model}
            <span className="block mt-0.5 text-xs font-normal text-ink-faint">
              {STANDARD_SUFFIX}
            </span>
          </p>
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm border-t border-rule pt-4">
          <dt className="text-ink-faint">Usable capacity</dt>
          <dd className="tnum">{result.usableKwh.toFixed(1)} kWh</dd>
          <dt className="text-ink-faint">Nominal capacity</dt>
          <dd className="tnum">{result.nominalKwh.toFixed(1)} kWh</dd>
          <dt className="text-ink-faint">Approved</dt>
          <dd className="tnum">{result.approved}</dd>
          <dt className="text-ink-faint">Expires</dt>
          <dd className="tnum">{result.expires}</dd>
        </dl>

        <div className="border-t border-rule pt-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            Photos must show
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            <ExpectItem>
              {result.isAc ? (
                <>
                  <b>1×</b> Powerwall 3 AC main unit — part number{" "}
                  <span className="tnum">1707000-70-y</span>
                </>
              ) : (
                <>
                  <b>1×</b> Powerwall 3 main unit — part number{" "}
                  <span className="tnum">1707000-xx-y</span>, with PV power
                  conversion equipment on the nameplate
                </>
              )}
            </ExpectItem>
            <ExpectItem>
              {build.exp === 0 ? (
                <>
                  <b>No</b> <span className="tnum">1807000-xx-y</span> Expansion
                  units
                </>
              ) : (
                <>
                  <b>{build.exp}×</b> Expansion — part number{" "}
                  <span className="tnum">1807000-xx-y</span>
                </>
              )}
            </ExpectItem>
            {!result.isAc && (
              <ExpectItem>
                Compliance paperwork confirming the <b>{build.kva} kVA</b>{" "}
                commissioned output
              </ExpectItem>
            )}
          </ul>
        </div>

        {result.altNote && (
          <p className="border-t border-rule pt-4 text-xs text-ink-faint leading-relaxed">
            <b className="text-ink-soft">Note:</b> An earlier CEC listing for
            the same single Powerwall 3 configuration is{" "}
            <span className="tnum">
              1707000-{build.kva} kVA {STANDARD_SUFFIX}
            </span>
            . The later listing adds the <span className="tnum">-13.5</span>{" "}
            capacity suffix as part of the Powerwall 3 and Expansions series.
            Both represent one 13.5 kWh Powerwall 3 with no Expansion units.
          </p>
        )}
      </div>
    </div>
  );
}

function CheckPane({
  query,
  setQuery,
  verdict,
}: {
  query: string;
  setQuery: (v: string) => void;
  verdict: Verdict;
}) {
  return (
    <div className="p-5 sm:p-6 grid gap-4">
      <div>
        <label htmlFor="q-model" className="text-sm font-medium">
          Model number as written in the paperwork
        </label>
        <input
          id="q-model"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="1707000-10 kVA-40.5"
          autoComplete="off"
          spellCheck={false}
          className="mt-2.5 w-full rounded-lg border border-rule-strong bg-card px-3.5 py-2.5 font-mono text-sm tnum outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Try
        </span>
        {EXAMPLE_MODELS.map((model) => (
          <button
            key={model}
            type="button"
            onClick={() => setQuery(model)}
            className="rounded-full border border-dashed border-rule-strong bg-wash px-2.5 py-1 font-mono text-[11px] tnum text-ink-faint transition-colors hover:border-solid hover:border-ink-soft hover:text-ink cursor-pointer"
          >
            {model}
          </button>
        ))}
      </div>

      <VerdictCard verdict={verdict} />
    </div>
  );
}

function VerdictCard({ verdict }: { verdict: Verdict }) {
  if (verdict.kind === "empty") {
    return (
      <Card tone="neutral" pill="Awaiting input" heading="Paste or type the model recorded on the paperwork">
        <p>
          Spacing, the <span className="tnum">kVA</span> unit and the AS4777
          suffix are all ignored — the check matches the model itself against
          the Tesla rows of the CEC approved battery list.
        </p>
      </Card>
    );
  }

  if (verdict.kind === "expansion") {
    return (
      <Card tone="stop" pill="Not a CEC model" heading="That is an Expansion part number">
        <p>
          <span className="tnum">{verdict.raw}</span> is a Powerwall 3
          Expansion. Expansions are not listed as standalone models — the
          paperwork must name the complete Powerwall 3 configuration, with
          the Expansion reflected in the total capacity.
        </p>
        <ul className="mt-2.5 list-disc space-y-1 pl-4">
          <li>
            1 main unit + 1 Expansion → <span className="tnum">1707000-xx kVA-27</span>
          </li>
          <li>
            1 main unit + 2 Expansions →{" "}
            <span className="tnum">1707000-xx kVA-40.5</span>
          </li>
          <li>
            1 main unit + 3 Expansions → <span className="tnum">1707000-xx kVA-54</span>
          </li>
        </ul>
      </Card>
    );
  }

  if (verdict.kind === "expired") {
    const { row } = verdict;
    return (
      <Card tone="warn" pill="Listed, but expired" heading={`${row.m} ${STANDARD_SUFFIX}`}>
        <p>
          This is the earlier AC-coupled Powerwall, not a Powerwall 3. Its
          CEC approval ran {row.ap} to {row.ex} — check the installation date
          falls inside that window.
        </p>
        <p className="mt-2">
          {row.use.toFixed(1)} kWh usable · {row.nom.toFixed(1)} kWh nominal
        </p>
      </Card>
    );
  }

  if (verdict.kind === "match") {
    const { row } = verdict;
    const isOld = row.s === DC_SERIES_OLD;
    const isAc = row.s === AC_SERIES;
    const exp = expansionsForUsable(row.use);
    const kva = kvaFromModel(row.m);

    return (
      <Card tone="ok" pill="On the CEC list" heading={`${row.m} ${STANDARD_SUFFIX}`}>
        <p>
          <b>{row.use.toFixed(1)} kWh usable</b> · {row.nom.toFixed(1)} kWh
          nominal · approved {row.ap} · expires {row.ex}
        </p>
        <p className="mt-2.5">
          <b>The photos must show:</b>
        </p>
        <ul className="mt-1.5 list-disc space-y-1 pl-4">
          <li>
            1 ×{" "}
            {isAc ? (
              <>
                Powerwall 3 AC main unit — <span className="tnum">1707000-70-y</span>
              </>
            ) : (
              <>
                Powerwall 3 main unit — <span className="tnum">1707000-xx-y</span>
              </>
            )}
          </li>
          <li>
            {exp === 0 ? (
              "no Expansion units"
            ) : (
              <>
                {exp} × Expansion — <span className="tnum">1807000-xx-y</span>
              </>
            )}
          </li>
          {!isAc && (
            <li>compliance paperwork confirming the {kva ?? "?"} kVA commissioned output</li>
          )}
        </ul>
        {isOld && (
          <p className="mt-2.5 text-xs text-ink-faint">
            This is the earlier listing form without a capacity suffix. It
            covers a single Powerwall 3 only — if an Expansion appears in the
            photos, the paperwork is wrong.
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card tone="stop" pill="No exact match" heading="Not found on the Tesla rows of the CEC list">
      <p>
        <span className="tnum">{verdict.raw}</span> does not match an
        approved Tesla model. The Clean Energy Regulator requires the exact
        listed string.
      </p>
      {verdict.near.length > 0 ? (
        <>
          <p className="mt-2.5">
            <b>Closest listed models:</b>
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            {verdict.near.map((r) => (
              <li key={r.m}>
                <span className="tnum">
                  {r.m} {STANDARD_SUFFIX}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-2.5">
          Use the <b>From the photos</b> tab to build the correct string
          from what the installation photos show.
        </p>
      )}
    </Card>
  );
}

function Card({
  tone,
  pill,
  heading,
  children,
}: {
  tone: "neutral" | "ok" | "warn" | "stop";
  pill: string;
  heading: string;
  children: React.ReactNode;
}) {
  const cardTone = {
    neutral: "border-rule bg-wash",
    ok: "border-green/30 bg-green/5",
    warn: "border-amber/30 bg-amber/5",
    stop: "border-red/30 bg-red/5",
  }[tone];
  const pillTone = {
    neutral: "bg-wash text-ink-soft ring-1 ring-inset ring-rule",
    ok: "bg-green/15 text-green-deep",
    warn: "bg-amber/15 text-amber-deep",
    stop: "bg-red/15 text-red-deep",
  }[tone];

  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${cardTone}`}>
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${pillTone}`}
      >
        {pill}
      </span>
      <h3 className="mt-2.5 text-sm font-medium">{heading}</h3>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft [&_b]:font-medium [&_b]:text-ink">
        {children}
      </div>
    </div>
  );
}

function Field({
  n,
  title,
  help,
  dimmed,
  children,
}: {
  n: number;
  title: string;
  help: string;
  dimmed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={dimmed ? "opacity-55" : undefined}>
      <div className="flex items-baseline gap-2">
        <span className="grid h-[19px] w-[19px] shrink-0 place-items-center rounded-md border border-rule bg-wash text-[11px] font-medium text-ink-faint">
          {n}
        </span>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="mt-1.5 max-w-sm text-xs text-ink-faint">{help}</p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function SegGroup({
  name,
  value,
  onChange,
  options,
  disabled,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; sub?: string }[];
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={`flex flex-col gap-0.5 rounded-lg border px-3.5 py-2 text-left text-[13.5px] font-medium leading-tight transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
              active
                ? "border-blue bg-blue/10 text-blue ring-1 ring-inset ring-blue/40"
                : "border-rule bg-wash text-ink-soft hover:border-rule-strong"
            }`}
          >
            {option.label}
            {option.sub && (
              <span
                className={`text-[11px] font-normal ${
                  active ? "text-blue/80" : "text-ink-faint"
                }`}
              >
                {option.sub}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ExpectItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden
        className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md bg-green/15 text-[10px] font-bold text-green-deep"
      >
        ✓
      </span>
      <span className="text-ink-soft">{children}</span>
    </li>
  );
}
