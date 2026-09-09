import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-ui",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SigenStor Battery Configuration Finder",
  description:
    "Find the exact CEC-approved Sigenergy SigenStor model number for any combination of battery modules, inverter and EV charger.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <header className="border-b border-rule">
          <div className="mx-auto w-full max-w-4xl px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                priority
                className="h-9 w-9"
              />
              <span className="text-sm tracking-[0.16em] uppercase text-ink-soft">
                Configuration Finder
              </span>
            </div>
            <span className="text-right text-[11px] sm:text-xs leading-tight tracking-[0.16em] uppercase text-ink-faint">
              Candi Solutions
              <span className="hidden sm:inline"> Pty Ltd</span>
            </span>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-rule">
          <div className="mx-auto w-full max-w-4xl px-6 py-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={20} height={20} className="h-5 w-5 opacity-60" />
              <span className="text-[11px] tracking-[0.16em] uppercase text-ink-faint">
                SigenStor Configuration Finder
              </span>
            </div>
            <div className="space-y-2 text-[11px] leading-relaxed text-ink-faint max-w-2xl">
              <p>
                Model data is derived from the Sigenergy CEC-approved model
                spreadsheet and reflects that list at the time of publication. It is
                provided as a lookup aid only.
              </p>
              <p>
                Selecting the exact matching model number is a strict requirement for
                a valid STC claim. An incorrect selection may lead to delays or
                rejection by the Clean Energy Regulator. Always confirm the model
                against the{" "}
                <a
                  className="underline underline-offset-2 hover:text-ink-soft"
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
          </div>
        </footer>
      </body>
    </html>
  );
}
