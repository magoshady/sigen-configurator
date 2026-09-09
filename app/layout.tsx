import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-ui",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SigenStor Battery Configuration Finder",
  description:
    "Find the exact CEC-approved Sigenergy SigenStor model number for any combination of battery modules, inverter and EV charger.",
  icons: { icon: "/logo.png" },
};

/** "Prepared exclusively for" followed by the GreenDeal wordmark. */
function PreparedFor({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`text-[10px] sm:text-[11px] tracking-[0.14em] uppercase ${
          dark ? "text-white/45" : "text-ink-faint"
        }`}
      >
        Prepared exclusively for
      </span>
      <Image
        src="/greendeal.png"
        alt="GreenDeal"
        width={500}
        height={86}
        className="h-4 w-auto sm:h-[18px]"
      />
    </span>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <header className="bg-charcoal">
          <div className="mx-auto w-full max-w-4xl px-6 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                priority
                className="h-8 w-8 mark-on-dark"
              />
              <span className="text-sm tracking-[0.16em] uppercase text-white/75">
                Candi Solutions
              </span>
            </div>
            <PreparedFor dark />
          </div>
          <div
            className="h-[3px] bg-gradient-to-r from-green via-teal to-blue"
            aria-hidden
          />
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 bg-charcoal">
          <div
            className="h-[3px] bg-gradient-to-r from-green via-teal to-blue"
            aria-hidden
          />
          <div className="mx-auto w-full max-w-4xl px-6 py-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 mark-on-dark opacity-70"
                />
                <span className="text-[11px] tracking-[0.16em] uppercase text-white/55">
                  Candi Solutions Pty Ltd
                </span>
              </div>
              <PreparedFor dark />
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2 text-[11px] leading-relaxed text-white/40 max-w-2xl">
                <p>
                  Model data is derived from the Sigenergy CEC-approved model
                  spreadsheet and reflects that list at the time of publication. It
                  is provided as a lookup aid only.
                </p>
                <p>
                  Selecting the exact matching model number is a strict requirement
                  for a valid STC claim. An incorrect selection may lead to delays or
                  rejection by the Clean Energy Regulator. Always confirm the model
                  against the{" "}
                  <a
                    className="text-white/60 underline underline-offset-2 hover:text-white"
                    href="https://cleanenergycouncil.org.au/industry-programs/products-program/batteries"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CEC approved battery list
                  </a>{" "}
                  before lodging.
                </p>
                <p>
                  Not affiliated with or endorsed by Sigenergy. All capacities are
                  nameplate figures in kWh.
                </p>
              </div>

              <p className="shrink-0 text-[11px] leading-relaxed text-white/45 sm:text-right">
                For questions, please email us at{" "}
                <a
                  href="mailto:info@candisolutions.com.au"
                  className="text-green underline underline-offset-2 hover:text-white"
                >
                  info@candisolutions.com.au
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
