"use client";

import { useMemo, useState } from "react";
import {
  FAMILIES,
  matchByCapacity,
  round2,
  computeVerdict,
  type BydFamily,
  type BydRow,
  type Verdict,
} from "@/lib/byd";

type Tab = "build" | "check";

const EXAMPLE_MODELS = ["HVS 7.7", "HVM 13.8", "HVM+ 13.8", "HVB 17.8", "HVE 10.7", "LVS 12.0", "LV Flex"];

export default function BydFinder() {
  const [tab, setTab] = useState<Tab>("build");
  const [familySlug, setFamilySlug] = useState(FAMILIES[0].slug);
  const [modules, setModules] = useState(FAMILIES[0].minModules ?? 1);
  const [modulesA, setModulesA] = useState(1);
  const [modulesB, setModulesB] = useState(0);
  const [perUnitCount, setPerUnitCount] = useState(1);
  const [query, setQuery] = useState("");

  const family = FAMILIES.find((f) => f.slug === familySlug) ?? FAMILIES[0];

  function selectFamily(next: BydFamily) {
    setFamilySlug(next.slug);
    setModules(next.minModules ?? 1);
    setModulesA(1);
    setModulesB(0);
    setPerUnitCount(1);
  }

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
        <BuildPane
          family={family}
          onSelectFamily={selectFamily}
          modules={modules}
          setModules={setModules}
          modulesA={modulesA}
          setModulesA={setModulesA}
          modulesB={modulesB}
          setModulesB={setModulesB}
          perUnitCount={perUnitCount}
          setPerUnitCount={setPerUnitCount}
        />
      ) : (
        <CheckPane query={query} setQuery={setQuery} verdict={verdict} />
      )}
    </section>
  );
}

