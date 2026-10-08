"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import {
  SYS,
  accordionPill,
  accordionBatteryRows,
  type System,
  type AccordionBatteryRow,
} from "@/lib/alphaess";

const G3_TABLE = [
  { inverter: "SMILE-G3-S3.6 / S5", phase: "Single", solar: "New", modules: "1–4" },
  { inverter: "SMILE-G3-B5", phase: "Single", solar: "Existing", modules: "1–4" },
  { inverter: "SMILE-G3-T4 to T10", phase: "Three", solar: "New", modules: "1–6" },
  { inverter: "SMILE-G3-T12 to T20", phase: "Three", solar: "New", modules: "2–6" },
];

export default function SystemsAccordion() {
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    function openFromHash() {
      if (!location.hash) return;
      const el = document.querySelector(location.hash);
      if (el instanceof HTMLDetailsElement) el.open = true;
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-2">
      {SYS.map((sys) => (
        <SystemItem key={sys.k} sys={sys} today={today} />
      ))}
    </div>
  );
}

/** Renders text that may contain a single inline <b>...</b> span (the mockup's "tell" field). */
function withBold(text: string): React.ReactNode {
  const match = text.match(/^([\s\S]*?)<b>([\s\S]*?)<\/b>([\s\S]*)$/);
  if (!match) return text;
  const [, before, bold, after] = match;
  return (
    <>
      {before}
      <b className="font-medium text-ink">{bold}</b>
      {after}
    </>
  );
}

function SystemItem({ sys, today }: { sys: System; today: Date }) {
  const pill = accordionPill(sys.k, today);
  const rows = accordionBatteryRows(sys.k, today);

  return (
    <details id={`sys-${sys.k}`} className="group overflow-hidden rounded-xl border border-rule bg-card open:border-blue/40">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 px-4 py-3.5 hover:bg-wash [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="w-4 shrink-0 text-[11px] text-ink-faint transition-transform group-open:rotate-90">
          ▶
        </span>
        <span className="min-w-[150px] text-[15.5px] font-semibold">{sys.n}</span>
        <span className="text-[13px] text-ink-faint">{sys.sub}</span>
        <span className="ml-auto">
          <Pill tone={pill.tone}>{pill.label}</Pill>
        </span>
      </summary>

      <div className="grid gap-5 border-t border-rule px-4 pb-5 pt-4 sm:grid-cols-[1fr_260px]">
        <div>
          <p className="max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">{sys.desc}</p>
          <p className="mt-2.5 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">
            <b className="font-medium text-ink">What to look for:</b> {withBold(sys.tell)}
          </p>

          <BatteryTable rows={rows} />
          {sys.k === "g3" && <G3ExtraTable />}
        </div>

        <div className="flex flex-col gap-3">
          {sys.imgs.map((img) => (
            <figure key={img.src} className="m-0 overflow-hidden rounded-lg border border-rule">
              <Image
                src={img.src}
                alt={sys.n}
                width={img.w}
                height={img.h}
                className="h-auto max-h-[280px] w-full bg-wash object-contain"
              />
              <figcaption className="border-t border-rule bg-wash px-2.5 py-1.5 text-[11px] leading-snug text-ink-faint">
                {img.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </details>
  );
}

function BatteryTable({ rows }: { rows: AccordionBatteryRow[] }) {
  return (
    <table className="mt-3.5 w-full max-w-[480px] border-collapse text-[13.5px]">
      <thead>
        <tr>
          {["Battery", "Module", "Modules", "Total"].map((h) => (
            <th key={h} className="pb-2 pr-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-blue">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.famId} className="border-b border-rule last:border-b-0">
            <td className="py-1.5 pr-3.5 font-medium text-ink">
              {r.fam.n}
              {r.fam.exp && (
                <span className="ml-1.5 rounded-full bg-red/15 px-1.5 py-0.5 text-[10px] font-semibold text-red-deep">
                  expired listing
                </span>
              )}
            </td>
            <td className="py-1.5 pr-3.5 tnum text-ink-soft">{r.fam.modcap}</td>
            <td className="py-1.5 pr-3.5 tnum text-ink-soft">{r.moduleRangeLabel}</td>
            <td className="py-1.5 pr-3.5 tnum text-ink-soft">{r.totalRangeLabel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function G3ExtraTable() {
  return (
    <>
      <p className="mt-3.5 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">
        <b className="font-medium text-ink">Which G3 inverter?</b> The letter after &ldquo;G3&rdquo; tells you
        what the system does, and it caps how many battery modules can be fitted.{" "}
        <b className="font-medium text-ink">S</b> models are hybrids wired to new solar panels.{" "}
        <b className="font-medium text-ink">B</b> models are added to solar that was already there.{" "}
        <b className="font-medium text-ink">T</b> models are three phase.
      </p>

      <table className="mt-3 w-full max-w-[480px] border-collapse text-[13.5px]">
        <thead>
          <tr>
            {["Inverter", "Phase", "Solar", "Modules"].map((h) => (
              <th key={h} className="pb-2 pr-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-blue">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {G3_TABLE.map((row) => (
            <tr key={row.inverter} className="border-b border-rule last:border-b-0">
              <td className="py-1.5 pr-3.5 text-ink">{row.inverter}</td>
              <td className="py-1.5 pr-3.5 text-ink-soft">{row.phase}</td>
              <td className="py-1.5 pr-3.5 text-ink-soft">{row.solar}</td>
              <td className="py-1.5 pr-3.5 tnum text-ink-soft">{row.modules}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3.5 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">
        Alpha ESS allows up to twelve modules on the three-phase inverters, but only the sizes above are on
        the CEC list. A five or six module stack rules out a single-phase G3-S5 or G3-B5.
      </p>
    </>
  );
}

function Pill({ tone, children }: { tone: "stop" | "warn" | "ok"; children: React.ReactNode }) {
  const toneClasses = {
    stop: "bg-red/15 text-red-deep",
    warn: "bg-amber/15 text-amber-deep",
    ok: "bg-green/15 text-green-deep",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${toneClasses}`}>
      {children}
    </span>
  );
}
