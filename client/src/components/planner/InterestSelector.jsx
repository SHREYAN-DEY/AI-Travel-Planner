import { Check } from "lucide-react"

function InterestSelector({
  interests,
  selectedInterests,
  onToggle,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
            05 / Interests
          </p>

          <h2 className="mt-1 text-lg font-black">
            What do you enjoy?
          </h2>
        </div>

        <div className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-400">
          {selectedInterests.length} Selected
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {interests.map((interest) => {
          const selected =
            selectedInterests.includes(interest)

          return (
            <button
              key={interest}
              type="button"
              onClick={() => onToggle(interest)}
              className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left text-[11px] font-bold transition-all ${
                selected
                  ? "border-blue-500/40 bg-blue-600/10 text-blue-400"
                  : "border-white/10 bg-[#111113] text-slate-500 hover:border-white/20 hover:text-white"
              }`}
            >
              <span>{interest}</span>

              {selected && <Check size={14} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default InterestSelector