function BuildPane({
  family,
  onSelectFamily,
  modules,
  setModules,
  modulesA,
  setModulesA,
  modulesB,
  setModulesB,
  perUnitCount,
  setPerUnitCount,
}: {
  family: BydFamily;
  onSelectFamily: (f: BydFamily) => void;
  modules: number;
  setModules: (n: number) => void;
  modulesA: number;
  setModulesA: (n: number) => void;
  modulesB: number;
  setModulesB: (n: number) => void;
  perUnitCount: number;
  setPerUnitCount: (n: number) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2">
      <div className="p-5 sm:p-6 grid gap-6 sm:border-r sm:border-rule">
        <Field n={1} title="Which family is installed?" help={family.blurb}>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="family">
            {FAMILIES.map((f) => {
              const active = f.slug === family.slug;
              return (
                <button
                  key={f.slug}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onSelectFamily(f)}
                  className={`rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
                    active
                      ? "border-blue bg-blue/10 text-blue ring-1 ring-inset ring-blue/40"
                      : "border-rule bg-wash text-ink-soft hover:border-rule-strong"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-ink-faint">
            Manufacturer on the nameplate: <span className="text-ink-soft">{family.manufacturer}</span>
          </p>
        </Field>

        <FamilyControls
          family={family}
          modules={modules}
          setModules={setModules}
          modulesA={modulesA}
          setModulesA={setModulesA}
          modulesB={modulesB}
          setModulesB={setModulesB}
          perUnitCount={perUnitCount}
          setPerUnitCount={setPerUnitCount}
        />
      </div>

      <BuildResult
        family={family}
        modules={modules}
        modulesA={modulesA}
        modulesB={modulesB}
        perUnitCount={perUnitCount}
      />
    </div>
  );
}

function FamilyControls({
  family,
  modules,
  setModules,
  modulesA,
  setModulesA,
  modulesB,
  setModulesB,
  perUnitCount,
  setPerUnitCount,
}: {
  family: BydFamily;
  modules: number;
  setModules: (n: number) => void;
  modulesA: number;
  setModulesA: (n: number) => void;
  modulesB: number;
  setModulesB: (n: number) => void;
  perUnitCount: number;
  setPerUnitCount: (n: number) => void;
}) {
  if (family.kind === "modules") {
    return (
      <Field
        n={2}
        title={`${family.label} modules in the photos`}
        help={`Each module is ${family.moduleKwh?.toFixed(2)} kWh usable. Count only ${family.label} modules — a look-alike stack from another family doesn't count.`}
      >
        <NumberStepper
          value={modules}
          min={family.minModules ?? 1}
          max={family.maxModules ?? 20}
          onChange={setModules}
          suffix="modules"
        />
      </Field>
    );
  }

  if (family.kind === "dual-modules") {
    return (
      <>
        <Field n={2} title={`${family.labelA} count`} help="Count the smaller HVE modules in the photos.">
          <NumberStepper value={modulesA} min={0} max={family.maxA ?? 6} onChange={setModulesA} suffix="modules" />
        </Field>
        <Field n={3} title={`${family.labelB} count`} help="Count the larger HVE modules in the photos.">
          <NumberStepper value={modulesB} min={0} max={family.maxB ?? 6} onChange={setModulesB} suffix="modules" />
        </Field>
      </>
    );
  }

  if (family.kind === "per-unit") {
    return (
      <Field n={2} title="LV Flex modules in the photos" help="Every module is the same CEC model — the total is just the count.">
        <NumberStepper value={perUnitCount} min={1} max={20} onChange={setPerUnitCount} suffix="modules" />
      </Field>
    );
  }

  return (
    <p className="text-sm text-ink-soft leading-relaxed">
      LVL is a single non-modular cabinet — there&apos;s nothing to count. The
      nameplate names the complete unit directly.
    </p>
  );
}

function BuildResult({
  family,
  modules,
  modulesA,
  modulesB,
  perUnitCount,
}: {
  family: BydFamily;
  modules: number;
  modulesA: number;
  modulesB: number;
  perUnitCount: number;
}) {
  if (family.kind === "fixed") {
    return (
      <div className="p-5 sm:p-6 bg-wash/60 grid gap-4 content-start">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">CEC approved model</p>
        <div className="grid gap-3">
          {family.rows.map((row, i) => (
            <RowCard key={i} row={row} />
          ))}
        </div>
        <p className="text-xs text-ink-faint leading-relaxed">
          Both entries are the same model, re-approved for a later expiry window — either is valid depending on
          installation date.
        </p>
      </div>
    );
  }

  let total: number;
  if (family.kind === "modules") {
    total = round2(modules * (family.moduleKwh ?? 0));
  } else if (family.kind === "dual-modules") {
    total = round2(modulesA * (family.moduleKwhA ?? 0) + modulesB * (family.moduleKwhB ?? 0));
  } else {
    total = round2(perUnitCount * (family.moduleKwh ?? 0));
  }

  if (family.kind === "per-unit") {
    const row = family.rows[0];
    return (
      <div className="p-5 sm:p-6 bg-wash/60 grid gap-4 content-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">CEC approved model</p>
          <p className="mt-1.5 font-display font-extrabold text-xl sm:text-2xl tnum">{row.m}</p>
          <p className="mt-1 text-xs text-ink-faint">Same model number at any module count.</p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm border-t border-rule pt-4">
          <dt className="text-ink-faint">Modules × capacity</dt>
          <dd className="tnum">
            {perUnitCount} × {row.usable.toFixed(1)} kWh
          </dd>
          <dt className="text-ink-faint">Total usable capacity</dt>
          <dd className="tnum font-medium text-ink">{total.toFixed(1)} kWh</dd>
          <dt className="text-ink-faint">Approved</dt>
          <dd className="tnum">{row.ap}</dd>
          <dt className="text-ink-faint">Expires</dt>
          <dd className="tnum">{row.ex}</dd>
        </dl>
      </div>
    );
  }

  const { exact, nearest } = matchByCapacity(family.rows, total);

  return (
    <div className="p-5 sm:p-6 bg-wash/60 grid gap-4 content-start">
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">CEC approved model</p>
        {exact.length === 1 ? (
          <p className="mt-1.5 font-display font-extrabold text-xl sm:text-2xl tnum break-words">{exact[0].m}</p>
        ) : exact.length > 1 ? (
          <div className="mt-1.5 grid gap-1">
            {exact.map((r) => (
              <p key={r.m} className="font-display font-extrabold text-lg sm:text-xl tnum break-words">
                {r.m}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-1.5 font-display font-extrabold text-xl sm:text-2xl tnum text-ink-faint">
            {total.toFixed(2)} kWh
          </p>
        )}
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm border-t border-rule pt-4">
        <dt className="text-ink-faint">Total usable capacity</dt>
        <dd className="tnum">{total.toFixed(2)} kWh</dd>
      </dl>

      {exact.length === 1 && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm border-t border-rule pt-4">
          <dt className="text-ink-faint">Approved</dt>
          <dd className="tnum">{exact[0].ap}</dd>
          <dt className="text-ink-faint">Expires</dt>
          <dd className="tnum">{exact[0].ex}</dd>
        </dl>
      )}

      {exact.length > 1 && (
        <p className="border-t border-rule pt-4 text-xs text-ink-faint leading-relaxed">
          <b className="text-ink-soft">Note:</b> {exact.length} CEC listings share this exact capacity. Match the
          model string on the paperwork directly against one of the two above — the module split alone can&apos;t
          tell them apart.
        </p>
      )}

      {exact.length === 0 && nearest.length > 0 && (
        <p className="border-t border-rule pt-4 text-xs text-ink-faint leading-relaxed">
          <b className="text-ink-soft">No exact listing at {total.toFixed(2)} kWh.</b> Closest approved{" "}
          {nearest.length === 1 ? "model" : "models"}: {nearest.map((r) => r.m).join(", ")}. Re-check the module
          count against the photos.
        </p>
      )}

      {exact.length === 0 && nearest.length === 0 && (
        <p className="border-t border-rule pt-4 text-xs text-ink-faint leading-relaxed">
          That combination isn&apos;t on the CEC approved list. Re-check the module count.
        </p>
      )}
    </div>
  );
}

function RowCard({ row }: { row: BydRow }) {
  return (
    <div className="rounded-lg border border-rule bg-card p-3">
      <p className="font-display font-extrabold text-lg tnum break-words">{row.m}</p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
        <dt className="text-ink-faint">Usable capacity</dt>
        <dd className="tnum">{row.usable.toFixed(2)} kWh</dd>
        <dt className="text-ink-faint">Approved</dt>
        <dd className="tnum">{row.ap}</dd>
        <dt className="text-ink-faint">Expires</dt>
        <dd className="tnum">{row.ex}</dd>
      </dl>
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
          placeholder="HVS 7.7"
          autoComplete="off"
          spellCheck={false}
          className="mt-2.5 w-full rounded-lg border border-rule-strong bg-card px-3.5 py-2.5 font-mono text-sm tnum outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">Try</span>
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
          Spacing and case are ignored — the check matches the model itself against all BYD rows of the CEC
          approved battery list.
        </p>
      </Card>
    );
  }

  if (verdict.kind === "match") {
    const { family, row } = verdict;
    return (
      <Card tone="ok" pill="On the CEC list" heading={row.m}>
        <p>
          <b>{family.label}</b> family — {row.usable.toFixed(2)} kWh usable · approved {row.ap} · expires {row.ex}
        </p>
        <p className="mt-2.5 text-xs text-ink-faint">{family.blurb}</p>
      </Card>
    );
  }

  return (
    <Card tone="stop" pill="No exact match" heading="Not found on the BYD rows of the CEC list">
      <p>
        <span className="tnum">{verdict.raw}</span> does not match an approved BYD model. The Clean Energy
        Regulator requires the exact listed string.
      </p>
      {verdict.near.length > 0 ? (
        <>
          <p className="mt-2.5">
            <b>Closest listed models:</b>
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            {verdict.near.map((r) => (
              <li key={r.m}>
                <span className="tnum">{r.m}</span> <span className="text-ink-faint">({r.family})</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-2.5">
          Use the <b>From the photos</b> tab to build the correct string from what the installation photos show.
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
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${pillTone}`}>
        {pill}
      </span>
      <h3 className="mt-2.5 text-sm font-medium">{heading}</h3>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft [&_b]:font-medium [&_b]:text-ink">{children}</div>
    </div>
  );
}

function Field({
  n,
  title,
  help,
  children,
}: {
  n: number;
  title: string;
  help: string;
  children: React.ReactNode;
}) {
  return (
    <div>
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

function NumberStepper({
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  suffix: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-rule bg-wash px-3 py-1.5 w-fit">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Remove one`}
        className="h-7 w-7 rounded-md border border-rule text-ink-soft leading-none hover:border-rule-strong hover:text-ink disabled:opacity-25 disabled:cursor-default transition-colors cursor-pointer"
      >
        −
      </button>
      <span className="w-6 text-center text-sm tnum">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Add one`}
        className="h-7 w-7 rounded-md border border-rule text-ink-soft leading-none hover:border-rule-strong hover:text-ink disabled:opacity-25 disabled:cursor-default transition-colors cursor-pointer"
      >
        +
      </button>
      <span className="text-xs text-ink-faint">{suffix}</span>
    </div>
  );
}
