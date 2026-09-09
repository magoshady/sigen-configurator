# SigenStor Battery Configuration Finder

Look up the exact CEC-approved Sigenergy SigenStor model number for any
combination of battery modules, inverter and EV charger — the model number
required for a valid STC claim.

## How it works

A SigenStor stack holds up to six battery modules, in 5 / 6 / 8 / 10 kWh sizes,
paired with one of twelve inverters (single-phase `3S`–`12S`, three-phase
`5T`–`30T`) and optionally an EV charger module (`EV12` or `EV25`). Every valid
permutation is its own CEC-approved model number — 1,740 of them.

Two ways to search:

- **By module count** — set how many of each module size are installed; results
  are exact matches on quantity.
- **By model name** — substring search across all model numbers.

Both can be narrowed by inverter and EV charger.

## Data

`data/models.json` is generated from the Sigenergy approved-model spreadsheet in
`docs/`. Each record carries the model name, inverter code, EV charger code, the
per-size module counts, and nominal and usable capacity in kWh.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Next.js App Router, statically prerendered, deployed on Vercel.
