import { Wallet } from "lucide-react"

const MIN_BUDGET = 1000
const MAX_BUDGET = 100000
const BUDGET_STEP = 500

function BudgetSlider({
  budgetMin,
  budgetMax,
  onMinChange,
  onMaxChange,
}) {
  const minValue =
    budgetMin === "" ? MIN_BUDGET : Number(budgetMin)

  const maxValue =
    budgetMax === "" ? MAX_BUDGET : Number(budgetMax)

  const minPercent =
    ((minValue - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100

  const maxPercent =
    ((maxValue - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100

  const formatCurrency = (value) => {
    if (value === "" || value === undefined || value === null) {
      return "—"
    }

    return `₹${Number(value).toLocaleString("en-IN")}`
  }

  const handleMinInput = (value) => {
    const cleanedValue = value.replace(/\D/g, "")
    onMinChange(cleanedValue)
  }

  const handleMaxInput = (value) => {
    const cleanedValue = value.replace(/\D/g, "")
    onMaxChange(cleanedValue)
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
            03 / Budget
          </p>

          <h2 className="mt-1 text-lg font-black text-white">
            Set your budget range
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Wallet size={18} />
        </div>
      </div>

      {/* Selected Range */}
      <div className="mb-6 rounded-xl border border-white/10 bg-[#111113] px-4 py-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
          Selected Range
        </p>

        <p className="mt-1 text-sm font-black text-white">
          {budgetMin === "" || budgetMax === ""
            ? "Set your range"
            : `${formatCurrency(budgetMin)} — ${formatCurrency(budgetMax)}`}
        </p>
      </div>

      {/* Dual Range Slider */}
      <div className="relative mb-2 h-6">
        {/* Background Track */}
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/10" />

        {/* Active Track */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-blue-600"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Minimum Slider */}
        <input
          type="range"
          min={MIN_BUDGET}
          max={MAX_BUDGET - BUDGET_STEP}
          step={BUDGET_STEP}
          value={minValue}
          onChange={(e) => {
            const value = Math.min(
              Number(e.target.value),
              maxValue - BUDGET_STEP
            )

            onMinChange(value)
          }}
          aria-label="Minimum budget"
          className="budget-range absolute inset-0 z-20 w-full appearance-none bg-transparent"
        />

        {/* Maximum Slider */}
        <input
          type="range"
          min={MIN_BUDGET + BUDGET_STEP}
          max={MAX_BUDGET}
          step={BUDGET_STEP}
          value={maxValue}
          onChange={(e) => {
            const value = Math.max(
              Number(e.target.value),
              minValue + BUDGET_STEP
            )

            onMaxChange(value)
          }}
          aria-label="Maximum budget"
          className="budget-range absolute inset-0 z-30 w-full appearance-none bg-transparent"
        />
      </div>

      {/* Slider Labels */}
      <div className="mb-6 flex items-center justify-between text-[10px] font-bold text-slate-500">
        <span>₹1K</span>
        <span>₹100K</span>
      </div>

      {/* Manual Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Minimum */}
        <div>
          <label
            htmlFor="minimum-budget"
            className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500"
          >
            Minimum
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
              ₹
            </span>

            <input
              id="minimum-budget"
              type="text"
              inputMode="numeric"
              value={budgetMin}
              onChange={(e) => handleMinInput(e.target.value)}
              placeholder="Minimum"
              aria-label="Minimum budget amount"
              className="w-full rounded-xl border border-white/10 bg-[#111113] py-3 pl-8 pr-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Maximum */}
        <div>
          <label
            htmlFor="maximum-budget"
            className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500"
          >
            Maximum
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
              ₹
            </span>

            <input
              id="maximum-budget"
              type="text"
              inputMode="numeric"
              value={budgetMax}
              onChange={(e) => handleMaxInput(e.target.value)}
              placeholder="Maximum"
              aria-label="Maximum budget amount"
              className="w-full rounded-xl border border-white/10 bg-[#111113] py-3 pl-8 pr-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* Slider Thumb Styling */}
      <style>{`
        .budget-range {
          pointer-events: none;
        }

        .budget-range::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #2563eb;
          border: 3px solid #0b0b0d;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
          cursor: pointer;
        }

        .budget-range::-moz-range-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #2563eb;
          border: 3px solid #0b0b0d;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
          cursor: pointer;
        }

        .budget-range::-webkit-slider-runnable-track {
          background: transparent;
        }

        .budget-range::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  )
}

export default BudgetSlider