import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Car,
  CircleDollarSign,
  Coffee,
  Hotel,
  Plane,
  ShieldCheck,
  WalletCards,
  Utensils,
} from "lucide-react"
import { Link } from "react-router-dom"

function Budget() {
  const budgetItems = [
    {
      label: "Accommodation",
      value: "—",
      icon: Hotel,
    },
    {
      label: "Food",
      value: "—",
      icon: Utensils,
    },
    {
      label: "Flights",
      value: "—",
      icon: Plane,
    },
    {
      label: "Transport",
      value: "—",
      icon: Car,
    },
    {
      label: "Miscellaneous",
      value: "—",
      icon: Coffee,
    },
    {
      label: "Insurance",
      value: "—",
      icon: ShieldCheck,
    },
  ]

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-[#050505] px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
              <CircleDollarSign size={12} />
              Travel Finance
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              TRIP
              <span className="text-blue-500"> BUDGET.</span>
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600">
              Review your estimated travel expenses and manage your trip
              budget in one place.
            </p>
          </div>

          <Link
            to="/planner"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            <ArrowLeft size={14} />
            Back to Planner
          </Link>
        </div>

        {/* MAIN GRID */}

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

          {/* BREAKDOWN */}

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Expense Breakdown
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Travel Costs
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Calculator size={17} />
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">

              {budgetItems.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111113] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <Icon size={16} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                          {item.label}
                        </p>

                        <p className="mt-1 text-sm font-black">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-700">
                      Pending
                    </span>
                  </div>
                )
              })}

            </div>
          </div>

          {/* TOTAL */}

          <div className="rounded-2xl border border-blue-500/20 bg-blue-600 p-5 shadow-2xl shadow-blue-950/20">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-100">
                  Budget Overview
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Total Estimate
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <CircleDollarSign size={21} />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-black/15 p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-100/60">
                Estimated Total
              </p>

              <p className="mt-2 text-4xl font-black">
                —
              </p>

              <p className="mt-2 text-[9px] leading-4 text-blue-100/60">
                Budget calculation will appear when trip data is
                available.
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-black/15 p-3">
                <p className="text-[8px] uppercase tracking-wider text-blue-100/50">
                  Per Person
                </p>

                <p className="mt-1 text-sm font-black">
                  —
                </p>
              </div>

              <div className="rounded-xl bg-black/15 p-3">
                <p className="text-[8px] uppercase tracking-wider text-blue-100/50">
                  Currency
                </p>

                <p className="mt-1 text-sm font-black">
                  —
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-black/15 px-4 py-3">
              <WalletCards size={14} />

              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-100/70">
                AI budget insights will appear later
              </span>
            </div>
          </div>
        </div>

        {/* LOWER INFO */}

        <div className="mt-4 grid gap-3 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-400">
              Budget Engine
            </p>

            <p className="mt-3 text-sm font-black">
              Ready
            </p>

            <p className="mt-1 text-[9px] leading-4 text-slate-700">
              Frontend budget interface is active.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-400">
              Currency
            </p>

            <p className="mt-3 text-sm font-black">
              Awaiting Trip Data
            </p>

            <p className="mt-1 text-[9px] leading-4 text-slate-700">
              Currency information will be supplied later.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-400">
              AI Insights
            </p>

            <p className="mt-3 text-sm font-black">
              Awaiting API
            </p>

            <p className="mt-1 text-[9px] leading-4 text-slate-700">
              Intelligent budget suggestions will be connected later.
            </p>
          </div>

        </div>

        {/* CTA */}

        <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#080809] px-5 py-4 sm:flex-row">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Ready to configure your journey?
            </p>

            <p className="mt-1 text-xs text-slate-700">
              Set your destination, dates and budget range in the planner.
            </p>
          </div>

          <Link
            to="/planner"
            className="group inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-[9px] font-black uppercase tracking-wider text-blue-400 transition hover:bg-blue-500/20"
          >
            Open Planner

            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>
    </section>
  )
}

export default Budget